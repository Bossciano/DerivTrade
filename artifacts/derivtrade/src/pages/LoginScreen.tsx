interface Props { onLogin: () => void }

export default function LoginScreen({ onLogin }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg)" }}>
      {/* Hero */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 28px 16px", position: "relative" }}>
        <div style={{ position: "absolute", top: 20, width: 200, height: 200, background: "radial-gradient(circle, rgba(46,175,133,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ fontSize: 72, marginBottom: 8, position: "relative", zIndex: 1, filter: "drop-shadow(0 8px 24px rgba(46,175,133,0.3))" }}>📊</div>
        <div style={{ fontSize: 34, fontWeight: 900, color: "var(--text)", letterSpacing: -1, marginBottom: 6, position: "relative", zIndex: 1 }}>Deriv<span style={{ color: "var(--brand-mid)" }}>Trade</span></div>
        <div style={{ fontSize: 13, color: "var(--sub)", textAlign: "center", fontWeight: 600, position: "relative", zIndex: 1 }}>Professional trading tools,<br />right in your browser.</div>
      </div>

      {/* Login Panel */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderRadius: "30px 30px 0 0", padding: "28px 22px 30px", boxShadow: "0 -8px 40px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", marginBottom: 4 }}>Connect Your Account</div>
        <div style={{ fontSize: 13, color: "var(--sub)", marginBottom: 22, fontWeight: 600 }}>Link your Deriv account to start trading with real money</div>

        {/* Deriv Connect Button */}
        <button onClick={onLogin} style={{ width: "100%", background: "linear-gradient(135deg, #FF4444, #CC2200)", border: "none", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", marginBottom: 16, boxShadow: "0 6px 24px rgba(204,34,0,0.3)" }}>
          <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🔴</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Login with Deriv</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>Secure OAuth · Your funds stay safe</div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }}>›</div>
        </button>

        {/* Token Box */}
        <div style={{ background: "var(--card2)", borderRadius: 16, padding: 16, marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Or Paste API Token</div>
          <div style={{ background: "var(--surface)", borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--dim)", fontFamily: "'JetBrains Mono', monospace" }}>a1-xxxxxxxxxxxx...</span>
            <span style={{ fontSize: 16, cursor: "pointer" }}>📋</span>
          </div>
          <button onClick={onLogin} style={{ width: "100%", padding: "11px 0", background: "var(--text)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Connect Token</button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
          <div style={{ fontSize: 10, fontWeight: 800, color: "var(--dim)", letterSpacing: 1.5 }}>NO ACCOUNT YET?</div>
          <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
        </div>

        <button onClick={onLogin} style={{ width: "100%", padding: "13px 0", background: "var(--brand-light)", color: "var(--brand)", border: "none", borderRadius: 14, fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 16 }}>🎮 Try Demo Mode — No Account Needed</button>

        {/* Trust Row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          {["🔒 End-to-end encrypted", "✅ No passwords stored"].map((item, i) => (
            <div key={i} style={{ fontSize: 11, color: "var(--sub)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
