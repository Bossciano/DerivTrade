import { useState } from "react";
import { Bookmark, Share2, TrendingUp, TrendingDown } from "lucide-react";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D"];
const STAKES = ["$5", "$10", "$25", "$50", "MAX"];
const chartPath = "M0,130 C20,120 40,100 60,110 C80,120 100,80 120,70 C140,60 160,90 180,75 C200,60 220,40 240,55 C260,70 280,50 300,44 C320,38 330,48 343,46";
const areaPath = chartPath + " L343,180 L0,180 Z";
const candles: [number, number, number, boolean?][] = [
  [10,112,18],[22,105,25],[34,115,15,true],[46,96,22],[58,92,20],
  [70,107,14,true],[82,80,28],[94,68,18],[106,76,16,true],
  [118,58,22],[130,70,14,true],[142,50,24],[154,44,18]
];
const indicators = ["EMA 20", "RSI", "MACD", "BB", "SMA 50", "+ Add"];

interface Props { onNavigate: (tab: string) => void }

export default function ChartScreen({ onNavigate }: Props) {
  const [tf, setTf] = useState("5m");
  const [stake, setStake] = useState("$5");
  const [tradeResult, setTradeResult] = useState<null | { type: string }>(null);

  const handleTrade = (type: "Rise" | "Fall") => {
    setTradeResult({ type });
    setTimeout(() => setTradeResult(null), 2500);
  };

  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "12px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
            EUR/USD
            <span style={{ fontSize: 11, color: "var(--sub)", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>OTC</span>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: "var(--brand)", marginTop: 2 }}>1.08521</div>
          <div style={{ fontSize: 12, color: "var(--brand)", fontFamily: "'Space Mono', monospace", display: "flex", alignItems: "center", gap: 4 }}>
            <TrendingUp size={12} strokeWidth={2.5} /> +0.00124 (+0.12%)
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[<Bookmark key="b" size={15} color="var(--sub)" strokeWidth={1.8} />, <Share2 key="s" size={15} color="var(--sub)" strokeWidth={1.8} />].map((icon, i) => (
            <div key={i} style={{ width: 32, height: 32, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{icon}</div>
          ))}
        </div>
      </div>

      {/* Timeframe */}
      <div style={{ display: "flex", gap: 4, padding: "12px 16px" }}>
        {TIMEFRAMES.map(t => (
          <button key={t} onClick={() => setTf(t)} style={{ padding: "5px 11px", borderRadius: 8, fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: tf === t ? "var(--brand)" : "var(--sub)", cursor: "pointer", background: tf === t ? "rgba(0,229,176,0.12)" : "transparent", border: "none" }}>{t}</button>
        ))}
      </div>

      {/* Chart */}
      <div style={{ margin: "0 16px", height: 180, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 343 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E5B0" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00E5B0" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[45, 90, 135].map(y => (
            <line key={y} x1="0" y1={y} x2="343" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          <path d={areaPath} fill="url(#areaGradDark)" />
          <path d={chartPath} fill="none" stroke="var(--brand)" strokeWidth="2" />
          <g opacity="0.85">
            {candles.map(([x, y, h, red], i) => (
              <rect key={i} x={x} y={y} width="7" height={h} rx="1.5" fill={red ? "var(--red)" : "var(--brand)"} />
            ))}
          </g>
          <line x1="210" y1="0" x2="210" y2="180" stroke="rgba(0,229,176,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="214" y="48" width="52" height="16" rx="4" fill="var(--brand)" />
          <text x="218" y="60" fill="#000" fontSize="10" fontFamily="'Space Mono', monospace" fontWeight="700">1.0852</text>
        </svg>
        <div style={{ position: "absolute", top: 10, right: 12, fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--sub)" }}>Vol: 2.4M</div>
      </div>

      {/* Indicators */}
      <div style={{ display: "flex", gap: 8, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {indicators.map((ind, i) => (
          <div key={i} style={{ background: "var(--card)", border: `1px solid ${i < 2 ? "var(--brand)" : "var(--border)"}`, borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: i < 2 ? "var(--brand)" : "var(--sub)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>
            {i < 2 && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)", display: "inline-block" }} />}
            {ind}
          </div>
        ))}
      </div>

      {/* Trade result toast */}
      {tradeResult && (
        <div style={{ margin: "0 16px 10px", padding: "12px 16px", background: tradeResult.type === "Rise" ? "rgba(0,229,176,0.12)" : "rgba(255,77,106,0.12)", border: `1px solid ${tradeResult.type === "Rise" ? "rgba(0,229,176,0.3)" : "rgba(255,77,106,0.3)"}`, borderRadius: 12, textAlign: "center", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: tradeResult.type === "Rise" ? "var(--brand)" : "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {tradeResult.type === "Rise" ? <TrendingUp size={16} strokeWidth={2.5} /> : <TrendingDown size={16} strokeWidth={2.5} />}
          {tradeResult.type} order placed! Stake: {stake}
        </div>
      )}

      {/* Trade Panel */}
      <div style={{ margin: "0 16px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, padding: 8, borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textAlign: "center", cursor: "pointer", background: "rgba(0,229,176,0.12)", color: "var(--brand)", border: "1px solid rgba(0,229,176,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <TrendingUp size={14} strokeWidth={2.5} /> Rise
          </div>
          <div style={{ flex: 1, padding: 8, borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textAlign: "center", cursor: "pointer", background: "rgba(255,77,106,0.12)", color: "var(--red)", border: "1px solid rgba(255,77,106,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <TrendingDown size={14} strokeWidth={2.5} /> Fall
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 6, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>Duration</div>
          <div style={{ background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "var(--text)" }}>5</span>
            <span style={{ fontSize: 12, color: "var(--sub)" }}>minutes</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 6, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>Stake</div>
          <div style={{ background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "var(--text)" }}>{stake === "MAX" ? "$2,338.00" : `${stake}.00`}</span>
            <span style={{ fontSize: 12, color: "var(--sub)" }}>USD</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {STAKES.map(s => (
              <div key={s} onClick={() => setStake(s)} style={{ background: stake === s ? "rgba(0,229,176,0.08)" : "var(--card2)", border: `1px solid ${stake === s ? "var(--brand)" : "var(--border)"}`, borderRadius: 8, padding: "5px 10px", fontSize: 11, fontFamily: "'Space Mono', monospace", color: stake === s ? "var(--brand)" : "var(--sub)", cursor: "pointer" }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 12, color: "var(--sub)" }}>
          <span>Est. Payout</span>
          <span style={{ fontFamily: "'Space Mono', monospace", color: "var(--brand)", fontWeight: 700 }}>$18.40 (84%)</span>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={() => handleTrade("Rise")} style={{ flex: 1, padding: 13, background: "var(--brand)", color: "#000", border: "none", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 24px var(--brand-glow)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <TrendingUp size={16} strokeWidth={2.5} /> Rise
          </button>
          <button onClick={() => handleTrade("Fall")} style={{ flex: 1, padding: 13, background: "var(--red)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 24px var(--red-glow)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <TrendingDown size={16} strokeWidth={2.5} /> Fall
          </button>
        </div>
      </div>
    </div>
  );
}
