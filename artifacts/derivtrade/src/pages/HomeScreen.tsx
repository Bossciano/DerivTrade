import { useState, useEffect } from "react";
import { Bell, Settings2, TrendingUp, TrendingDown, Trophy, BarChart2, Wallet } from "lucide-react";

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
    { pair: "EUR/USD", type: "LONG", stake: 10, exp: 204, pnl: 18.4, pct: 62 },
    { pair: "V 75", type: "SHORT", stake: 25, exp: 491, pnl: -6.2, pct: 35 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => prev.map(p => ({
        ...p,
        exp: Math.max(0, p.exp - 1),
        pnl: +(p.pnl + (p.type === "LONG" ? 1 : -1) * (Math.random() - 0.45) * 0.4).toFixed(2),
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
            <div style={{ width: 34, height: 34, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bell size={17} color="var(--sub)" strokeWidth={1.8} />
            </div>
            <div style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, background: "var(--brand)", borderRadius: "50%", border: "1.5px solid var(--bg)" }} />
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand), #00B8D9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#000", fontFamily: "'Syne', sans-serif", border: "1.5px solid var(--brand)", boxShadow: "0 0 12px var(--brand-glow)" }}>C</div>
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
          Today's P&amp;L
          <span style={{ background: "rgba(0,229,176,0.15)", color: "var(--brand)", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>+$142.00</span>
          <span style={{ background: "rgba(0,229,176,0.15)", color: "var(--brand)", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>+6.07%</span>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={{ flex: 1, background: "var(--brand)", color: "#000", border: "none", borderRadius: 12, padding: "10px 0", fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 4px 20px var(--brand-glow)" }}>
            <TrendingUp size={15} strokeWidth={2.5} /> Trade
          </button>
          <button style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "var(--text)", border: "1px solid var(--border2)", borderRadius: 12, padding: "10px 0", fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Settings2 size={15} strokeWidth={1.8} color="var(--sub)" /> Manage
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 10, padding: "0 16px 16px" }}>
        {[
          { Icon: Trophy, val: "68%", lbl: "Win Rate", green: true },
          { Icon: BarChart2, val: "142", lbl: "Trades", green: false },
          { Icon: Wallet, val: "$981", lbl: "Total P&L", green: true },
        ].map(({ Icon, val, lbl, green }, i) => (
          <div key={i} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
            <Icon size={18} color={green ? "var(--brand)" : "var(--sub)"} strokeWidth={1.8} style={{ margin: "0 auto 6px" }} />
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: green ? "var(--brand)" : "var(--text)", marginBottom: 2 }}>{val}</div>
            <div style={{ fontSize: 10, color: "var(--sub)", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{lbl}</div>
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
            <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace", color: m.pos ? "var(--brand)" : "var(--red)", display: "flex", alignItems: "center", gap: 3 }}>
              {m.pos ? <TrendingUp size={10} strokeWidth={2.5} /> : <TrendingDown size={10} strokeWidth={2.5} />}
              {m.chg}
            </div>
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
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 6, background: p.type === "LONG" ? "rgba(0,229,176,0.15)" : "rgba(255,77,106,0.15)", color: p.type === "LONG" ? "var(--brand)" : "var(--red)", fontFamily: "'Syne', sans-serif", display: "flex", alignItems: "center", gap: 3 }}>
                  {p.type === "LONG" ? <TrendingUp size={9} strokeWidth={2.5} /> : <TrendingDown size={9} strokeWidth={2.5} />} {p.type}
                </span>
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
