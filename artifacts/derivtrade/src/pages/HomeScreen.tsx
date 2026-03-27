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
        pnl: +(p.pnl + (p.type === "RISE" ? 1 : -1) * (Math.random() - 0.45) * 0.4).toFixed(2),
        pct: Math.min(95, Math.max(5, p.pct + (Math.random() - 0.4) * 1.2)),
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60)}m ${(s % 60).toString().padStart(2, "0")}s`;

  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text)", letterSpacing: -0.5 }}>
          Deriv<span style={{ color: "var(--brand)" }}>Trade</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🔔</div>
            <div style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, background: "var(--brand)", borderRadius: "50%", border: "1.5px solid var(--bg)" }} />
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand), #00B8D9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000", fontFamily: "'Syne', sans-serif", border: "1.5px solid var(--brand)", boxShadow: "0 0 12px var(--brand-glow)" }}>C</div>
        </div>
      </div>

      {/* Balance Card */}
      <div style={{ margin: "0 16px 16px", background: "linear-gradient(135deg, #0E2D28 0%, #0A1F2E 100%)", border: "1px solid rgba(0,229,176,0.2)", borderRadius: 20, padding: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, background: "radial-gradient(circle, rgba(0,229,176,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ fontSize: 12, color: "var(--sub)", marginBottom: 6 }}>Total Portfolio Balance</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text)", letterSpacing: -1, marginBottom: 4 }}>
          $2,<span style={{ color: "var(--brand)" }}>480</span>.00
        </div>
        <div style={{ fontSize: 12, color: "var(--sub)", display: "flex", alignItems: "center", gap: 6 }}>
          Today's P&L
          <span style={{ background: "rgba(0,229,176,0.15)", color: "var(--brand)", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>+$142.00</span>
          <span style={{ background: "rgba(0,229,176,0.15)", color: "var(--brand)", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>+6.07%</span>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={{ flex: 1, background: "var(--brand)", color: "#000", border: "none", borderRadius: 12, padding: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 4px 20px var(--brand-glow)" }}>📈 Trade</button>
          <button style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "var(--text)", border: "1px solid var(--border2)", borderRadius: 12, padding: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>⚙️ Manage</button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 10, padding: "0 16px 16px" }}>
        {[["🏆", "68%", "Win Rate", true], ["📊", "142", "Trades", false], ["💎", "$981", "Total P&L", true]].map(([icon, val, lbl, green], i) => (
          <div key={i} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{icon as string}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: green ? "var(--brand)" : "var(--text)", marginBottom: 2 }}>{val as string}</div>
            <div style={{ fontSize: 10, color: "var(--sub)", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{lbl as string}</div>
          </div>
        ))}
      </div>

      {/* Live Markets */}
      <div className="sec-label">Live Markets</div>
      <div style={{ display: "flex", gap: 10, padding: "0 16px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {markets.map((m, i) => (
          <div key={i} onClick={() => setActiveMarket(i)} style={{ background: activeMarket === i ? "rgba(0,229,176,0.08)" : "var(--card)", border: `1px solid ${activeMarket === i ? "var(--brand)" : "var(--border)"}`, borderRadius: 14, padding: "10px 14px", minWidth: 100, flexShrink: 0, cursor: "pointer" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{m.sym}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--sub)", marginBottom: 4 }}>{m.price}</div>
            <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace", color: m.pos ? "var(--brand)" : "var(--red)" }}>{m.chg}</div>
          </div>
        ))}
      </div>

      {/* Open Positions */}
      <div className="sec-label">Open Positions</div>
      <div style={{ padding: "0 16px" }}>
        {positions.map((p, i) => (
          <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
                {p.pair}
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 6, background: p.type === "RISE" ? "rgba(0,229,176,0.15)" : "rgba(255,77,106,0.15)", color: p.type === "RISE" ? "var(--brand)" : "var(--red)", fontFamily: "'Syne', sans-serif" }}>{p.type}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 2 }}>Stake ${p.stake} · Exp {fmt(p.exp)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: p.pnl >= 0 ? "var(--brand)" : "var(--red)" }}>{p.pnl >= 0 ? "+" : ""}${Math.abs(p.pnl).toFixed(2)}</div>
              <div style={{ height: 3, width: 80, background: "var(--border)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 2, width: `${p.pct}%`, background: p.pnl >= 0 ? "var(--brand)" : "var(--red)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 10 }} />
    </div>
  );
}
