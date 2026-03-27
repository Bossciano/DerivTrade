import { useState } from "react";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D"];
const STAKES = ["$5", "$10", "$25", "$50", "MAX"];

const chartPath = "M0,130 C20,120 40,100 60,110 C80,120 100,80 120,70 C140,60 160,90 180,75 C200,60 220,40 240,55 C260,70 280,50 300,44 C320,38 330,48 343,46";
const areaPath = chartPath + " L343,175 L0,175 Z";

const candles = [
  [10,112,18], [22,105,25], [34,115,15,true], [46,96,22],
  [58,92,20], [70,107,14,true], [82,80,28], [94,68,18],
  [106,76,16,true], [118,58,22], [130,70,14,true], [142,50,24], [154,44,18]
];

const indicators = ["📈 EMA 20 ●", "📉 RSI ●", "MACD", "BB", "SMA 50", "+ Add"];

interface Props { onNavigate: (tab: string) => void }

export default function ChartScreen({ onNavigate }: Props) {
  const [tf, setTf] = useState("5m");
  const [stake, setStake] = useState("$5");
  const [tradeResult, setTradeResult] = useState<null | { type: string; amount: string }>(null);

  const handleTrade = (type: "Rise" | "Fall") => {
    setTradeResult({ type, amount: stake });
    setTimeout(() => setTradeResult(null), 2000);
  };

  return (
    <div className="screen-body">
      {/* Chart Header */}
      <div style={{ padding: "10px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 19, fontWeight: 900, color: "var(--text)" }}>EUR/USD <span style={{ fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>OTC</span></div>
          <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: "var(--brand)", marginTop: 2 }}>1.08521</div>
          <div style={{ fontSize: 12, color: "var(--brand)", fontWeight: 700 }}>▲ +0.00124 (+0.12%)</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["📌", "↗️"].map((icon, i) => (
            <div key={i} style={{ width: 36, height: 36, background: "var(--surface)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{icon}</div>
          ))}
        </div>
      </div>

      {/* Timeframe Bar */}
      <div style={{ display: "flex", gap: 4, padding: "12px 16px" }}>
        {TIMEFRAMES.map(t => (
          <button key={t} onClick={() => setTf(t)} style={{ padding: "6px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: tf === t ? "#fff" : "var(--sub)", cursor: "pointer", background: tf === t ? "var(--brand-mid)" : "transparent", border: "none", fontFamily: "'Nunito', sans-serif", boxShadow: tf === t ? "0 3px 12px rgba(46,175,133,0.3)" : "none" }}>{t}</button>
        ))}
      </div>

      {/* Chart Canvas */}
      <div style={{ margin: "0 16px", height: 175, background: "var(--surface)", borderRadius: 20, position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <svg width="100%" height="100%" viewBox="0 0 343 175" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2EAF85" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2EAF85" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[44, 88, 132].map(y => (
            <line key={y} x1="0" y1={y} x2="343" y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          ))}
          <path d={areaPath} fill="url(#areaGrad2)" />
          <path d={chartPath} fill="none" stroke="#2EAF85" strokeWidth="2.5" />
          <g opacity="0.85">
            {candles.map(([x, y, h, red], i) => (
              <rect key={i} x={x} y={y} width="7" height={h} rx="2" fill={red ? "#E8475F" : "#2EAF85"} />
            ))}
          </g>
          <line x1="210" y1="0" x2="210" y2="175" stroke="rgba(46,175,133,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="214" y="52" width="50" height="18" rx="4" fill="#2EAF85" />
          <text x="218" y="64" fill="#fff" fontSize="10" fontFamily="monospace" fontWeight="700">1.0852</text>
        </svg>
        <div style={{ position: "absolute", top: 10, right: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--sub)", fontWeight: 600 }}>Vol: 2.4M</div>
      </div>

      {/* Indicators */}
      <div style={{ display: "flex", gap: 8, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {indicators.map((ind, i) => (
          <div key={i} style={{ background: i < 2 ? "var(--brand-light)" : "var(--surface)", borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: i < 2 ? "var(--brand)" : "var(--sub)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>{ind}</div>
        ))}
      </div>

      {/* Trade Panel */}
      {tradeResult && (
        <div style={{ margin: "0 16px 12px", padding: 16, background: tradeResult.type === "Rise" ? "var(--brand-light)" : "var(--red-light)", borderRadius: 16, textAlign: "center", fontSize: 15, fontWeight: 800, color: tradeResult.type === "Rise" ? "var(--brand)" : "var(--red)" }}>
          {tradeResult.type === "Rise" ? "▲" : "▼"} {tradeResult.type} order placed! Stake: {tradeResult.amount}
        </div>
      )}
      <div style={{ margin: "0 16px 12px", background: "var(--surface)", borderRadius: "var(--radius-card)", padding: 18, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 7, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>Duration</div>
        <div style={{ background: "var(--card2)", borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="mono" style={{ fontSize: 15, color: "var(--text)", fontWeight: 700 }}>5</div>
          <div style={{ fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>minutes</div>
        </div>
        <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 7, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>Stake</div>
        <div style={{ background: "var(--card2)", borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div className="mono" style={{ fontSize: 15, color: "var(--text)", fontWeight: 700 }}>{stake === "MAX" ? "$2,338.00" : `${stake}.00`}</div>
          <div style={{ fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>USD</div>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {STAKES.map(s => (
            <div key={s} onClick={() => setStake(s)} style={{ background: stake === s ? "var(--brand-light)" : "var(--card2)", borderRadius: 9, padding: "6px 11px", fontSize: 11, fontWeight: 700, color: stake === s ? "var(--brand)" : "var(--sub)", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace" }}>{s}</div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>
          <span>Est. Payout</span>
          <span className="mono" style={{ color: "var(--brand)", fontWeight: 700, fontSize: 13 }}>$18.40 (84%)</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => handleTrade("Rise")} style={{ flex: 1, padding: 14, background: "var(--brand-mid)", color: "#fff", border: "none", borderRadius: "var(--radius-btn)", fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 900, cursor: "pointer", boxShadow: "0 6px 24px rgba(46,175,133,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>▲ Rise</button>
          <button onClick={() => handleTrade("Fall")} style={{ flex: 1, padding: 14, background: "var(--red)", color: "#fff", border: "none", borderRadius: "var(--radius-btn)", fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 900, cursor: "pointer", boxShadow: "0 6px 24px rgba(232,71,95,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>▼ Fall</button>
        </div>
      </div>
    </div>
  );
}
