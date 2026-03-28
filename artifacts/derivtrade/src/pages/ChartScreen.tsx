import { useState } from "react";
import { Bookmark, Share2, TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import TradingViewChart from "@/components/TradingViewChart";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D"];
const STAKES = ["$5", "$10", "$25", "$50", "MAX"];

const MARKETS = [
  { label: "EUR/USD", symbol: "FX:EURUSD", type: "Forex" },
  { label: "GBP/USD", symbol: "FX:GBPUSD", type: "Forex" },
  { label: "USD/JPY", symbol: "FX:USDJPY", type: "Forex" },
  { label: "Gold", symbol: "OANDA:XAUUSD", type: "Commodity" },
  { label: "BTC/USD", symbol: "BITSTAMP:BTCUSD", type: "Crypto" },
  { label: "NAS100", symbol: "NASDAQ:NDX", type: "Index" },
];

interface Props { onNavigate: (tab: string) => void }

export default function ChartScreen({ onNavigate }: Props) {
  const [tf, setTf] = useState("5m");
  const [stake, setStake] = useState("$5");
  const [activeMarket, setActiveMarket] = useState(0);
  const [showMarketPicker, setShowMarketPicker] = useState(false);
  const [tradeResult, setTradeResult] = useState<null | { type: string }>(null);

  const market = MARKETS[activeMarket];

  const handleTrade = (type: "Long" | "Short") => {
    setTradeResult({ type });
    setTimeout(() => setTradeResult(null), 2500);
  };

  return (
    <div className="screen-body">
      {/* Header */}
      <div style={{ padding: "12px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <button
            onClick={() => setShowMarketPicker(v => !v)}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {market.label}
            <span style={{ fontSize: 11, color: "var(--sub)", fontWeight: 500, fontFamily: "'DM Sans', sans-serif", background: "var(--card2)", border: "1px solid var(--border)", padding: "2px 7px", borderRadius: 6 }}>{market.type}</span>
            <ChevronDown size={15} color="var(--sub)" strokeWidth={2} style={{ transition: "transform 0.2s", transform: showMarketPicker ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: "var(--brand)", marginTop: 4 }}>Live Chart</div>
          <div style={{ fontSize: 11, color: "var(--sub)", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5B0", display: "inline-block", boxShadow: "0 0 6px #00E5B0" }} />
            TradingView · Real-time
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[<Bookmark key="b" size={15} color="var(--sub)" strokeWidth={1.8} />, <Share2 key="s" size={15} color="var(--sub)" strokeWidth={1.8} />].map((icon, i) => (
            <div key={i} style={{ width: 32, height: 32, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{icon}</div>
          ))}
        </div>
      </div>

      {/* Market Picker Dropdown */}
      {showMarketPicker && (
        <div style={{ margin: "8px 16px 0", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          {MARKETS.map((m, i) => (
            <div
              key={i}
              onClick={() => { setActiveMarket(i); setShowMarketPicker(false); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: i < MARKETS.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", background: activeMarket === i ? "rgba(0,229,176,0.06)" : "transparent" }}
            >
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: activeMarket === i ? "var(--brand)" : "var(--text)" }}>{m.label}</div>
                <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 1 }}>{m.type}</div>
              </div>
              {activeMarket === i && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--brand)" }} />}
            </div>
          ))}
        </div>
      )}

      {/* Timeframe */}
      <div style={{ display: "flex", gap: 4, padding: "10px 16px 8px" }}>
        {TIMEFRAMES.map(t => (
          <button key={t} onClick={() => setTf(t)} style={{ padding: "5px 11px", borderRadius: 8, fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: tf === t ? "var(--brand)" : "var(--sub)", cursor: "pointer", background: tf === t ? "rgba(0,229,176,0.12)" : "transparent", border: "none" }}>{t}</button>
        ))}
      </div>

      {/* Live TradingView Chart */}
      <div style={{ margin: "0 16px", height: 300, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <TradingViewChart symbol={market.symbol} interval={tf} />
      </div>

      {/* Trade result toast */}
      {tradeResult && (
        <div style={{ margin: "10px 16px 0", padding: "12px 16px", background: tradeResult.type === "Long" ? "rgba(0,229,176,0.12)" : "rgba(255,77,106,0.12)", border: `1px solid ${tradeResult.type === "Long" ? "rgba(0,229,176,0.3)" : "rgba(255,77,106,0.3)"}`, borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: tradeResult.type === "Long" ? "var(--brand)" : "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {tradeResult.type === "Long" ? <TrendingUp size={16} strokeWidth={2.5} /> : <TrendingDown size={16} strokeWidth={2.5} />}
          {tradeResult.type} order placed! Stake: {stake}
        </div>
      )}

      {/* Trade Panel */}
      <div style={{ margin: "10px 16px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, padding: 8, borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textAlign: "center", cursor: "pointer", background: "rgba(0,229,176,0.12)", color: "var(--brand)", border: "1px solid rgba(0,229,176,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <TrendingUp size={14} strokeWidth={2.5} /> Long
          </div>
          <div style={{ flex: 1, padding: 8, borderRadius: 10, fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textAlign: "center", cursor: "pointer", background: "rgba(255,77,106,0.12)", color: "var(--red)", border: "1px solid rgba(255,77,106,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <TrendingDown size={14} strokeWidth={2.5} /> Short
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
          <button onClick={() => handleTrade("Long")} style={{ flex: 1, padding: 13, background: "var(--brand)", color: "#000", border: "none", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 24px var(--brand-glow)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <TrendingUp size={16} strokeWidth={2.5} /> Long
          </button>
          <button onClick={() => handleTrade("Short")} style={{ flex: 1, padding: 13, background: "var(--red)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 24px var(--red-glow)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <TrendingDown size={16} strokeWidth={2.5} /> Short
          </button>
        </div>
      </div>
    </div>
  );
}
