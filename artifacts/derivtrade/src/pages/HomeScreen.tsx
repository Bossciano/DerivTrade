import { useState, useEffect } from "react";

const markets = [
  { sym: "EUR/USD", price: "1.08521", chg: "+0.12%", pos: true },
  { sym: "V 75", price: "9,843.20", chg: "-0.34%", pos: false },
  { sym: "GBP/USD", price: "1.26840", chg: "+0.08%", pos: true },
  { sym: "BOOM 1K", price: "44,211.5", chg: "+1.21%", pos: true },
  { sym: "CRASH 1K", price: "12,340.8", chg: "-0.55%", pos: false },
];

export default function HomeScreen() {
  const [activeMarket, setActiveMarket] = useState(0);
  const [positions, setPositions] = useState([
    { pair: "EUR/USD", type: "RISE", stake: 10, exp: 204, pnl: 18.4, pct: 62 },
    { pair: "V 75", type: "FALL", stake: 25, exp: 491, pnl: -6.2, pct: 35 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => prev.map(p => ({
        ...p,
        exp: Math.max(0, p.exp - 1),
        pnl: p.type === "RISE"
          ? p.pnl + (Math.random() - 0.45) * 0.4
          : p.pnl + (Math.random() - 0.55) * 0.3,
        pct: p.type === "RISE"
          ? Math.min(95, p.pct + (Math.random() - 0.4) * 1.5)
          : Math.max(5, p.pct - (Math.random() - 0.4) * 1.5),
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "12px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, marginBottom: 2 }}>Welcome back,</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", letterSpacing: -0.3 }}>CIANO 👋</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, background: "var(--surface)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", position: "relative", cursor: "pointer" }}>
            🔔
            <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, background: "var(--brand-mid)", borderRadius: "50%", border: "2px solid var(--bg)" }} />
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg, var(--brand-mid), #00B894)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", boxShadow: "0 4px 14px rgba(46,175,133,0.35)" }}>C</div>
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{ margin: "0 16px 16px", background: "var(--brand-mid)", borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📈</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 3 }}>You have 2 open positions!</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>EUR/USD <b>+${positions[0].pnl.toFixed(2)}</b></span>
            <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>V75 <b style={{ color: positions[1].pnl < 0 ? "#ffaabb" : "#fff" }}>{positions[1].pnl < 0 ? "-" : "+"}${Math.abs(positions[1].pnl).toFixed(2)}</b></span>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>›</div>
      </div>

      {/* Balance Card */}
      <div style={{ margin: "0 16px 16px", background: "var(--surface)", borderRadius: "var(--radius-card)", padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 22 }}>💰</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>Portfolio Balance</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
          {/* Donut */}
          <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-220deg)" }}>
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1A9E70" />
                  <stop offset="100%" stopColor="#2EAF85" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="48" stroke="#E8F0EC" strokeWidth="10" strokeDasharray="240 60" fill="none" />
              <circle cx="60" cy="60" r="48" stroke="url(#ringGrad)" strokeWidth="10" strokeDasharray="163 137" fill="none" />
              <circle cx="60" cy="12" r="5" fill="#2EAF85" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>$2,480</div>
              <div style={{ fontSize: 9, color: "var(--sub)", fontWeight: 600, marginTop: 3 }}>Total Balance</div>
            </div>
          </div>
          {/* Side */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: "var(--brand)" }}>+$142</div>
                <div style={{ fontSize: 10, color: "var(--sub)", fontWeight: 600, marginTop: 2 }}>Today's P&L</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>$2,338</div>
                <div style={{ fontSize: 10, color: "var(--sub)", fontWeight: 600, marginTop: 2 }}>Available</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button style={{ flex: 1, padding: "10px 0", background: "var(--brand-mid)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(46,175,133,0.35)" }}>📈 Trade</button>
              <button style={{ flex: 1, padding: "10px 0", background: "var(--card2)", color: "var(--text)", border: "none", borderRadius: 12, fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>⚙️ Manage</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
          {[["🏆", "68%", "Win Rate"], ["📊", "142", "Trades"], ["💎", "$981", "Total P&L"]].map(([icon, val, lbl], i) => (
            <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: i === 2 ? "var(--brand)" : "var(--text)", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 9, color: "var(--sub)", fontWeight: 600 }}>{lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Cards */}
      <div style={{ display: "flex", gap: 12, padding: "0 16px 16px" }}>
        {/* Open Positions */}
        <div style={{ flex: 1, background: "var(--surface)", borderRadius: 18, padding: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>📂</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>Open</span>
          </div>
          <div style={{ position: "relative", width: 80, height: 80, margin: "4px auto 0" }}>
            <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="32" stroke="#E8F0EC" strokeWidth="7" strokeDasharray="201 0" fill="none" />
              <circle cx="40" cy="40" r="32" stroke="#2EAF85" strokeWidth="7" strokeDasharray="121 80" fill="none" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)" }}>02</div>
              <div style={{ fontSize: 8, color: "var(--sub)", fontWeight: 600 }}>Positions</div>
            </div>
          </div>
        </div>

        {/* P&L Today */}
        <div style={{ flex: 1, background: "var(--surface)", borderRadius: 18, padding: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>❤️</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>P&L Today</span>
          </div>
          <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: "var(--brand)", margin: "6px 0 2px" }}>+$142</div>
          <div style={{ fontSize: 10, color: "var(--sub)", fontWeight: 700, marginBottom: 8 }}>Net Profit</div>
          <div style={{ textAlign: "right" }}>
            <svg width="40" height="24" viewBox="0 0 40 24">
              {[[0, 14, 10], [7, 10, 14], [14, 6, 18], [21, 3, 21], [28, 8, 16], [35, 4, 20]].map(([x, y, h], i) => (
                <rect key={i} x={x} y={y} width="5" height={h} rx="2" fill={i === 4 ? "#E8475F" : "#2EAF85"} opacity={i < 4 ? 0.4 + i * 0.2 : 0.7} />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Live Markets */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sub)", padding: "4px 20px", marginBottom: 10 }}>Live Markets</div>
      <div style={{ display: "flex", gap: 10, padding: "0 16px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {markets.map((m, i) => (
          <div key={i} onClick={() => setActiveMarket(i)} style={{ background: activeMarket === i ? "var(--brand-mid)" : "var(--surface)", borderRadius: 16, padding: "12px 14px", minWidth: 104, flexShrink: 0, cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: activeMarket === i ? "#fff" : "var(--text)", marginBottom: 2 }}>{m.sym}</div>
            <div className="mono" style={{ fontSize: 11, color: activeMarket === i ? "rgba(255,255,255,0.85)" : "var(--sub)", marginBottom: 4 }}>{m.price}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: activeMarket === i ? "#fff" : m.pos ? "var(--brand)" : "var(--red)" }}>{m.chg}</div>
          </div>
        ))}
      </div>

      {/* Open Positions */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sub)", padding: "0 20px", marginBottom: 10 }}>Open Positions</div>
      <div style={{ padding: "0 16px" }}>
        {positions.map((p, i) => (
          <div key={i} style={{ background: "var(--surface)", borderRadius: 16, padding: "14px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
                {p.pair}
                <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 8, background: p.type === "RISE" ? "var(--brand-light)" : "var(--red-light)", color: p.type === "RISE" ? "var(--brand)" : "var(--red)" }}>{p.type}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 3, fontWeight: 600 }}>Stake ${p.stake} · Exp {fmt(p.exp)}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 15, fontWeight: 700, textAlign: "right", color: p.pnl >= 0 ? "var(--brand)" : "var(--red)" }}>{p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)}</div>
              <div style={{ height: 4, width: 70, background: "var(--card2)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 2, width: `${p.pct}%`, background: p.pnl >= 0 ? "var(--brand-mid)" : "var(--red)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 10 }} />
    </div>
  );
}
