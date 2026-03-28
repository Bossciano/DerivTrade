import { useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";

interface Props {
  symbol: string;
  interval: string;
}

const GRANULARITY: Record<string, number> = {
  "1m": 60,
  "5m": 300,
  "15m": 900,
  "1h": 3600,
  "4h": 14400,
  "1D": 86400,
};

type Status = "connecting" | "live" | "error";

export default function DerivChart({ symbol, interval }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("connecting");
  const [currentPrice, setCurrentPrice] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setStatus("connecting");
    setCurrentPrice(null);

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "#131928" },
        textColor: "#8892A4",
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.04)" },
        horzLines: { color: "rgba(255,255,255,0.04)" },
      },
      crosshair: {
        vertLine: {
          color: "rgba(0,229,176,0.4)",
          labelBackgroundColor: "#00E5B0",
        },
        horzLine: {
          color: "rgba(0,229,176,0.4)",
          labelBackgroundColor: "#00E5B0",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.07)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.07)",
        timeVisible: true,
        secondsVisible: interval === "1m",
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#00E5B0",
      downColor: "#FF4D6A",
      borderVisible: false,
      wickUpColor: "#00C49A",
      wickDownColor: "#CC3355",
    });

    const ro = new ResizeObserver(() => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    });
    ro.observe(container);

    const granularity = GRANULARITY[interval] ?? 300;
    const ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        ticks_history: symbol,
        adjust_start_time: 1,
        count: 300,
        end: "latest",
        style: "candles",
        granularity,
        subscribe: 1,
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setStatus("error");
        return;
      }

      if (data.msg_type === "candles") {
        const candles = data.candles.map((c: {
          epoch: number; open: string; high: string; low: string; close: string
        }) => ({
          time: c.epoch as number,
          open: parseFloat(c.open),
          high: parseFloat(c.high),
          low: parseFloat(c.low),
          close: parseFloat(c.close),
        }));
        series.setData(candles);
        chart.timeScale().fitContent();
        if (candles.length > 0) {
          setCurrentPrice(candles[candles.length - 1].close.toFixed(
            symbol.startsWith("frxXAU") ? 2 :
            symbol.startsWith("R_") || symbol.startsWith("BOOM") || symbol.startsWith("CRASH") ? 2 : 5
          ));
        }
        setStatus("live");
      } else if (data.msg_type === "ohlc") {
        const o = data.ohlc;
        const close = parseFloat(o.close);
        series.update({
          time: o.open_time as number,
          open: parseFloat(o.open),
          high: parseFloat(o.high),
          low: parseFloat(o.low),
          close,
        });
        setCurrentPrice(close.toFixed(
          symbol.startsWith("frxXAU") ? 2 :
          symbol.startsWith("R_") || symbol.startsWith("BOOM") || symbol.startsWith("CRASH") ? 2 : 5
        ));
      }
    };

    ws.onerror = () => setStatus("error");

    return () => {
      ro.disconnect();
      if (ws.readyState <= 1) ws.close();
      chart.remove();
    };
  }, [symbol, interval]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Live price overlay */}
      {currentPrice && (
        <div style={{
          position: "absolute", top: 10, left: 12,
          fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
          color: "var(--brand)",
          textShadow: "0 0 12px rgba(0,229,176,0.4)",
        }}>
          {currentPrice}
        </div>
      )}

      {/* Status badge */}
      <div style={{
        position: "absolute", top: 10, right: 12,
        display: "flex", alignItems: "center", gap: 5,
        fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.5px",
        color: status === "live" ? "#00E5B0" : status === "error" ? "#FF4D6A" : "#8892A4",
        background: "rgba(19,25,40,0.85)",
        padding: "3px 8px", borderRadius: 6,
      }}>
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: status === "live" ? "#00E5B0" : status === "error" ? "#FF4D6A" : "#8892A4",
          boxShadow: status === "live" ? "0 0 6px #00E5B0" : "none",
          animation: status === "live" ? "pulse 2s infinite" : "none",
        }} />
        {status === "live" ? "LIVE" : status === "error" ? "ERROR" : "LOADING"}
      </div>

      {/* Loading overlay */}
      {status === "connecting" && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(19,25,40,0.85)",
          gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            border: "2.5px solid rgba(0,229,176,0.15)",
            borderTop: "2.5px solid #00E5B0",
            animation: "spin 0.9s linear infinite",
          }} />
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "var(--sub)" }}>
            Connecting to Deriv...
          </div>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 8,
        }}>
          <div style={{ fontSize: 28 }}>⚠️</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "var(--sub)", textAlign: "center" }}>
            Could not load chart data.<br />Check your connection.
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
}
