/**
 * DerivTrade — ProfileScreen (Phase 1)
 *
 * Changes from original:
 * 1. Account info sourced from useAuthStore (real loginId, balance, accountType)
 * 2. "Disconnect Deriv" calls real logout + WS disconnect
 * 3. Tier badge reflects real subscription tier
 * 4. onLogout + onNavigate props for parent coordination
 */

import { Bell, Palette, Lock, Users, BookOpen, HelpCircle, ChevronRight, LogOut, Link2 } from "lucide-react";
import { useAuthStore, useAccount, useTier, useIsDemoMode } from "../store/authStore";

interface Props {
  onLogout?: () => void;
  onNavigate?: (tab: string) => void;
}

const TIER_BADGES: Record<string, { label: string; color: string; bg: string; border: string }> = {
  free:      { label: "FREE",      color: "var(--sub)",  bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" },
  pro:       { label: "PRO",       color: "var(--brand)", bg: "rgba(0,229,176,0.1)",   border: "rgba(0,229,176,0.2)" },
  elite:     { label: "ELITE",     color: "var(--gold)",  bg: "rgba(255,181,71,0.1)",  border: "rgba(255,181,71,0.2)" },
  community: { label: "COMMUNITY", color: "var(--blue)",  bg: "rgba(77,159,255,0.1)",  border: "rgba(77,159,255,0.2)" },
};

export default function ProfileScreen({ onLogout, onNavigate }: Props) {
  const account = useAccount();
  const tier = useTier();
  const isDemoMode = useIsDemoMode();
  const tierBadge = TIER_BADGES[tier] ?? TIER_BADGES.free;

  const handleLogout = () => {
    onLogout?.();
  };

  const menuSections = [
    {
      title: "Connected Accounts",
      items: [
        {
          Icon: Link2,
          iconBg: account?.isVirtual ? "rgba(0,229,176,0.1)" : "rgba(228,43,43,0.12)",
          iconColor: account?.isVirtual ? "var(--brand)" : "#E42B2B",
          main: account?.isVirtual ? "Deriv Demo Account" : "Deriv Real Account",
          hint: account ? `${account.loginId} · ${account.currency} ${account.balance.toFixed(2)}` : "Not connected",
          tag: account?.isVirtual ? null : null,
          liveTag: !account?.isVirtual && account ? "LIVE" : null,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        { Icon: Bell, iconBg: "rgba(255,181,71,0.1)", iconColor: "var(--gold)", main: "Notifications", hint: "Price alerts, P&L updates", tag: null, liveTag: null },
        { Icon: Palette, iconBg: "rgba(77,159,255,0.1)", iconColor: "var(--blue)", main: "Appearance", hint: "Dark mode · Compact", tag: null, liveTag: null },
        { Icon: Lock, iconBg: "rgba(255,255,255,0.06)", iconColor: "var(--sub)", main: "Security", hint: "2FA enabled", tag: "ON", liveTag: null },
      ],
    },
    {
      title: "More",
      items: [
        { Icon: Users, iconBg: "rgba(255,181,71,0.1)", iconColor: "var(--gold)", main: "Referral Program", hint: "Earn from referrals", tag: null, liveTag: null, onClick: () => onNavigate?.("premium") },
        { Icon: BookOpen, iconBg: "rgba(77,159,255,0.1)", iconColor: "var(--blue)", main: "Trade History", hint: "View completed trades", tag: null, liveTag: null },
        { Icon: HelpCircle, iconBg: "rgba(255,255,255,0.06)", iconColor: "var(--sub)", main: "Help & Support", hint: "FAQ, live chat", tag: null, liveTag: null },
      ],
    },
  ];

  return (
    <div className="screen-body">
      {/* Profile Hero */}
      <div style={{ padding: "20px 20px 24px", textAlign: "center", background: "linear-gradient(to bottom, rgba(0,229,176,0.05), transparent)" }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand), #00B8D9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#000", margin: "0 auto 12px", border: "2px solid var(--brand)", boxShadow: "0 0 24px var(--brand-glow)" }}>
          {account?.loginId?.[0] ?? "U"}
        </div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>
          {account?.loginId ?? "User"}
        </div>
        <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 2 }}>
          {isDemoMode ? "Demo Mode" : `${account?.accountType === "real" ? "Real" : "Demo"} Account`}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          <span style={{ background: tierBadge.bg, color: tierBadge.color, border: `1px solid ${tierBadge.border}`, fontSize: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif", padding: "3px 10px", borderRadius: 8 }}>
            ⚡ {tierBadge.label}
          </span>
          {isDemoMode && (
            <span style={{ background: "rgba(77,159,255,0.1)", color: "var(--blue)", border: "1px solid rgba(77,159,255,0.2)", fontSize: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif", padding: "3px 10px", borderRadius: 8 }}>
              🎮 DEMO
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, padding: "0 16px 16px" }}>
        {[
          { val: account ? `${account.currency} ${account.balance.toFixed(2)}` : "$0.00", lbl: "Balance", green: true },
          { val: "0", lbl: "Trades", green: false },
          { val: "$0", lbl: "P&L", green: false },
          { val: tier.toUpperCase(), lbl: "Plan", green: tier !== "free" },
        ].map(({ val, lbl, green }, i) => (
          <div key={i} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: green ? "var(--brand)" : "var(--text)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</div>
            <div style={{ fontSize: 10, color: "var(--sub)", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, si) => (
        <div key={si}>
          <div className="sec-label" style={{ marginBottom: 8, paddingTop: 4 }}>{section.title}</div>
          <div style={{ margin: "0 16px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            {section.items.map(({ Icon, iconBg, iconColor, main, hint, tag, liveTag, onClick }, ii) => (
              <div
                key={ii}
                onClick={onClick}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: ii < section.items.length - 1 ? "1px solid var(--border)" : "none", cursor: onClick ? "pointer" : "default" }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={iconColor} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{main}</div>
                  <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 1 }}>{hint}</div>
                </div>
                {liveTag && (
                  <span style={{ color: "var(--brand)", fontSize: 11, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>
                    {liveTag} ●
                  </span>
                )}
                {tag && (
                  <span style={{ background: "var(--brand)", color: "#000", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, fontFamily: "'Syne', sans-serif" }}>
                    {tag}
                  </span>
                )}
                <ChevronRight size={16} color="var(--dim)" strokeWidth={1.8} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div style={{ padding: "4px 16px 8px" }}>
        <button
          onClick={handleLogout}
          style={{ width: "100%", padding: "13px 0", background: "rgba(255,77,106,0.1)", color: "var(--red)", border: "1px solid rgba(255,77,106,0.2)", borderRadius: 14, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          <LogOut size={15} strokeWidth={2} /> Disconnect Account
        </button>
      </div>
      <div style={{ height: 10 }} />
    </div>
  );
}
