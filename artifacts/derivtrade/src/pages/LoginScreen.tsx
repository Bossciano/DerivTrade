interface Props { onLogin: () => void }

export default function LoginScreen({ onLogin }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--bg)" }}>
      {/* Hero */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px 20px", position: "relative" }}>
        <div style={{ position: "absolute", top: 40, width: 180, height: 180, background: "radial-gradient(circle, rgba(0,229,176,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "var(--text)", letterSpacing: -1, marginBottom: 6, position: "relative", zIndex: 1 }}>
          Deriv<span style={{ color: "var(--brand)" }}>Trade</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--sub)", textAlign: "center", marginBottom: 36, position: "relative", zIndex: 1 }}>
          Professional trading tools,<br />right in your browser.
        </div>
        <div style={{ fontSize: 80, filter: "drop-shadow(0 0 24px rgba(0,229,176,0.18))", position: "relative", zIndex: 1 }}>📊</div>
      </div>

      {/* Panel */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderRadius: "28px 28px 0 0", padding: "28px 24px 32px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>Connect Your Account</div>
        <div style={{ fontSize: 13, color: "var(--sub)", marginBottom: 24 }}>Link your Deriv account to start trading with real money</div>

        {/* Deriv Login */}
        <button onClick={onLogin} style={{ width: "100%", padding: 16, background: "linear-gradient(135deg, #E42B2B 0%, #B91C1C 100%)", border: "none", borderRadius: 14, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 8px 32px rgba(228,43,43,0.3)", marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🔴</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>Login with Deriv</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 1 }}>Secure OAuth · Your funds stay safe</div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>›</div>
        </button>

        {/* API Token */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 14, marginBottom: 4 }}>
          <div style={{ fontSize: 11, color: "var(--sub)", fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>Or Paste API Token</div>
          <div style={{ background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "var(--dim)" }}>a1-xxxxxxxxxxxx...</span>
            <span style={{ fontSize: 16, cursor: "pointer" }}>📋</span>
          </div>
          <button onClick={onLogin} style={{ width: "100%", padding: "10px 0", background: "rgba(0,229,176,0.12)", color: "var(--brand)", border: "1px solid rgba(0,229,176,0.3)", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Connect Token</button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <div style={{ fontSize: 11, color: "var(--dim)", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>NO ACCOUNT YET?</div>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <button onClick={onLogin} style={{ width: "100%", padding: 14, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border2)", borderRadius: 14, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>🎮 Try Demo Mode — No Account Needed</button>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
          {["🔒 End-to-end encrypted", "✅ No passwords stored"].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--dim)" }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
