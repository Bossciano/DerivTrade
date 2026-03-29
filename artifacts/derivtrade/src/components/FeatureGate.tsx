/**
 * DerivTrade — FeatureGate (Phase 1)
 *
 * Wraps content that requires a specific subscription tier.
 * Shows a locked overlay with upgrade CTA for insufficient tiers.
 *
 * Usage:
 *   <FeatureGate requires="pro" onUpgrade={() => setActiveTab("premium")}>
 *     <AdvancedIndicators />
 *   </FeatureGate>
 */

import { type ReactNode } from "react";
import { Lock } from "lucide-react";
import { useTier, type SubscriptionTier } from "../store/authStore";

const TIER_RANK: Record<SubscriptionTier, number> = {
  free: 0,
  pro: 1,
  elite: 2,
  community: 3,
};

const TIER_LABELS: Record<SubscriptionTier, string> = {
  free: "Free",
  pro: "Pro",
  elite: "Elite",
  community: "Community",
};

interface FeatureGateProps {
  /** Minimum tier required to see the content */
  requires: SubscriptionTier;
  children: ReactNode;
  /** Called when user taps the upgrade button */
  onUpgrade?: () => void;
  /** Custom message shown in the gate overlay */
  message?: string;
  /** If true, renders nothing instead of locked overlay */
  hideWhenLocked?: boolean;
}

export function FeatureGate({
  requires,
  children,
  onUpgrade,
  message,
  hideWhenLocked = false,
}: FeatureGateProps) {
  const currentTier = useTier();
  const hasAccess = TIER_RANK[currentTier] >= TIER_RANK[requires];

  if (hasAccess) return <>{children}</>;
  if (hideWhenLocked) return null;

  const requiredLabel = TIER_LABELS[requires];
  const defaultMsg = `This feature requires ${requiredLabel} plan`;

  return (
    <div style={{ position: "relative" }}>
      {/* Blurred content preview */}
      <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none", opacity: 0.4 }}>
        {children}
      </div>

      {/* Lock overlay */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, background: "rgba(8,11,18,0.75)", backdropFilter: "blur(2px)", borderRadius: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,229,176,0.12)", border: "1px solid rgba(0,229,176,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lock size={20} color="var(--brand)" />
        </div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)", textAlign: "center", padding: "0 20px" }}>
          {message ?? defaultMsg}
        </div>
        {onUpgrade && (
          <button
            onClick={onUpgrade}
            style={{ padding: "8px 20px", background: "var(--brand)", color: "#000", border: "none", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,229,176,0.3)", marginTop: 4 }}
          >
            Upgrade to {requiredLabel}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Simpler hook-based gate for conditional rendering.
 * Returns true if user has access to the required tier.
 */
export function useFeatureAccess(requires: SubscriptionTier): boolean {
  const currentTier = useTier();
  return TIER_RANK[currentTier] >= TIER_RANK[requires];
}
