/**
 * DerivTrade — Deriv OAuth Service (Phase 1)
 *
 * Handles:
 * 1. Building the OAuth redirect URL
 * 2. Parsing the callback URL params (token1, acct1, cur1, etc.)
 * 3. Validating a pasted API token via WebSocket authorize call
 *
 * OAuth Flow:
 *   User taps "Login with Deriv"
 *   → openLink(oauthURL)
 *   → Deriv redirects to VITE_DERIV_REDIRECT_URI
 *   → App reads URL params and calls loginWithOAuth()
 *
 * Docs: https://api.deriv.com/docs/app-registration
 */

import { derivWS, type AuthorizeResponse } from "./derivWebSocket";
import type { DerivAccount } from "../store/authStore";

// ─── Config ──────────────────────────────────────────────────────────────────

const APP_ID = import.meta.env.VITE_DERIV_APP_ID ?? "1";

// In production: https://app.derivtrade.app/auth/callback
// In development: the Vite dev server URL
const REDIRECT_URI =
  import.meta.env.VITE_DERIV_REDIRECT_URI ??
  `${window.location.origin}/auth/callback`;

// ─── OAuth URL ───────────────────────────────────────────────────────────────

/**
 * Returns the Deriv OAuth authorization URL.
 * The user will be redirected here and then back to REDIRECT_URI.
 */
export function buildOAuthUrl(): string {
  const params = new URLSearchParams({
    app_id: APP_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "token",
    scope: "read trade payments admin",
  });

  return `https://oauth.deriv.com/oauth2/authorize?${params.toString()}`;
}

/**
 * Opens the Deriv OAuth URL.
 * In Telegram Mini App: uses WebApp.openLink (external browser).
 * In regular browser: redirects current tab.
 */
export function initiateOAuthLogin(): void {
  const url = buildOAuthUrl();

  // Telegram Mini App SDK
  const tg = (window as { Telegram?: { WebApp?: { openLink?: (u: string) => void } } }).Telegram;
  if (tg?.WebApp?.openLink) {
    tg.WebApp.openLink(url);
  } else {
    window.location.href = url;
  }
}

// ─── Callback Parsing ─────────────────────────────────────────────────────────

export interface OAuthCallbackResult {
  accounts: Array<{
    token: string;
    loginId: string;
    currency: string;
  }>;
}

/**
 * Parses the OAuth callback URL params.
 * Deriv returns: ?token1=xxx&acct1=CR123&cur1=USD&token2=yyy&acct2=...
 */
export function parseOAuthCallback(
  search: string = window.location.search
): OAuthCallbackResult | null {
  const params = new URLSearchParams(search);
  const accounts: OAuthCallbackResult["accounts"] = [];

  let i = 1;
  while (params.has(`token${i}`)) {
    const token = params.get(`token${i}`) ?? "";
    const loginId = params.get(`acct${i}`) ?? "";
    const currency = params.get(`cur${i}`) ?? "USD";

    if (token && loginId) {
      accounts.push({ token, loginId, currency });
    }
    i++;
  }

  return accounts.length > 0 ? { accounts } : null;
}

// ─── Token Validation ─────────────────────────────────────────────────────────

export interface TokenValidationResult {
  success: boolean;
  account?: DerivAccount;
  error?: string;
}

/**
 * Validates a pasted Deriv API token by attempting authorize via WebSocket.
 * Returns the account info on success.
 */
export async function validateDerivToken(
  token: string
): Promise<TokenValidationResult> {
  if (!token.trim()) {
    return { success: false, error: "Token cannot be empty" };
  }

  // Basic format check: Deriv API tokens start with "a1-"
  if (!token.startsWith("a1-")) {
    return {
      success: false,
      error: 'Invalid token format. Deriv API tokens start with "a1-"',
    };
  }

  try {
    // Ensure WS is connected (connect without auth first)
    derivWS.connect();

    // Wait briefly for connection if needed
    await waitForConnection();

    const response: AuthorizeResponse = await derivWS.authorize(token);

    if (response.error) {
      return { success: false, error: response.error.message };
    }

    if (!response.authorize) {
      return { success: false, error: "Invalid response from Deriv" };
    }

    const { loginid, currency, balance, is_virtual } = response.authorize;

    const account: DerivAccount = {
      loginId: loginid,
      currency,
      balance,
      accountType: is_virtual ? "demo" : "real",
      isVirtual: is_virtual === 1,
    };

    return { success: true, account };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    return { success: false, error: msg };
  }
}

/**
 * Builds DerivAccount objects from OAuth callback accounts.
 * Calls authorize for each to get balance info.
 */
export async function resolveOAuthAccounts(
  oauthResult: OAuthCallbackResult
): Promise<{ token: string; accounts: DerivAccount[] }> {
  // Use the first (primary) token for main connection
  const primaryToken = oauthResult.accounts[0]?.token ?? "";

  derivWS.connect(primaryToken);
  await waitForConnection();

  const authResponse: AuthorizeResponse = await derivWS.authorize(primaryToken);

  const accounts: DerivAccount[] = [];

  if (authResponse.authorize) {
    const { loginid, currency, balance, is_virtual, account_list } =
      authResponse.authorize;

    // Add the primary account
    accounts.push({
      loginId: loginid,
      currency,
      balance,
      accountType: is_virtual ? "demo" : "real",
      isVirtual: is_virtual === 1,
    });

    // Add additional accounts from account_list (without individual balance calls for now)
    account_list?.forEach((acct) => {
      if (acct.loginid !== loginid) {
        accounts.push({
          loginId: acct.loginid,
          currency: acct.currency,
          balance: 0, // Will be fetched when switched to
          accountType: acct.is_virtual ? "demo" : "real",
          isVirtual: acct.is_virtual === 1,
        });
      }
    });
  }

  return { token: primaryToken, accounts };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function waitForConnection(timeoutMs = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (derivWS.connectionStatus === "connected") {
      resolve();
      return;
    }

    const start = Date.now();
    const check = () => {
      if (derivWS.connectionStatus === "connected") {
        resolve();
      } else if (Date.now() - start > timeoutMs) {
        reject(new Error("WebSocket connection timeout"));
      } else {
        setTimeout(check, 100);
      }
    };

    check();
  });
}
