/**
 * DerivTrade — Deriv WebSocket Service (Phase 1)
 *
 * Single shared WebSocket connection to Deriv Binary API.
 * Handles: authorize, balance/subscribe, ticks/subscribe, proposal requests.
 *
 * Docs: https://api.deriv.com/
 * WS endpoint: wss://ws.binaryws.com/websockets/v3?app_id=<DERIV_APP_ID>
 */

// ─── Config ──────────────────────────────────────────────────────────────────

// Replace with your registered app_id from api.deriv.com
// For development we use the public demo app_id (1)
export const DERIV_APP_ID = import.meta.env.VITE_DERIV_APP_ID ?? "1";
export const DERIV_WS_URL = `wss://ws.binaryws.com/websockets/v3?app_id=${DERIV_APP_ID}`;

// ─── Types ───────────────────────────────────────────────────────────────────

export type DerivMessageHandler = (data: DerivResponse) => void;

export interface DerivResponse {
  msg_type: string;
  req_id?: number;
  error?: { code: string; message: string };
  [key: string]: unknown;
}

export interface AuthorizeResponse extends DerivResponse {
  msg_type: "authorize";
  authorize?: {
    loginid: string;
    currency: string;
    balance: number;
    is_virtual: 0 | 1;
    fullname: string;
    email: string;
    account_list: Array<{
      loginid: string;
      currency: string;
      is_virtual: 0 | 1;
    }>;
  };
}

export interface BalanceResponse extends DerivResponse {
  msg_type: "balance";
  balance?: {
    balance: number;
    currency: string;
    loginid: string;
  };
}

export interface TickResponse extends DerivResponse {
  msg_type: "tick";
  tick?: {
    symbol: string;
    epoch: number;
    quote: number;
    ask: number;
    bid: number;
  };
}

// ─── Connection State ─────────────────────────────────────────────────────────

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

class DerivWebSocketService {
  private ws: WebSocket | null = null;
  private status: ConnectionStatus = "disconnected";
  private reqId = 1;
  private handlers = new Map<string, Set<DerivMessageHandler>>();
  private reqCallbacks = new Map<number, (data: DerivResponse) => void>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private token: string | null = null;

  // ─── Connection ─────────────────────────────────────────────────────────────

  connect(token?: string): void {
    if (this.ws && this.ws.readyState <= WebSocket.OPEN) return;

    this.token = token ?? null;
    this.status = "connecting";

    this.ws = new WebSocket(DERIV_WS_URL);

    this.ws.onopen = () => {
      this.status = "connected";
      this.startPing();
      if (this.token) {
        this.authorize(this.token);
      }
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const data: DerivResponse = JSON.parse(event.data as string);
        this.dispatch(data);
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onclose = () => {
      this.status = "disconnected";
      this.stopPing();
      this.scheduleReconnect();
    };

    this.ws.onerror = () => {
      this.status = "error";
      this.ws?.close();
    };
  }

  disconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.stopPing();
    this.ws?.close();
    this.ws = null;
    this.status = "disconnected";
    this.token = null;
    this.handlers.clear();
    this.reqCallbacks.clear();
  }

  get connectionStatus(): ConnectionStatus {
    return this.status;
  }

  // ─── Messaging ──────────────────────────────────────────────────────────────

  /** Send a request and get a one-shot response via Promise */
  send<T extends DerivResponse = DerivResponse>(
    payload: Record<string, unknown>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error("WebSocket not connected"));
        return;
      }

      const id = this.reqId++;
      payload.req_id = id;

      this.reqCallbacks.set(id, (data) => {
        if (data.error) {
          reject(new Error(data.error.message));
        } else {
          resolve(data as T);
        }
      });

      this.ws.send(JSON.stringify(payload));
    });
  }

  /** Send a fire-and-forget message (for subscriptions) */
  sendRaw(payload: Record<string, unknown>): number {
    const id = this.reqId++;
    payload.req_id = id;
    this.ws?.send(JSON.stringify(payload));
    return id;
  }

  /** Subscribe to a message type */
  on(msgType: string, handler: DerivMessageHandler): () => void {
    if (!this.handlers.has(msgType)) {
      this.handlers.set(msgType, new Set());
    }
    this.handlers.get(msgType)!.add(handler);

    // Return unsubscribe function
    return () => {
      this.handlers.get(msgType)?.delete(handler);
    };
  }

  // ─── Deriv API Calls ────────────────────────────────────────────────────────

  /** Authorize with a Deriv API token */
  async authorize(token: string): Promise<AuthorizeResponse> {
    return this.send<AuthorizeResponse>({ authorize: token });
  }

  /** Subscribe to real-time balance updates */
  subscribeBalance(): void {
    this.sendRaw({ balance: 1, subscribe: 1 });
  }

  /** Forget (unsubscribe) a specific subscription */
  forget(subscriptionId: string): void {
    this.sendRaw({ forget: subscriptionId });
  }

  /** Forget all subscriptions of a type */
  forgetAll(msgType: string): void {
    this.sendRaw({ forget_all: msgType });
  }

  /** Get active symbols */
  async getActiveSymbols(): Promise<DerivResponse> {
    return this.send({
      active_symbols: "brief",
      product_type: "basic",
    });
  }

  /** Get a proposal price for a Rise/Fall contract */
  async getProposal(params: {
    symbol: string;
    amount: number;
    durationUnit: "m" | "h" | "d" | "t" | "s";
    duration: number;
    currency?: string;
  }): Promise<DerivResponse> {
    return this.send({
      proposal: 1,
      amount: params.amount,
      basis: "stake",
      contract_type: "CALL", // CALL = Rise, PUT = Fall
      currency: params.currency ?? "USD",
      duration: params.duration,
      duration_unit: params.durationUnit,
      symbol: params.symbol,
    });
  }

  // ─── Private Helpers ────────────────────────────────────────────────────────

  private dispatch(data: DerivResponse): void {
    // Route to one-shot req callback first
    if (data.req_id && this.reqCallbacks.has(data.req_id)) {
      const cb = this.reqCallbacks.get(data.req_id)!;
      this.reqCallbacks.delete(data.req_id);
      cb(data);
    }

    // Then broadcast to all msg_type subscribers
    if (data.msg_type) {
      this.handlers.get(data.msg_type)?.forEach((h) => h(data));
      // Wildcard handlers
      this.handlers.get("*")?.forEach((h) => h(data));
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.token) {
        this.connect(this.token);
      }
    }, 3000);
  }

  private startPing(): void {
    this.pingTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ ping: 1 }));
      }
    }, 30000);
  }

  private stopPing(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }
}

// ─── Singleton Export ─────────────────────────────────────────────────────────

export const derivWS = new DerivWebSocketService();
