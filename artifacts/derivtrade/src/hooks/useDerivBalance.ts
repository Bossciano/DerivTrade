/**
 * DerivTrade — useDerivBalance hook (Phase 1)
 *
 * Subscribes to Deriv balance/subscribe WebSocket stream.
 * Updates the auth store whenever a balance update arrives.
 * Auto-subscribes when a valid token is present.
 */

import { useEffect, useRef } from "react";
import { derivWS, type BalanceResponse } from "../services/derivWebSocket";
import { useAuthStore, useDerivToken, useIsDemoMode } from "../store/authStore";

export function useDerivBalance() {
  const token = useDerivToken();
  const isDemoMode = useIsDemoMode();
  const updateBalance = useAuthStore((s) => s.updateBalance);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Demo mode: no real balance subscription needed
    if (isDemoMode || !token) return;

    // Subscribe to balance updates
    const unsubscribe = derivWS.on("balance", (data) => {
      const resp = data as BalanceResponse;
      if (resp.balance?.balance !== undefined) {
        updateBalance(resp.balance.balance);
      }
    });

    // Request balance subscription
    derivWS.subscribeBalance();

    cleanupRef.current = () => {
      unsubscribe();
      derivWS.forgetAll("balance");
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [token, isDemoMode, updateBalance]);
}
