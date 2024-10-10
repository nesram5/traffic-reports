System.register(["engine.io-parser@5.2.3","@socket.io/component-emitter@3.1.2","engine.io-client@6.6.1","socket.io-parser@4.2.4"], (_exports, _context) => {

const bimport = specifier => {
	const dependencies = new Map([["engine.io-parser","5.2.3"],["@socket.io/component-emitter","3.1.2"],["engine.io-client","6.6.1"],["socket.io-client","4.8.0"],["socket.io-parser","4.2.4"]]);
	return globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));
};


var dependencies = new Map();
var require = dependency => dependencies.get(dependency);
return {
setters: [dep => dependencies.set('engine.io-parser@5.2.3', dep), dep => dependencies.set('@socket.io/component-emitter@3.1.2', dep), dep => dependencies.set('engine.io-client@6.6.1', dep), dep => dependencies.set('socket.io-parser@4.2.4', dep)],
execute: function() {
// Prevent esbuild from considering the context to be amd
const define = void 0;
const module = {};

const code = (module, require) => {
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);

// .beyond/uimport/socket.io-client.4.8.0.js
var socket_io_client_4_8_0_exports = {};
__export(socket_io_client_4_8_0_exports, {
  Manager: () => Manager,
  Socket: () => Socket,
  connect: () => lookup,
  default: () => socket_io_client_4_8_0_default,
  io: () => lookup,
  protocol: () => import_socket4.protocol
});
module.exports = __toCommonJS(socket_io_client_4_8_0_exports);

// node_modules/socket.io-client/build/esm/url.js
var import_engine = require("engine.io-client@6.6.1");
function url(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri) uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = (0, import_engine.parse)(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}

// node_modules/socket.io-client/build/esm/on.js
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}

// node_modules/socket.io-client/build/esm/socket.js
var import_socket = require("socket.io-parser@4.2.4");
var import_component_emitter = require("@socket.io/component-emitter@3.1.2");
var RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1
});
var Socket = class extends import_component_emitter.Emitter {
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.recovered = false;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this._queue = [];
    this._queueSeq = 0;
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    this._opts = Object.assign({}, opts);
    if (this.io._autoConnect) this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const io = this.io;
    this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    if (this.connected) return this;
    this.subEvents();
    if (!this.io["_reconnecting"]) this.io.open();
    if ("open" === this.io._readyState) this.onopen();
    return this;
  }
  open() {
    return this.connect();
  }
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  emit(ev, ...args) {
    var _a, _b, _c;
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
      this._addToQueue(args);
      return this;
    }
    const packet = {
      type: import_socket.PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
    const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
    const discardPacket = this.flags.volatile && !isTransportWritable;
    if (discardPacket) {} else if (isConnected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  _registerAckCallback(id, ack) {
    var _a;
    const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
    if (timeout === void 0) {
      this.acks[id] = ack;
      return;
    }
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i = 0; i < this.sendBuffer.length; i++) {
        if (this.sendBuffer[i].id === id) {
          this.sendBuffer.splice(i, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    const fn = (...args) => {
      this.io.clearTimeoutFn(timer);
      ack.apply(this, args);
    };
    fn.withError = true;
    this.acks[id] = fn;
  }
  emitWithAck(ev, ...args) {
    return new Promise((resolve, reject) => {
      const fn = (arg1, arg2) => {
        return arg1 ? reject(arg1) : resolve(arg2);
      };
      fn.withError = true;
      args.push(fn);
      this.emit(ev, ...args);
    });
  }
  _addToQueue(args) {
    let ack;
    if (typeof args[args.length - 1] === "function") {
      ack = args.pop();
    }
    const packet = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: false,
      args,
      flags: Object.assign({
        fromQueue: true
      }, this.flags)
    };
    args.push((err, ...responseArgs) => {
      if (packet !== this._queue[0]) {
        return;
      }
      const hasError = err !== null;
      if (hasError) {
        if (packet.tryCount > this._opts.retries) {
          this._queue.shift();
          if (ack) {
            ack(err);
          }
        }
      } else {
        this._queue.shift();
        if (ack) {
          ack(null, ...responseArgs);
        }
      }
      packet.pending = false;
      return this._drainQueue();
    });
    this._queue.push(packet);
    this._drainQueue();
  }
  _drainQueue(force = false) {
    if (!this.connected || this._queue.length === 0) {
      return;
    }
    const packet = this._queue[0];
    if (packet.pending && !force) {
      return;
    }
    packet.pending = true;
    packet.tryCount++;
    this.flags = packet.flags;
    this.emit.apply(this, packet.args);
  }
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  onopen() {
    if (typeof this.auth == "function") {
      this.auth(data => {
        this._sendConnectPacket(data);
      });
    } else {
      this._sendConnectPacket(this.auth);
    }
  }
  _sendConnectPacket(data) {
    this.packet({
      type: import_socket.PacketType.CONNECT,
      data: this._pid ? Object.assign({
        pid: this._pid,
        offset: this._lastOffset
      }, data) : data
    });
  }
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
    this._clearAcks();
  }
  _clearAcks() {
    Object.keys(this.acks).forEach(id => {
      const isBuffered = this.sendBuffer.some(packet => String(packet.id) === id);
      if (!isBuffered) {
        const ack = this.acks[id];
        delete this.acks[id];
        if (ack.withError) {
          ack.call(this, new Error("socket has been disconnected"));
        }
      }
    });
  }
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace) return;
    switch (packet.type) {
      case import_socket.PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          this.onconnect(packet.data.sid, packet.data.pid);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case import_socket.PacketType.EVENT:
      case import_socket.PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case import_socket.PacketType.ACK:
      case import_socket.PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case import_socket.PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case import_socket.PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
    if (this._pid && args.length && typeof args[args.length - 1] === "string") {
      this._lastOffset = args[args.length - 1];
    }
  }
  ack(id) {
    const self = this;
    let sent = false;
    return function (...args) {
      if (sent) return;
      sent = true;
      self.packet({
        type: import_socket.PacketType.ACK,
        id,
        data: args
      });
    };
  }
  onack(packet) {
    const ack = this.acks[packet.id];
    if (typeof ack !== "function") {
      return;
    }
    delete this.acks[packet.id];
    if (ack.withError) {
      packet.data.unshift(null);
    }
    ack.apply(this, packet.data);
  }
  onconnect(id, pid) {
    this.id = id;
    this.recovered = pid && this._pid === pid;
    this._pid = pid;
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
    this._drainQueue(true);
  }
  emitBuffered() {
    this.receiveBuffer.forEach(args => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach(packet => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  destroy() {
    if (this.subs) {
      this.subs.forEach(subDestroy => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  disconnect() {
    if (this.connected) {
      this.packet({
        type: import_socket.PacketType.DISCONNECT
      });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  close() {
    return this.disconnect();
  }
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
};

// node_modules/socket.io-client/build/esm/contrib/backo2.js
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff.prototype.reset = function () {
  this.attempts = 0;
};
Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
Backoff.prototype.setMax = function (max) {
  this.max = max;
};
Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

// node_modules/socket.io-client/build/esm/manager.js
var import_engine2 = require("engine.io-client@6.6.1");
var parser = __toESM(require("socket.io-parser@4.2.4"), 0);
var import_component_emitter2 = require("@socket.io/component-emitter@3.1.2");
var Manager = class extends import_component_emitter2.Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    (0, import_engine2.installTimerFunctions)(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || parser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect) this.open();
  }
  reconnection(v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    if (!v) {
      this.skipReconnect = true;
    }
    return this;
  }
  reconnectionAttempts(v) {
    if (v === void 0) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === void 0) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === void 0) return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === void 0) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  }
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  open(fn) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new import_engine2.Socket(this.uri, this.opts);
    const socket = this.engine;
    const self = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on(socket, "open", function () {
      self.onopen();
      fn && fn();
    });
    const onError = err => {
      this.cleanup();
      this._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        this.maybeReconnectOnOpen();
      }
    };
    const errorSub = on(socket, "error", onError);
    if (false !== this._timeout) {
      const timeout = this._timeout;
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        onError(new Error("timeout"));
        socket.close();
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  connect(fn) {
    return this.open(fn);
  }
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket = this.engine;
    this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error", e);
    }
  }
  ondecoded(packet) {
    (0, import_engine2.nextTick)(() => {
      this.emitReserved("packet", packet);
    }, this.setTimeoutFn);
  }
  onerror(err) {
    this.emitReserved("error", err);
  }
  socket(nsp, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new Socket(this, nsp, opts);
      this.nsps[nsp] = socket;
    } else if (this._autoConnect && !socket.active) {
      socket.connect();
    }
    return socket;
  }
  _destroy(socket) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket2 = this.nsps[nsp];
      if (socket2.active) {
        return;
      }
    }
    this._close();
  }
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i = 0; i < encodedPackets.length; i++) {
      this.engine.write(encodedPackets[i], packet.options);
    }
  }
  cleanup() {
    this.subs.forEach(subDestroy => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
  }
  disconnect() {
    return this._close();
  }
  onclose(reason, description) {
    var _a;
    this.cleanup();
    (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const self = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self.skipReconnect) return;
        this.emitReserved("reconnect_attempt", self.backoff.attempts);
        if (self.skipReconnect) return;
        self.open(err => {
          if (err) {
            self._reconnecting = false;
            self.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
  }
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
};

// node_modules/socket.io-client/build/esm/index.js
var import_socket4 = require("socket.io-parser@4.2.4");
var cache = {};
function lookup(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup, {
  Manager,
  Socket,
  io: lookup,
  connect: lookup
});

// .beyond/uimport/socket.io-client.4.8.0.js
var socket_io_client_4_8_0_default = lookup;
};

code(module, require);
_exports(module.exports);
}}});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9zb2NrZXQuaW8tY2xpZW50LjQuOC4wLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL3VybC5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9vbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9zb2NrZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9iYWNrbzIuanMiLCIuLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9pbmRleC5qcyJdLCJuYW1lcyI6WyJzb2NrZXRfaW9fY2xpZW50XzRfOF8wX2V4cG9ydHMiLCJfX2V4cG9ydCIsIk1hbmFnZXIiLCJTb2NrZXQiLCJjb25uZWN0IiwibG9va3VwIiwiZGVmYXVsdCIsInNvY2tldF9pb19jbGllbnRfNF84XzBfZGVmYXVsdCIsImlvIiwicHJvdG9jb2wiLCJpbXBvcnRfc29ja2V0NCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfX3RvQ29tbW9uSlMiLCJpbXBvcnRfZW5naW5lIiwicmVxdWlyZSIsInVybCIsInVyaSIsInBhdGgiLCJsb2MiLCJvYmoiLCJsb2NhdGlvbiIsImhvc3QiLCJjaGFyQXQiLCJ0ZXN0IiwicGFyc2UiLCJwb3J0IiwiaXB2NiIsImluZGV4T2YiLCJpZCIsImhyZWYiLCJvbiIsImV2IiwiZm4iLCJzdWJEZXN0cm95Iiwib2ZmIiwiaW1wb3J0X3NvY2tldCIsImltcG9ydF9jb21wb25lbnRfZW1pdHRlciIsIlJFU0VSVkVEX0VWRU5UUyIsIk9iamVjdCIsImZyZWV6ZSIsImNvbm5lY3RfZXJyb3IiLCJkaXNjb25uZWN0IiwiZGlzY29ubmVjdGluZyIsIm5ld0xpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJFbWl0dGVyIiwiY29uc3RydWN0b3IiLCJuc3AiLCJvcHRzIiwiY29ubmVjdGVkIiwicmVjb3ZlcmVkIiwicmVjZWl2ZUJ1ZmZlciIsInNlbmRCdWZmZXIiLCJfcXVldWUiLCJfcXVldWVTZXEiLCJpZHMiLCJhY2tzIiwiZmxhZ3MiLCJhdXRoIiwiX29wdHMiLCJhc3NpZ24iLCJfYXV0b0Nvbm5lY3QiLCJvcGVuIiwiZGlzY29ubmVjdGVkIiwic3ViRXZlbnRzIiwic3VicyIsIm9ub3BlbiIsImJpbmQiLCJvbnBhY2tldCIsIm9uZXJyb3IiLCJvbmNsb3NlIiwiYWN0aXZlIiwiX3JlYWR5U3RhdGUiLCJzZW5kIiwiYXJncyIsInVuc2hpZnQiLCJlbWl0IiwiYXBwbHkiLCJfYSIsIl9iIiwiX2MiLCJoYXNPd25Qcm9wZXJ0eSIsIkVycm9yIiwidG9TdHJpbmciLCJyZXRyaWVzIiwiZnJvbVF1ZXVlIiwidm9sYXRpbGUiLCJfYWRkVG9RdWV1ZSIsInBhY2tldCIsInR5cGUiLCJQYWNrZXRUeXBlIiwiRVZFTlQiLCJkYXRhIiwib3B0aW9ucyIsImNvbXByZXNzIiwibGVuZ3RoIiwiYWNrIiwicG9wIiwiX3JlZ2lzdGVyQWNrQ2FsbGJhY2siLCJpc1RyYW5zcG9ydFdyaXRhYmxlIiwiZW5naW5lIiwidHJhbnNwb3J0Iiwid3JpdGFibGUiLCJpc0Nvbm5lY3RlZCIsIl9oYXNQaW5nRXhwaXJlZCIsImRpc2NhcmRQYWNrZXQiLCJub3RpZnlPdXRnb2luZ0xpc3RlbmVycyIsInB1c2giLCJ0aW1lb3V0IiwiYWNrVGltZW91dCIsInRpbWVyIiwic2V0VGltZW91dEZuIiwiaSIsInNwbGljZSIsImNhbGwiLCJjbGVhclRpbWVvdXRGbiIsIndpdGhFcnJvciIsImVtaXRXaXRoQWNrIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJhcmcxIiwiYXJnMiIsInRyeUNvdW50IiwicGVuZGluZyIsImVyciIsInJlc3BvbnNlQXJncyIsImhhc0Vycm9yIiwic2hpZnQiLCJfZHJhaW5RdWV1ZSIsImZvcmNlIiwiX3BhY2tldCIsIl9zZW5kQ29ubmVjdFBhY2tldCIsIkNPTk5FQ1QiLCJfcGlkIiwicGlkIiwib2Zmc2V0IiwiX2xhc3RPZmZzZXQiLCJlbWl0UmVzZXJ2ZWQiLCJyZWFzb24iLCJkZXNjcmlwdGlvbiIsIl9jbGVhckFja3MiLCJrZXlzIiwiZm9yRWFjaCIsImlzQnVmZmVyZWQiLCJzb21lIiwiU3RyaW5nIiwic2FtZU5hbWVzcGFjZSIsInNpZCIsIm9uY29ubmVjdCIsIkJJTkFSWV9FVkVOVCIsIm9uZXZlbnQiLCJBQ0siLCJCSU5BUllfQUNLIiwib25hY2siLCJESVNDT05ORUNUIiwib25kaXNjb25uZWN0IiwiQ09OTkVDVF9FUlJPUiIsImRlc3Ryb3kiLCJtZXNzYWdlIiwiZW1pdEV2ZW50IiwiX2FueUxpc3RlbmVycyIsImxpc3RlbmVycyIsInNsaWNlIiwibGlzdGVuZXIiLCJzZWxmIiwic2VudCIsImVtaXRCdWZmZXJlZCIsImNsb3NlIiwib25BbnkiLCJwcmVwZW5kQW55Iiwib2ZmQW55IiwibGlzdGVuZXJzQW55Iiwib25BbnlPdXRnb2luZyIsIl9hbnlPdXRnb2luZ0xpc3RlbmVycyIsInByZXBlbmRBbnlPdXRnb2luZyIsIm9mZkFueU91dGdvaW5nIiwibGlzdGVuZXJzQW55T3V0Z29pbmciLCJCYWNrb2ZmIiwibXMiLCJtaW4iLCJtYXgiLCJmYWN0b3IiLCJqaXR0ZXIiLCJhdHRlbXB0cyIsInByb3RvdHlwZSIsImR1cmF0aW9uIiwiTWF0aCIsInBvdyIsInJhbmQiLCJyYW5kb20iLCJkZXZpYXRpb24iLCJmbG9vciIsInJlc2V0Iiwic2V0TWluIiwic2V0TWF4Iiwic2V0Sml0dGVyIiwiaW1wb3J0X2VuZ2luZTIiLCJwYXJzZXIiLCJfX3RvRVNNIiwiaW1wb3J0X2NvbXBvbmVudF9lbWl0dGVyMiIsIm5zcHMiLCJpbnN0YWxsVGltZXJGdW5jdGlvbnMiLCJyZWNvbm5lY3Rpb24iLCJyZWNvbm5lY3Rpb25BdHRlbXB0cyIsIkluZmluaXR5IiwicmVjb25uZWN0aW9uRGVsYXkiLCJyZWNvbm5lY3Rpb25EZWxheU1heCIsInJhbmRvbWl6YXRpb25GYWN0b3IiLCJiYWNrb2ZmIiwiX3BhcnNlciIsImVuY29kZXIiLCJFbmNvZGVyIiwiZGVjb2RlciIsIkRlY29kZXIiLCJhdXRvQ29ubmVjdCIsInYiLCJhcmd1bWVudHMiLCJfcmVjb25uZWN0aW9uIiwic2tpcFJlY29ubmVjdCIsIl9yZWNvbm5lY3Rpb25BdHRlbXB0cyIsIl9yZWNvbm5lY3Rpb25EZWxheSIsIl9yYW5kb21pemF0aW9uRmFjdG9yIiwiX3JlY29ubmVjdGlvbkRlbGF5TWF4IiwiX3RpbWVvdXQiLCJtYXliZVJlY29ubmVjdE9uT3BlbiIsIl9yZWNvbm5lY3RpbmciLCJyZWNvbm5lY3QiLCJzb2NrZXQiLCJvcGVuU3ViRGVzdHJveSIsIm9uRXJyb3IiLCJjbGVhbnVwIiwiZXJyb3JTdWIiLCJhdXRvVW5yZWYiLCJ1bnJlZiIsIm9ucGluZyIsIm9uZGF0YSIsIm9uZGVjb2RlZCIsImFkZCIsImUiLCJuZXh0VGljayIsIl9kZXN0cm95Iiwic29ja2V0MiIsIl9jbG9zZSIsImVuY29kZWRQYWNrZXRzIiwiZW5jb2RlIiwid3JpdGUiLCJkZWxheSIsIm9ucmVjb25uZWN0IiwiYXR0ZW1wdCIsImNhY2hlIiwicGFyc2VkIiwic291cmNlIiwibmV3Q29ubmVjdGlvbiIsImZvcmNlTmV3IiwibXVsdGlwbGV4IiwicXVlcnkiLCJxdWVyeUtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsOEJBQUE7QUFBQUMsUUFBQSxDQUFBRCw4QkFBQTtFQUFBRSxPQUFBLEVBQUFBLENBQUEsS0FBQUEsT0FBQTtFQUFBQyxNQUFBLEVBQUFBLENBQUEsS0FBQUEsTUFBQTtFQUFBQyxPQUFBLEVBQUFBLENBQUEsS0FBQUMsTUFBQTtFQUFBQyxPQUFBLEVBQUFBLENBQUEsS0FBQUMsOEJBQUE7RUFBQUMsRUFBQSxFQUFB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