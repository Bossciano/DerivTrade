import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, CandlestickSeries, LineSeries } from "lightweight-charts";

interface Indicators {
  ma20: boolean;
  ma50: boolean;
  rsi:  boolean;
}

interface Props {
  symbol:     string;
  interval:   string;
  indicators: Indicators;
}

interface Candle {
  time:  number;
  open:  number;
  high:  number;
  low:   number;
  close: number;
}

const GRANULARITY: Record<string, number> = {
  "1m": 60, "5m": 300, "15m": 900, "1h": 3600, "4h": 14400, "1D": 86400,
};

function computeSMA(data: Candle[], period: number) {
  return data.reduce<{ time: number; value: number }[]>((acc, _, i) => {
    if (i < period - 1) return acc;
    const avg = data.slice(i - period + 1, i + 1).reduce((s, c) => s + c.close, 0) / period;
    acc.push({ time: data[i].time, value: avg });
    return acc;
  }, []);
}

function computeRSI(data: Candle[], period = 14) {
  const result: { time: number; value: number }[] = [];
  for (let i = period; i < data.length; i++) {
    let gains = 0, losses = 0;
    for (let j = i - period + 1; j <= i; j++) {
      const diff = data[j].close - data[j - 1].close;
      if (diff > 0) gains += diff; else losses += Math.abs(diff);
    }
    const rs = gains / (losses || 1e-10);
    result.push({ time: data[i].time, value: 100 - 100 / (1 + rs) });
  }
  return result;
}

function decimalPlaces(symbol: string) {
  if (symbol.startsWith("frxXAU") || symbol.startsWith("frxXAG")) return 2;
  if (symbol.startsWith("R_") || symbol.startsWith("BOOM") || symbol.startsWith("CRASH")) return 2;
  if (symbol.startsWith("cry")) return 2;
  return 5;
}

type Status = "connecting" | "live" | "error";

