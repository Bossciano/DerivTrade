import { useState } from "react";
import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import DerivChart from "@/components/DerivChart";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D"];
const STAKES = ["$5", "$10", "$25", "$50", "MAX"];

const MARKETS: Record<string, { label: string; symbol: string }[]> = {
  Forex: [
    { label: "EUR/USD",  symbol: "frxEURUSD" },
    { label: "GBP/USD",  symbol: "frxGBPUSD" },
    { label: "USD/JPY",  symbol: "frxUSDJPY" },
    { label: "AUD/USD",  symbol: "frxAUDUSD" },
    { label: "USD/CAD",  symbol: "frxUSDCAD" },
  ],
  Synthetic: [
    { label: "V 75 Index",  symbol: "R_75" },
    { label: "V 100 Index", symbol: "R_100" },
    { label: "Boom 1000",   symbol: "BOOM1000" },
    { label: "Crash 1000",  symbol: "CRASH1000" },
  ],
  Commodity: [
    { label: "Gold (XAU/USD)",   symbol: "frxXAUUSD" },
    { label: "Silver (XAG/USD)", symbol: "frxXAGUSD" },
  ],
  Crypto: [
    { label: "BTC/USD", symbol: "cryBTCUSD" },
    { label: "ETH/USD", symbol: "cryETHUSD" },
  ],
};

const CAT_COLOR: Record<string, string> = {
  Forex:     "var(--blue)",
  Synthetic: "var(--brand)",
  Commodity: "var(--gold)",
  Crypto:    "var(--sub)",
};

const CAT_BG: Record<string, string> = {
  Forex:     "rgba(77,159,255,0.12)",
  Synthetic: "rgba(0,229,176,0.10)",
  Commodity: "rgba(255,181,71,0.12)",
  Crypto:    "rgba(148,163,184,0.10)",
};

interface Props { onNavigate: (tab: string) => void }

