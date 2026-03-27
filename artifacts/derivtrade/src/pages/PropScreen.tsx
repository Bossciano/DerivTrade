import { Info, Medal, Target, ShieldAlert } from "lucide-react";

const tiers = [
  { Icon: Medal, iconColor: "#CD7F32", size: "$10,000", rules: "8% target · 5% daily DD · 30 days", price: "$30", badge: null },
  { Icon: Medal, iconColor: "#C0C0C0", size: "$25,000", rules: "8% target · 5% daily DD · 30 days", price: "$59", badge: "POPULAR" },
  { Icon: Medal, iconColor: "#FFD700", size: "$50,000", rules: "8% target · 5% daily DD · 30 days", price: "$99", badge: null },
  { Icon: ShieldAlert, iconColor: "var(--blue)", size: "$100,000", rules: "8% target · 5% daily DD · 30 days", price: "$179", badge: null },
];

const progressItems = [
  { label: "Profit Target (8%)", current: "$1,240", target: "$2,000", pct: 62, type: "green" },
  { label: "Daily Drawdown (5%)", current: "$180", target: "$1,250", pct: 14, type: "blue" },
  { label: "Total Drawdown (10%)", current: "$320", target: "$2,500", pct: 13, type: "blue" },
];

export default function PropScreen() {
  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text)" }}>
          Deriv<span style={{ color: "var(--brand)" }}>Prop</span>
        </div>
        <div style={{ width: 32, height: 32, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Info size={16} color="var(--sub)" strokeWidth={1.8} />
        </div>
      </div>

      {/* Hero */}
      <div style={{ margin: "0 16px 16px", background: "linear-gradient(135deg, #12142A 0%, #1A0E2E 100%)", border: "1px solid rgba(77,159,255,0.2)", borderRadius: 20, padding: 20, position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, background: "radial-gradient(circle, rgba(77,159,255,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, position: "relative", zIndex: 1 }}>
          <Target size={42} color="var(--gold)" strokeWidth={1.4} style={{ filter: "drop-shadow(0 0 14px rgba(255,181,71,0.35))" }} />
        </div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 4, position: "relative", zIndex: 1 }}>Get Funded. Trade Big.</div>
        <div style={{ fontSize: 13, color: "var(--sub)", marginBottom: 16, position: "relative", zIndex: 1 }}>Pass our 2-phase challenge and trade with our capital</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: "var(--gold)", marginBottom: 4, textShadow: "0 0 20px rgba(255,181,71,0.4)", position: "relative", zIndex: 1 }}>$100,000</div>
        <div style={{ fontSize: 12, color: "var(--sub)", marginBottom: 16, position: "relative", zIndex: 1 }}>Maximum funded capital</div>
        <div style={{ display: "flex", justifyContent: "center", background: "rgba(255,255,255,0.04)", borderRadius: 12, overflow: "hidden", position: "relative", zIndex: 1 }}>
          {[["80%", "Profit Split"], ["8%", "Target"], ["5%", "Max DD"]].map(([val, lbl], i, arr) => (
            <div key={i} style={{ flex: 1, padding: "12px 0", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: "var(--brand)", marginBottom: 3 }}>{val}</div>
              <div style={{ fontSize: 9, color: "var(--sub)", fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "0.5px" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Choose Challenge */}
      <div className="sec-label" style={{ marginTop: 4 }}>Choose Your Challenge</div>
      <div style={{ padding: "0 16px" }}>
        {tiers.map((t, i) => (
          <div key={i} style={{ background: t.badge ? "rgba(0,229,176,0.04)" : "var(--card)", border: `1px solid ${t.badge ? "var(--brand)" : "var(--border)"}`, borderRadius: 16, padding: 16, marginBottom: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--card2)", flexShrink: 0 }}>
              <t.Icon size={22} color={t.iconColor} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text)" }}>{t.size}</div>
              <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 2 }}>{t.rules}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: "var(--brand)" }}>{t.price}</div>
              {t.badge && <div style={{ fontSize: 9, fontWeight: 700, background: "var(--brand)", color: "#000", padding: "2px 7px", borderRadius: 8, fontFamily: "'Syne', sans-serif", marginTop: 4, display: "inline-block" }}>{t.badge}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="sec-label" style={{ marginTop: 8 }}>My Challenge — Phase 1</div>
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>$25K Challenge · Day 12 / 30</div>
          {progressItems.map((item, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--sub)", marginBottom: 6 }}>
                <span>{item.label}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", color: "var(--text)", fontSize: 11 }}>{item.current} / {item.target}</span>
              </div>
              <div style={{ height: 6, background: "var(--card2)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${item.pct}%`, background: item.type === "green" ? "linear-gradient(90deg, var(--brand2), var(--brand))" : "linear-gradient(90deg, #2D5FBB, var(--blue))" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
