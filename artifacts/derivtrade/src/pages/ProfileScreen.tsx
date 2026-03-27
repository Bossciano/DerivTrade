const menuSections = [
  {
    title: "Connected Accounts",
    items: [
      { icon: "🔴", iconBg: "#FDEAEA", main: "Deriv Real Account", hint: "CR123456 · $2,480.00", tag: null },
      { icon: "🟢", iconBg: "#E8F5F0", main: "Deriv Demo Account", hint: "VRTC999 · $10,000.00", tag: null },
    ],
  },
  {
    title: "Settings",
    items: [
      { icon: "🔔", iconBg: "#FFF8E6", main: "Notifications", hint: "Price alerts, P&L updates", tag: null },
      { icon: "🎨", iconBg: "#EEF3FD", main: "Appearance", hint: "Light mode · Compact", tag: null },
      { icon: "🔒", iconBg: "#F0F3EE", main: "Security", hint: "2FA enabled", tag: "ON" },
    ],
  },
  {
    title: "More",
    items: [
      { icon: "👥", iconBg: "#FFF8E6", main: "Referral Program", hint: "14 referrals · $70 earned", tag: null },
      { icon: "📖", iconBg: "#EEF3FD", main: "Trading Journal", hint: "Track your trades", tag: null },
      { icon: "❓", iconBg: "#F0F3EE", main: "Help & Support", hint: "FAQ, live chat", tag: null },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <div className="screen-body">
      {/* Profile Hero */}
      <div style={{ background: "linear-gradient(135deg, #1A2F26 0%, #0F2320 100%)", padding: "24px 20px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, background: "radial-gradient(circle, rgba(46,175,133,0.15) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ width: 72, height: 72, borderRadius: 22, background: "linear-gradient(135deg, var(--brand-mid), #00B894)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 auto 12px", boxShadow: "0 8px 30px rgba(46,175,133,0.4)", position: "relative", zIndex: 1 }}>C</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4, position: "relative", zIndex: 1 }}>CIANO</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 10, position: "relative", zIndex: 1 }}>@bossciano · Pro Member</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, position: "relative", zIndex: 1 }}>
          <span style={{ background: "var(--brand-light)", color: "var(--brand)", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 10 }}>⚡ PRO</span>
          <span style={{ background: "var(--blue-light)", color: "var(--blue)", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 10 }}>🏆 CHALLENGER</span>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 10, padding: "16px 16px 8px" }}>
        {[["68%", "Win Rate", true], ["142", "Trades", false], ["$981", "Total P&L", true], ["14", "Referrals", false]].map(([val, lbl, green], i) => (
          <div key={i} style={{ flex: 1, background: "var(--surface)", borderRadius: 16, padding: "14px 10px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: green ? "var(--brand)" : "var(--text)", marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 10, color: "var(--sub)", fontWeight: 700 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, si) => (
        <div key={si}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sub)", padding: "12px 20px 8px" }}>{section.title}</div>
          <div style={{ margin: "0 16px", background: "var(--surface)", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            {section.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: ii < section.items.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{item.main}</div>
                  <div style={{ fontSize: 11, color: "var(--sub)", fontWeight: 600 }}>{item.hint}</div>
                </div>
                {item.tag && <span style={{ fontSize: 10, fontWeight: 800, background: "var(--brand-light)", color: "var(--brand)", padding: "3px 8px", borderRadius: 7 }}>{item.tag}</span>}
                <div style={{ color: "var(--dim)", fontSize: 18, fontWeight: 300 }}>›</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div style={{ padding: "16px 16px 8px" }}>
        <button style={{ width: "100%", padding: "14px 0", background: "var(--red-light)", color: "var(--red)", border: "none", borderRadius: 16, fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>🚪 Disconnect Account</button>
      </div>

      <div style={{ height: 10 }} />
    </div>
  );
}
