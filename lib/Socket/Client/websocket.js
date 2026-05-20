//=======================================================//
import { DEFAULT_ORIGIN } from "../../Defaults/index.js";
import { AbstractSocketClient } from "./types.js";
import WebSocket from "ws";
//=======================================================//
export class WebSocketClient extends AbstractSocketClient {
  constructor() {
    super(...arguments);
    this.socket = null;
  }
  get isOpen() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
  get isClosed() {
    return this.socket === null || this.socket?.readyState === WebSocket.CLOSED;
  }
  get isClosing() {
    return this.socket === null || this.socket?.readyState === WebSocket.CLOSING;
  }
  get isConnecting() {
    return this.socket?.readyState === WebSocket.CONNECTING;
  }
  async connect() {
    if (this.socket) {
      return;
    }
    this.socket = new WebSocket(this.url, {
      origin: DEFAULT_ORIGIN,
      headers: this.config.options?.headers,
      handshakeTimeout: this.config.connectTimeoutMs,
      timeout: this.config.connectTimeoutMs,
      agent: this.config.agent
    });
    this.socket.setMaxListeners(0);
    const events = ["close", "error", "upgrade", "message", "open", "ping", "pong", "unexpected-response"];
    for (const event of events) {
      this.socket?.on(event, (...args) => this.emit(event, ...args));
    }
  }
  async close() {
    if (!this.socket) {
      return;
    }
    this.socket.close();
    this.socket = null;
  }
  send(str, cb) {
    try {
      if (this.socket && this.isOpen) {
        this.socket.send(str, cb);
        return true;
      }
      if (cb) {
        cb(new Error("WebSocket is not open"));
      }
      return false;
    } catch (err) {
      if (cb) {
        cb(err);
      }
      return false;
    }
  }
}
//=======================================================//