const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/mo",
    color: "var(--card2)",
    textColor: "var(--text)",
    features: ["5 Markets Access", "Basic Charts", "10 Trades/Day", "Email Support"],
    active: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    color: "var(--brand-mid)",
    textColor: "#fff",
    features: ["All Markets Access", "Advanced Charts + Indicators", "Unlimited Trades", "Priority Support", "Prop Firm Challenges"],
    active: true,
  },
  {
    name: "Elite",
    price: "$79",
    period: "/mo",
    color: "linear-gradient(135deg, #1A2F26, #0F2320)",
    textColor: "#fff",
    features: ["Everything in Pro", "Funded Account Ready", "Copy Trading", "VIP Community", "1-on-1 Coaching"],
    active: false,
  },
];

export default function PremiumScreen() {
  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "12px 20px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)" }}>Deriv<span style={{ color: "var(--gold)" }}>Premium</span></div>
          <div style={{ fontSize: 12, color: "var(--sub)", fontWeight: 600, marginTop: 2 }}>Unlock your full potential</div>
        </div>
        <div style={{ fontSize: 28 }}>💳</div>
      </div>

      {/* Current Plan Banner */}
      <div style={{ margin: "16px 16px 20px", background: "var(--gold-light)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: "var(--gold)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>You're on Pro Plan</div>
          <div style={{ fontSize: 11, color: "var(--sub)", fontWeight: 600 }}>Renews April 27, 2026 · $29/mo</div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, background: "var(--gold)", color: "#fff", padding: "4px 10px", borderRadius: 8 }}>ACTIVE</div>
      </div>

      {/* Plans */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sub)", padding: "0 20px", marginBottom: 12 }}>Choose Your Plan</div>
      {plans.map((plan, i) => (
        <div key={i} style={{ margin: "0 16px 12px", background: plan.color, borderRadius: 20, padding: 20, boxShadow: plan.active ? "0 8px 32px rgba(46,175,133,0.3)" : "0 2px 12px rgba(0,0,0,0.06)", border: plan.active ? "2px solid rgba(255,255,255,0.3)" : "2px solid transparent", position: "relative", overflow: "hidden" }}>
          {plan.active && <div style={{ position: "absolute", top: 14, right: 14, fontSize: 10, fontWeight: 800, background: "rgba(255,255,255,0.25)", color: "#fff", padding: "3px 10px", borderRadius: 8 }}>YOUR PLAN</div>}
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: plan.textColor }}>{plan.name}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="mono" style={{ fontSize: 26, fontWeight: 700, color: plan.textColor }}>{plan.price}</span>
              <span style={{ fontSize: 12, color: plan.active ? "rgba(255,255,255,0.7)" : "var(--sub)", fontWeight: 600 }}>{plan.period}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: plan.active ? 16 : 0 }}>
            {plan.features.map((f, fi) => (
              <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: plan.active ? "rgba(255,255,255,0.9)" : plan.textColor === "#fff" ? "rgba(255,255,255,0.8)" : "var(--text)" }}>
                <span style={{ color: plan.active ? "#A8FFD8" : plan.textColor === "#fff" ? "rgba(255,255,255,0.6)" : "var(--brand-mid)", fontSize: 15 }}>✓</span> {f}
              </div>
            ))}
          </div>
          {!plan.active && (
            <button style={{ marginTop: 16, width: "100%", padding: "12px 0", background: plan.textColor === "#fff" ? "rgba(255,255,255,0.15)" : "var(--brand-mid)", color: plan.textColor === "#fff" ? "#fff" : "#fff", border: "none", borderRadius: 12, fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
              {i === 0 ? "Downgrade" : "Upgrade to Elite ⚡"}
            </button>
          )}
        </div>
      ))}

      {/* Benefits */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sub)", padding: "4px 20px 12px", marginTop: 4 }}>Pro Benefits Active</div>
      <div style={{ margin: "0 16px", background: "var(--surface)", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        {[
          ["📊", "#EEF3FD", "Advanced Chart Suite", "15+ indicators unlocked"],
          ["🏆", "#E8F5F0", "Prop Firm Access", "All challenge tiers available"],
          ["⚡", "#FFF8E6", "Priority Execution", "Sub-100ms order routing"],
          ["👥", "#F0F3EE", "VIP Community", "2,400+ pro traders"],
        ].map(([icon, bg, main, hint], i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{main}</div>
              <div style={{ fontSize: 11, color: "var(--sub)", fontWeight: 600 }}>{hint}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}
