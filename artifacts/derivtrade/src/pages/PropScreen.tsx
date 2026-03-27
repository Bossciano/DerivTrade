const tiers = [
  { icon: "🥉", size: "$10,000", rules: "8% target · 5% daily DD · 30 days", price: "$30", badge: null },
  { icon: "🥈", size: "$25,000", rules: "8% target · 5% daily DD · 30 days", price: "$59", badge: "POPULAR" },
  { icon: "🥇", size: "$50,000", rules: "8% target · 5% daily DD · 30 days", price: "$99", badge: null },
  { icon: "💎", size: "$100,000", rules: "8% target · 5% daily DD · 30 days", price: "$179", badge: null },
];

const progressItems = [
  { label: "Profit Target (8%)", current: "$1,240", target: "$2,000", pct: 62, color: "linear-gradient(90deg, #1A9E70, #2EAF85)" },
  { label: "Daily Drawdown (5%)", current: "$180", target: "$1,250", pct: 14, color: "linear-gradient(90deg, #5FA8F5, #4A7EE8)" },
  { label: "Total Drawdown (10%)", current: "$320", target: "$2,500", pct: 13, color: "linear-gradient(90deg, #5FA8F5, #4A7EE8)" },
];

export default function PropScreen() {
  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "10px 20px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)" }}>Deriv<span style={{ color: "var(--brand-mid)" }}>Prop</span></div>
        <div style={{ width: 36, height: 36, background: "var(--surface)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>ℹ️</div>
      </div>

      {/* Hero */}
      <div style={{ margin: "0 16px 16px", background: "linear-gradient(135deg, #1A2F26 0%, #0F2320 100%)", borderRadius: "var(--radius-card)", padding: 22, position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, background: "radial-gradient(circle, rgba(46,175,133,0.2) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ fontSize: 38, marginBottom: 8, position: "relative", zIndex: 1 }}>🏆</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4, position: "relative", zIndex: 1 }}>Get Funded. Trade Big.</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 16, position: "relative", zIndex: 1 }}>Pass our 2-phase challenge and trade with our capital</div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 700, color: "#FFD166", marginBottom: 4, position: "relative", zIndex: 1 }}>$100,000</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 16, position: "relative", zIndex: 1 }}>Maximum funded capital</div>
        <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
          {[["80%", "Profit Split"], ["8%", "Target"], ["5%", "Max DD"]].map(([val, lbl], i, arr) => (
            <div key={i} style={{ flex: 1, padding: "12px 0", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: "var(--brand-mid)", marginBottom: 3 }}>{val}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.5px" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Choose Challenge */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sub)", padding: "0 20px", marginBottom: 10, marginTop: 4 }}>Choose Your Challenge</div>
      <div style={{ padding: "0 16px" }}>
        {tiers.map((t, i) => (
          <div key={i} style={{ background: "var(--surface)", borderRadius: 18, padding: 16, marginBottom: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: t.badge ? "2px solid var(--brand-mid)" : "2px solid transparent" }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: "var(--card2)", flexShrink: 0 }}>{t.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: "var(--text)" }}>{t.size}</div>
              <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 2, fontWeight: 600 }}>{t.rules}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="mono" style={{ fontSize: 17, fontWeight: 700, color: "var(--brand)" }}>{t.price}</div>
              {t.badge && <div style={{ fontSize: 9, fontWeight: 800, background: "var(--brand-mid)", color: "#fff", padding: "2px 8px", borderRadius: 8, marginTop: 4, display: "inline-block" }}>{t.badge}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* My Challenge */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sub)", padding: "0 20px", marginBottom: 10, marginTop: 8 }}>My Challenge — Phase 1</div>
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ background: "var(--surface)", borderRadius: "var(--radius-card)", padding: 18, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 16 }}>$25K Challenge · Day 12 / 30</div>
          {progressItems.map((item, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--sub)", marginBottom: 7, fontWeight: 700 }}>
                <span>{item.label}</span>
                <span className="mono" style={{ color: "var(--text)", fontSize: 11 }}>{item.current} / {item.target}</span>
              </div>
              <div style={{ height: 8, background: "var(--card2)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 4, width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
