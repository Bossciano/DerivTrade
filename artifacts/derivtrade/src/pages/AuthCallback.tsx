/**
 * DerivTrade — AuthCallback (Phase 1)
 *
 * Handles the OAuth callback after Deriv redirects back.
 * URL pattern: /auth/callback?token1=xxx&acct1=CR123&cur1=USD
 *
 * Usage in App.tsx:
 *   if (window.location.pathname === '/auth/callback') {
 *     return <AuthCallback onSuccess={() => navigate('/home')} />;
 *   }
 */

import { useEffect, useState } from "react";
import { parseOAuthCallback, resolveOAuthAccounts } from "../services/derivOAuth";
import { useAuthStore } from "../store/authStore";

interface Props {
  onSuccess: () => void;
  onError: () => void;
}

export default function AuthCallback({ onSuccess, onError }: Props) {
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const { loginWithOAuth } = useAuthStore();

  useEffect(() => {
    const process = async () => {
      const callbackResult = parseOAuthCallback(window.location.search);

      if (!callbackResult || callbackResult.accounts.length === 0) {
        setStatus("error");
        setErrorMsg("No OAuth tokens found in callback URL");
        setTimeout(onError, 2000);
        return;
      }

      try {
        const { token, accounts } = await resolveOAuthAccounts(callbackResult);

        if (accounts.length === 0) {
          setStatus("error");
          setErrorMsg("Could not retrieve account information from Deriv");
          setTimeout(onError, 2000);
          return;
        }

        loginWithOAuth(token, accounts);

        // Clean the URL so tokens don't linger in history
        window.history.replaceState({}, document.title, "/");

        onSuccess();
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Authentication failed");
        setTimeout(onError, 3000);
      }
    };

    void process();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg)", gap: 16 }}>
      {status === "loading" ? (
        <>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2.5px solid rgba(0,229,176,0.15)", borderTop: "2.5px solid var(--brand)", animation: "spin 0.9s linear infinite" }} />
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, color: "var(--sub)" }}>
            Connecting your Deriv account...
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 32 }}>⚠️</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, color: "var(--red)", textAlign: "center", padding: "0 32px" }}>
            {errorMsg}
          </div>
          <div style={{ fontSize: 12, color: "var(--sub)" }}>Redirecting back...</div>
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
