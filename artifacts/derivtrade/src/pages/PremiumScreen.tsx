import { CreditCard, Zap, BarChart2, Trophy, Users, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$9",
    bg: "var(--card)",
    border: "var(--border)",
    priceColor: "var(--sub)",
    features: ["5 Markets Access", "Basic Charts", "10 Trades/Day", "Email Support"],
    active: false,
    btnLabel: "Downgrade",
    btnStyle: { background: "rgba(255,255,255,0.06)", color: "var(--sub)", border: "1px solid var(--border)" },
  },
  {
    name: "Pro",
    price: "$29",
    bg: "rgba(0,229,176,0.04)",
    border: "var(--brand)",
    priceColor: "var(--brand)",
    features: ["All Markets Access", "Advanced Charts + Indicators", "Unlimited Trades", "Priority Support", "Prop Firm Challenges"],
    active: true,
    btnLabel: "Current Plan",
    btnStyle: { background: "var(--brand)", color: "#000", border: "none" },
  },
  {
    name: "Elite",
    price: "$79",
    bg: "linear-gradient(135deg, #12142A, #1A0E2E)",
    border: "rgba(77,159,255,0.25)",
    priceColor: "var(--gold)",
    features: ["Everything in Pro", "Funded Account Ready", "Copy Trading", "VIP Community", "1-on-1 Coaching"],
    active: false,
    btnLabel: "Upgrade to Elite",
    btnStyle: { background: "rgba(255,181,71,0.12)", color: "var(--gold)", border: "1px solid rgba(255,181,71,0.3)" },
  },
];

const benefits = [
  { Icon: BarChart2, iconBg: "rgba(77,159,255,0.1)", iconColor: "var(--blue)", main: "Advanced Chart Suite", hint: "15+ indicators unlocked" },
  { Icon: Trophy, iconBg: "rgba(0,229,176,0.1)", iconColor: "var(--brand)", main: "Prop Firm Access", hint: "All challenge tiers available" },
  { Icon: Zap, iconBg: "rgba(255,181,71,0.1)", iconColor: "var(--gold)", main: "Priority Execution", hint: "Sub-100ms order routing" },
  { Icon: Users, iconBg: "rgba(255,255,255,0.06)", iconColor: "var(--sub)", main: "VIP Community", hint: "2,400+ pro traders" },
];

export default function PremiumScreen() {
  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text)" }}>
            Deriv<span style={{ color: "var(--gold)" }}>Premium</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 2 }}>Unlock your full potential</div>
        </div>
        <CreditCard size={26} color="var(--gold)" strokeWidth={1.5} />
      </div>

      {/* Current plan banner */}
      <div style={{ margin: "0 16px 20px", background: "rgba(255,181,71,0.08)", border: "1px solid rgba(255,181,71,0.2)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: "rgba(255,181,71,0.15)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={18} color="var(--gold)" strokeWidth={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text)" }}>You're on Pro Plan</div>
          <div style={{ fontSize: 11, color: "var(--sub)" }}>Renews April 27, 2026 · $29/mo</div>
        </div>
        <span style={{ background: "var(--gold)", color: "#000", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 8, fontFamily: "'Syne', sans-serif" }}>ACTIVE</span>
      </div>

      {/* Plans */}
      <div className="sec-label">Choose Your Plan</div>
      {plans.map((plan, i) => (
        <div key={i} style={{ margin: "0 16px 12px", background: plan.bg, border: `1px solid ${plan.border}`, borderRadius: 18, padding: 18, boxShadow: plan.active ? "0 4px 24px rgba(0,229,176,0.1)" : "none", position: "relative" }}>
          {plan.active && (
            <div style={{ position: "absolute", top: 16, right: 16, fontSize: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif", background: "rgba(0,229,176,0.15)", color: "var(--brand)", padding: "2px 8px", borderRadius: 8 }}>YOUR PLAN</div>
          )}
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 14 }}>
            <div style={{ flex: 1, fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "var(--text)" }}>{plan.name}</div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700, color: plan.priceColor }}>{plan.price}</span>
            <span style={{ fontSize: 12, color: "var(--sub)", marginLeft: 2 }}>/mo</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
            {plan.features.map((f, fi) => (
              <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: plan.active ? "rgba(240,244,255,0.85)" : "var(--sub)" }}>
                <Check size={13} strokeWidth={2.5} color={plan.active ? "var(--brand)" : "var(--dim)"} /> {f}
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "11px 0", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, cursor: plan.active ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, ...plan.btnStyle }}>
            {plan.btnLabel === "Upgrade to Elite" && <Zap size={14} strokeWidth={2} />}
            {plan.btnLabel}
          </button>
        </div>
      ))}

      {/* Benefits */}
      <div className="sec-label" style={{ marginTop: 4 }}>Pro Benefits Active</div>
      <div style={{ margin: "0 16px 16px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        {benefits.map(({ Icon, iconBg, iconColor, main, hint }, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: i < benefits.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={17} color={iconColor} strokeWidth={1.8} />
            </div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{main}</div>
              <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 1 }}>{hint}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 10 }} />
    </div>
  );
}