export default function ChartScreen({ onNavigate }: Props) {
  const [tf, setTf]         = useState("5m");
  const [stake, setStake]   = useState("$5");
  const [symbol, setSymbol] = useState("frxEURUSD");
  const [pairLabel, setPairLabel] = useState("EUR/USD");
  const [pairCat, setPairCat]     = useState("Forex");
  const [openCat, setOpenCat]     = useState<string | null>(null);
  const [tradeResult, setTradeResult] = useState<null | { type: string }>(null);

  const handleTrade = (type: "Long" | "Short") => {
    setTradeResult({ type });
    setTimeout(() => setTradeResult(null), 2500);
  };

  const selectPair = (cat: string, label: string, sym: string) => {
    setSymbol(sym);
    setPairLabel(label);
    setPairCat(cat);
    setOpenCat(null);
  };

  return (
    <div className="screen-body">

      {/* Header */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>
            {pairLabel}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif",
            background: CAT_BG[pairCat], color: CAT_COLOR[pairCat],
            padding: "2px 8px", borderRadius: 6,
          }}>
            {pairCat.toUpperCase()}
          </span>
        </div>
        <div style={{ fontSize: 11, color: "var(--sub)", fontFamily: "'DM Sans', sans-serif", marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)", display: "inline-block", boxShadow: "0 0 6px var(--brand)" }} />
          Deriv WebSocket · Live ticks
        </div>
      </div>

      {/* Category Dropdowns */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px 0", flexWrap: "wrap", position: "relative" }}>
        {Object.keys(MARKETS).map(cat => {
          const isOpen = openCat === cat;
          return (
            <div key={cat} style={{ position: "relative" }}>
              <button
                onClick={() => setOpenCat(isOpen ? null : cat)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "6px 12px",
                  borderRadius: 10,
                  fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                  cursor: "pointer",
                  border: isOpen || pairCat === cat
                    ? `1px solid ${CAT_COLOR[cat]}`
                    : "1px solid var(--border)",
                  background: isOpen || pairCat === cat ? CAT_BG[cat] : "var(--card)",
                  color: isOpen || pairCat === cat ? CAT_COLOR[cat] : "var(--sub)",
                }}
              >
                {cat}
                <ChevronDown
                  size={13} strokeWidth={2.5}
                  style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {/* Dropdown panel */}
              {isOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 6px)", left: 0,
                  background: "var(--card)", border: "1px solid var(--border2)",
                  borderRadius: 12, overflow: "hidden",
                  zIndex: 50, minWidth: 160,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}>
                  {MARKETS[cat].map((m, i) => (
                    <div
                      key={m.symbol}
                      onClick={() => selectPair(cat, m.label, m.symbol)}
                      style={{
                        padding: "11px 14px",
                        borderBottom: i < MARKETS[cat].length - 1 ? "1px solid var(--border)" : "none",
                        cursor: "pointer",
                        background: symbol === m.symbol ? CAT_BG[cat] : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}
                    >
                      <span style={{
                        fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                        color: symbol === m.symbol ? CAT_COLOR[cat] : "var(--text)",
                      }}>
                        {m.label}
                      </span>
                      {symbol === m.symbol && (
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: CAT_COLOR[cat] }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Timeframe bar */}
      <div style={{ display: "flex", gap: 4, padding: "12px 16px 8px" }}>
        {TIMEFRAMES.map(t => (
          <button
            key={t}
            onClick={() => setTf(t)}
            style={{
              padding: "5px 11px", borderRadius: 8,
              fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
              color: tf === t ? "var(--brand)" : "var(--sub)",
              cursor: "pointer",
              background: tf === t ? "rgba(0,229,176,0.12)" : "transparent",
              border: tf === t ? "1px solid rgba(0,229,176,0.25)" : "1px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Live Chart */}
      <div style={{ margin: "0 16px", height: 300, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <DerivChart symbol={symbol} interval={tf} />
      </div>

      {/* Trade result toast */}
      {tradeResult && (
        <div style={{
          margin: "10px 16px 0", padding: "12px 16px",
          background: tradeResult.type === "Long" ? "rgba(0,229,176,0.12)" : "rgba(255,77,106,0.12)",
          border: `1px solid ${tradeResult.type === "Long" ? "rgba(0,229,176,0.3)" : "rgba(255,77,106,0.3)"}`,
          borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
          color: tradeResult.type === "Long" ? "var(--brand)" : "var(--red)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {tradeResult.type === "Long" ? <TrendingUp size={16} strokeWidth={2.5} /> : <TrendingDown size={16} strokeWidth={2.5} />}
          {tradeResult.type} order placed on {pairLabel}! Stake: {stake}
        </div>
      )}

      {/* Trade Panel — no duplicate tabs, only action buttons */}
      <div style={{ margin: "10px 16px 16px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 16 }}>

        {/* Duration */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 6, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>Duration</div>
          <div style={{ background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "var(--text)" }}>5</span>
            <span style={{ fontSize: 12, color: "var(--sub)" }}>minutes</span>
          </div>
        </div>

        {/* Stake */}
        <div>
          <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 6, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>Stake</div>
          <div style={{ background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "var(--text)" }}>{stake === "MAX" ? "$2,338.00" : `${stake}.00`}</span>
            <span style={{ fontSize: 12, color: "var(--sub)" }}>USD</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {STAKES.map(s => (
              <div
                key={s}
                onClick={() => setStake(s)}
                style={{
                  background: stake === s ? "rgba(0,229,176,0.08)" : "var(--card2)",
                  border: `1px solid ${stake === s ? "var(--brand)" : "var(--border)"}`,
                  borderRadius: 8, padding: "5px 10px",
                  fontSize: 11, fontFamily: "'Space Mono', monospace",
                  color: stake === s ? "var(--brand)" : "var(--sub)",
                  cursor: "pointer",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Est. Payout */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 12, color: "var(--sub)" }}>
          <span>Est. Payout</span>
          <span style={{ fontFamily: "'Space Mono', monospace", color: "var(--brand)", fontWeight: 700 }}>$18.40 (84%)</span>
        </div>

        {/* Long / Short action buttons — single set only */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button
            onClick={() => handleTrade("Long")}
            style={{ flex: 1, padding: 13, background: "var(--brand)", color: "#000", border: "none", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 24px var(--brand-glow)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
          >
            <TrendingUp size={16} strokeWidth={2.5} /> Long
          </button>
          <button
            onClick={() => handleTrade("Short")}
            style={{ flex: 1, padding: 13, background: "var(--red)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 24px var(--red-glow)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
          >
            <TrendingDown size={16} strokeWidth={2.5} /> Short
          </button>
        </div>
      </div>

    </div>
  );
}
