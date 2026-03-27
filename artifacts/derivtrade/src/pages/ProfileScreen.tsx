import { Bell, Palette, Lock, Users, BookOpen, HelpCircle, ChevronRight, LogOut, Link2 } from "lucide-react";

const menuSections = [
  {
    title: "Connected Accounts",
    items: [
      { Icon: Link2, iconBg: "rgba(228,43,43,0.12)", iconColor: "#E42B2B", main: "Deriv Real Account", hint: "CR123456 · $2,480.00", tag: null },
      { Icon: Link2, iconBg: "rgba(0,229,176,0.1)", iconColor: "var(--brand)", main: "Deriv Demo Account", hint: "VRTC999 · $10,000.00", tag: null },
    ],
  },
  {
    title: "Settings",
    items: [
      { Icon: Bell, iconBg: "rgba(255,181,71,0.1)", iconColor: "var(--gold)", main: "Notifications", hint: "Price alerts, P&L updates", tag: null },
      { Icon: Palette, iconBg: "rgba(77,159,255,0.1)", iconColor: "var(--blue)", main: "Appearance", hint: "Dark mode · Compact", tag: null },
      { Icon: Lock, iconBg: "rgba(255,255,255,0.06)", iconColor: "var(--sub)", main: "Security", hint: "2FA enabled", tag: "ON" },
    ],
  },
  {
    title: "More",
    items: [
      { Icon: Users, iconBg: "rgba(255,181,71,0.1)", iconColor: "var(--gold)", main: "Referral Program", hint: "14 referrals · $70 earned", tag: null },
      { Icon: BookOpen, iconBg: "rgba(77,159,255,0.1)", iconColor: "var(--blue)", main: "Trading Journal", hint: "Track your trades", tag: null },
      { Icon: HelpCircle, iconBg: "rgba(255,255,255,0.06)", iconColor: "var(--sub)", main: "Help & Support", hint: "FAQ, live chat", tag: null },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <div className="screen-body">
      {/* Profile Hero */}
      <div style={{ padding: "20px 20px 24px", textAlign: "center", background: "linear-gradient(to bottom, rgba(0,229,176,0.05), transparent)" }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand), #00B8D9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#000", margin: "0 auto 12px", border: "2px solid var(--brand)", boxShadow: "0 0 24px var(--brand-glow)" }}>C</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>CIANO</div>
        <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 2 }}>@bossciano · Pro Member</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          <span style={{ background: "rgba(0,229,176,0.12)", color: "var(--brand)", fontSize: 11, fontWeight: 700, fontFamily: "'Syne', sans-serif", padding: "3px 10px", borderRadius: 8, border: "1px solid rgba(0,229,176,0.2)" }}>⚡ PRO</span>
          <span style={{ background: "rgba(77,159,255,0.12)", color: "var(--blue)", fontSize: 11, fontWeight: 700, fontFamily: "'Syne', sans-serif", padding: "3px 10px", borderRadius: 8, border: "1px solid rgba(77,159,255,0.2)" }}>🏆 CHALLENGER</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, padding: "0 16px 16px" }}>
        {[["68%", "Win Rate", true], ["142", "Trades", false], ["$981", "P&L", true], ["14", "Refs", false]].map(([val, lbl, green], i) => (
          <div key={i} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: green ? "var(--brand)" : "var(--text)", marginBottom: 4 }}>{val as string}</div>
            <div style={{ fontSize: 10, color: "var(--sub)", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{lbl as string}</div>
          </div>
        ))}
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, si) => (
        <div key={si}>
          <div className="sec-label" style={{ marginBottom: 8, paddingTop: 4 }}>{section.title}</div>
          <div style={{ margin: "0 16px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            {section.items.map(({ Icon, iconBg, iconColor, main, hint, tag }, ii) => (
              <div key={ii} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: ii < section.items.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={iconColor} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{main}</div>
                  <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 1 }}>{hint}</div>
                </div>
                {tag && <span style={{ background: "var(--brand)", color: "#000", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, fontFamily: "'Syne', sans-serif" }}>{tag}</span>}
                <ChevronRight size={16} color="var(--dim)" strokeWidth={1.8} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div style={{ padding: "4px 16px 8px" }}>
        <button style={{ width: "100%", padding: "13px 0", background: "rgba(255,77,106,0.1)", color: "var(--red)", border: "1px solid rgba(255,77,106,0.2)", borderRadius: 14, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <LogOut size={15} strokeWidth={2} /> Disconnect Account
        </button>
      </div>
      <div style={{ height: 10 }} />
    </div>
  );
}