export default function DerivChart({ symbol, interval, indicators }: Props) {
  const mainRef = useRef<HTMLDivElement>(null);
  const rsiRef  = useRef<HTMLDivElement>(null);

  const chartRef     = useRef<ReturnType<typeof createChart> | null>(null);
  const rsiChartRef  = useRef<ReturnType<typeof createChart> | null>(null);
  const ma20Ref      = useRef<any>(null);
  const ma50Ref      = useRef<any>(null);
  const rsiSeriesRef = useRef<any>(null);
  const candleData   = useRef<Candle[]>([]);

  const [status, setStatus]             = useState<Status>("connecting");
  const [currentPrice, setCurrentPrice] = useState<string | null>(null);

  /* ── Refresh indicator series without reconnecting WS ── */
  function applyIndicators(data: Candle[]) {
    if (!chartRef.current) return;

    if (ma20Ref.current) {
      ma20Ref.current.setData(indicators.ma20 ? computeSMA(data, 20) : []);
    }
    if (ma50Ref.current) {
      ma50Ref.current.setData(indicators.ma50 ? computeSMA(data, 50) : []);
    }
    if (rsiSeriesRef.current) {
      rsiSeriesRef.current.setData(indicators.rsi ? computeRSI(data) : []);
    }
  }

  /* ── Indicator toggle effect ── */
  useEffect(() => {
    applyIndicators(candleData.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicators.ma20, indicators.ma50, indicators.rsi]);

  /* ── Chart + WebSocket setup ── */
  useEffect(() => {
    const main = mainRef.current;
    const rsiEl = rsiRef.current;
    if (!main || !rsiEl) return;

    setStatus("connecting");
    setCurrentPrice(null);
    candleData.current = [];

    /* Main chart */
    const chart = createChart(main, {
      width:  main.clientWidth,
      height: main.clientHeight,
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
        vertLine: { color: "rgba(0,229,176,0.4)", labelBackgroundColor: "#00E5B0" },
        horzLine: { color: "rgba(0,229,176,0.4)", labelBackgroundColor: "#00E5B0" },
      },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.07)" },
      timeScale: {
        borderColor: "rgba(255,255,255,0.07)",
        timeVisible: true,
        secondsVisible: interval === "1m",
      },
    });
    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#00E5B0", downColor: "#FF4D6A",
      borderVisible: false,
      wickUpColor: "#00C49A", wickDownColor: "#CC3355",
    });

    /* MA series — always created, data set based on toggle */
    const ma20Series = chart.addSeries(LineSeries, {
      color: "rgba(0,229,176,0.75)", lineWidth: 1, priceLineVisible: false, lastValueVisible: false,
    });
    const ma50Series = chart.addSeries(LineSeries, {
      color: "rgba(255,181,71,0.75)", lineWidth: 1, priceLineVisible: false, lastValueVisible: false,
    });
    ma20Ref.current = ma20Series;
    ma50Ref.current = ma50Series;

    /* RSI sub-chart */
    const rsiChart = createChart(rsiEl, {
      width:  rsiEl.clientWidth,
      height: rsiEl.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "#0E1220" },
        textColor: "#8892A4",
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },
      crosshair: {
        vertLine: { color: "rgba(77,159,255,0.35)", labelBackgroundColor: "#4D9FFF" },
        horzLine: { color: "rgba(77,159,255,0.35)", labelBackgroundColor: "#4D9FFF" },
      },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.07)", scaleMargins: { top: 0.1, bottom: 0.1 } },
      timeScale: { borderColor: "rgba(255,255,255,0.07)", timeVisible: true, secondsVisible: false },
    });
    rsiChartRef.current = rsiChart;

    const rsiSeries = rsiChart.addSeries(LineSeries, {
      color: "#4D9FFF", lineWidth: 1, priceLineVisible: false, lastValueVisible: true,
    });
    rsiSeriesRef.current = rsiSeries;

    /* Sync RSI time scale with main chart */
    chart.timeScale().subscribeVisibleLogicalRangeChange(range => {
      if (range) rsiChart.timeScale().setVisibleLogicalRange(range);
    });
    rsiChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
      if (range) chart.timeScale().setVisibleLogicalRange(range);
    });

    /* Resize observer */
    const ro = new ResizeObserver(() => {
      chart.applyOptions({ width: main.clientWidth, height: main.clientHeight });
      rsiChart.applyOptions({ width: rsiEl.clientWidth, height: rsiEl.clientHeight });
    });
    ro.observe(main);
    ro.observe(rsiEl);

    /* WebSocket */
    const gran = GRANULARITY[interval] ?? 300;
    const ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        ticks_history: symbol,
        adjust_start_time: 1,
        count: 300,
        end: "latest",
        style: "candles",
        granularity: gran,
        subscribe: 1,
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) { setStatus("error"); return; }

      if (data.msg_type === "candles") {
        const candles: Candle[] = data.candles.map((c: any) => ({
          time:  c.epoch as number,
          open:  parseFloat(c.open),
          high:  parseFloat(c.high),
          low:   parseFloat(c.low),
          close: parseFloat(c.close),
        }));
        candleData.current = candles;
        candleSeries.setData(candles);
        chart.timeScale().fitContent();

        if (candles.length) {
          setCurrentPrice(candles[candles.length - 1].close.toFixed(decimalPlaces(symbol)));
        }
        setStatus("live");

        /* Apply indicators after initial data */
        ma20Series.setData(indicators.ma20 ? computeSMA(candles, 20) : []);
        ma50Series.setData(indicators.ma50 ? computeSMA(candles, 50) : []);
        rsiSeries.setData(indicators.rsi ? computeRSI(candles) : []);
        if (indicators.rsi) rsiChart.timeScale().fitContent();

      } else if (data.msg_type === "ohlc") {
        const o = data.ohlc;
        const close = parseFloat(o.close);
        const candle: Candle = {
          time: o.open_time as number,
          open: parseFloat(o.open),
          high: parseFloat(o.high),
          low:  parseFloat(o.low),
          close,
        };

        /* Update or append */
        const existing = candleData.current;
        if (existing.length && existing[existing.length - 1].time === candle.time) {
          existing[existing.length - 1] = candle;
        } else {
          existing.push(candle);
        }

        candleSeries.update(candle);
        setCurrentPrice(close.toFixed(decimalPlaces(symbol)));

        /* Incremental indicator update */
        if (indicators.ma20 && existing.length >= 20) {
          ma20Series.update({ time: candle.time, value: existing.slice(-20).reduce((s, c) => s + c.close, 0) / 20 });
        }
        if (indicators.ma50 && existing.length >= 50) {
          ma50Series.update({ time: candle.time, value: existing.slice(-50).reduce((s, c) => s + c.close, 0) / 50 });
        }
        if (indicators.rsi && existing.length > 14) {
          const rsiData = computeRSI(existing);
          if (rsiData.length) rsiSeries.update(rsiData[rsiData.length - 1]);
        }
      }
    };

    ws.onerror = () => setStatus("error");

    return () => {
      ro.disconnect();
      if (ws.readyState <= 1) ws.close();
      chart.remove();
      rsiChart.remove();
      chartRef.current     = null;
      rsiChartRef.current  = null;
      ma20Ref.current      = null;
      ma50Ref.current      = null;
      rsiSeriesRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, interval]);

  const dp = decimalPlaces(symbol);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

      {/* Main candlestick chart */}
      <div ref={mainRef} style={{ flex: 1, width: "100%", minHeight: 0 }} />

      {/* RSI sub-panel */}
      {indicators.rsi && (
        <div style={{ borderTop: "1px solid rgba(77,159,255,0.2)", position: "relative" }}>
          <div style={{ position: "absolute", top: 4, left: 8, zIndex: 2, fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#4D9FFF", letterSpacing: "0.5px" }}>
            RSI 14
          </div>
          {/* 70 / 30 guide lines overlay */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", pointerEvents: "none", zIndex: 1 }}>
            <div style={{ position: "absolute", top: "20%", left: 0, right: 0, borderTop: "1px dashed rgba(255,77,106,0.25)" }} />
            <div style={{ position: "absolute", bottom: "20%", left: 0, right: 0, borderTop: "1px dashed rgba(0,229,176,0.25)" }} />
          </div>
          <div ref={rsiRef} style={{ width: "100%", height: 100 }} />
        </div>
      )}
      {/* RSI container must always exist in DOM for ref, hidden when off */}
      {!indicators.rsi && <div ref={rsiRef} style={{ width: "100%", height: 0, overflow: "hidden" }} />}

      {/* Live price */}
      {currentPrice && (
        <div style={{ position: "absolute", top: 10, left: 12, fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: "var(--brand)", textShadow: "0 0 12px rgba(0,229,176,0.4)", zIndex: 5 }}>
          {currentPrice}
        </div>
      )}

      {/* Status badge */}
      <div style={{ position: "absolute", top: 10, right: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.5px", color: status === "live" ? "#00E5B0" : status === "error" ? "#FF4D6A" : "#8892A4", background: "rgba(19,25,40,0.85)", padding: "3px 8px", borderRadius: 6, zIndex: 5 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: status === "live" ? "#00E5B0" : status === "error" ? "#FF4D6A" : "#8892A4", boxShadow: status === "live" ? "0 0 6px #00E5B0" : "none", animation: status === "live" ? "pulse 2s infinite" : "none" }} />
        {status === "live" ? "LIVE" : status === "error" ? "ERROR" : "LOADING"}
      </div>

      {/* Loading overlay */}
      {status === "connecting" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(19,25,40,0.85)", gap: 10, zIndex: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2.5px solid rgba(0,229,176,0.15)", borderTop: "2.5px solid #00E5B0", animation: "spin 0.9s linear infinite" }} />
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "var(--sub)" }}>Connecting to Deriv...</div>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, zIndex: 10 }}>
          <div style={{ fontSize: 28 }}>⚠️</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "var(--sub)", textAlign: "center" }}>Could not load chart data.<br />Check your connection.</div>
        </div>
      )}

      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
}
