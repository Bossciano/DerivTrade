import { useState } from "react";
import DerivChart from "@/components/DerivChart";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D"];

const MARKETS = [
  { label: "EUR/USD",    symbol: "frxEURUSD",  category: "Forex" },
  { label: "GBP/USD",   symbol: "frxGBPUSD",  category: "Forex" },
  { label: "USD/JPY",   symbol: "frxUSDJPY",  category: "Forex" },
  { label: "AUD/USD",   symbol: "frxAUDUSD",  category: "Forex" },
  { label: "Gold",      symbol: "frxXAUUSD",  category: "Commodity" },
  { label: "Silver",    symbol: "frxXAGUSD",  category: "Commodity" },
  { label: "V 75",      symbol: "R_75",        category: "Synthetic" },
  { label: "V 100",     symbol: "R_100",       category: "Synthetic" },
  { label: "Boom 1000", symbol: "BOOM1000",    category: "Synthetic" },
  { label: "Crash 1000",symbol: "CRASH1000",   category: "Synthetic" },
  { label: "BTC/USD",   symbol: "cryBTCUSD",  category: "Crypto" },
  { label: "ETH/USD",   symbol: "cryETHUSD",  category: "Crypto" },
];

const CATEGORIES = ["Forex", "Synthetic", "Commodity", "Crypto"];

const CAT_COLOR: Record<string, string> = {
  Forex:     "var(--blue)",
  Synthetic: "var(--brand)",
  Commodity: "var(--gold)",
  Crypto:    "var(--sub)",
};

interface Props { onNavigate: (tab: string) => void }

export default function ChartScreen({ onNavigate }: Props) {
  const [tf, setTf] = useState("5m");
  const [activeMarket, setActiveMarket] = useState(0);

  const market = MARKETS[activeMarket];

  return (
    <div className="screen-body">

      {/* Header */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>
            {market.label}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif",
            background: `color-mix(in srgb, ${CAT_COLOR[market.category]} 15%, transparent)`,
            color: CAT_COLOR[market.category],
            padding: "2px 8px", borderRadius: 6,
          }}>
            {market.category.toUpperCase()}
          </span>
        </div>
        <div style={{ fontSize: 11, color: "var(--sub)", fontFamily: "'DM Sans', sans-serif", marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)", display: "inline-block", boxShadow: "0 0 6px var(--brand)" }} />
          Deriv WebSocket · Live ticks
        </div>
      </div>

      {/* Pair Selector — grouped by category */}
      <div style={{ paddingTop: 12, paddingBottom: 4 }}>
        {CATEGORIES.map(cat => {
          const pairs = MARKETS.filter(m => m.category === cat);
          return (
            <div key={cat} style={{ marginBottom: 8 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                letterSpacing: 1.5, textTransform: "uppercase",
                color: CAT_COLOR[cat], paddingLeft: 16, marginBottom: 6,
              }}>
                {cat}
              </div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingLeft: 16, paddingRight: 16, scrollbarWidth: "none" }}>
                {pairs.map((m) => {
                  const idx = MARKETS.indexOf(m);
                  const isActive = idx === activeMarket;
                  return (
                    <button
                      key={m.symbol}
                      onClick={() => setActiveMarket(idx)}
                      style={{
                        flexShrink: 0,
                        padding: "6px 12px",
                        borderRadius: 10,
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        border: isActive
                          ? `1px solid ${CAT_COLOR[cat]}`
                          : "1px solid var(--border)",
                        background: isActive
                          ? `color-mix(in srgb, ${CAT_COLOR[cat]} 12%, transparent)`
                          : "var(--card)",
                        color: isActive ? CAT_COLOR[cat] : "var(--sub)",
                        transition: "all 0.15s",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeframe bar */}
      <div style={{ display: "flex", gap: 4, padding: "4px 16px 8px" }}>
        {TIMEFRAMES.map(t => (
          <button
            key={t}
            onClick={() => setTf(t)}
            style={{
              padding: "5px 12px", borderRadius: 8,
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
      <div style={{ margin: "0 16px 16px", height: 380, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <DerivChart symbol={market.symbol} interval={tf} />
      </div>

    </div>
  );
}
