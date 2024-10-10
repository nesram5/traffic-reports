System.register(["engine.io-parser@5.2.3","@socket.io/component-emitter@3.1.2"], (_exports, _context) => {

const bimport = specifier => {
	const dependencies = new Map([["engine.io-parser","5.2.3"],["@socket.io/component-emitter","3.1.2"],["engine.io-client","6.6.1"]]);
	return globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));
};


var dependencies = new Map();
var require = dependency => dependencies.get(dependency);
return {
setters: [dep => dependencies.set('engine.io-parser@5.2.3', dep), dep => dependencies.set('@socket.io/component-emitter@3.1.2', dep)],
execute: function() {
// Prevent esbuild from considering the context to be amd
const define = void 0;
const module = {};

const code = (module, require) => {
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);

// .beyond/uimport/engine.io-client.6.6.1.js
var engine_io_client_6_6_1_exports = {};
__export(engine_io_client_6_6_1_exports, {
  Fetch: () => Fetch,
  NodeWebSocket: () => WS,
  NodeXHR: () => XHR,
  Socket: () => Socket,
  SocketWithUpgrade: () => SocketWithUpgrade,
  SocketWithoutUpgrade: () => SocketWithoutUpgrade,
  Transport: () => Transport,
  TransportError: () => TransportError,
  WebSocket: () => WS,
  WebTransport: () => WT,
  XHR: () => XHR,
  installTimerFunctions: () => installTimerFunctions,
  nextTick: () => nextTick,
  parse: () => parse,
  protocol: () => protocol2,
  transports: () => transports
});
module.exports = __toCommonJS(engine_io_client_6_6_1_exports);

// node_modules/engine.io-client/build/esm/globals.js
var nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return cb => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
var globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();
var defaultBinaryType = "arraybuffer";
function createCookieJar() {}

// node_modules/engine.io-client/build/esm/util.js
function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
  } else {
    obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
    obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
  }
}
var BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c = 0,
    length = 0;
  for (let i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 128) {
      length += 1;
    } else if (c < 2048) {
      length += 2;
    } else if (c < 55296 || c >= 57344) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length;
}
function randomString() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}

// node_modules/engine.io-client/build/esm/contrib/parseqs.js
function encode(obj) {
  let str = "";
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += "&";
      str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
    }
  }
  return str;
}
function decode(qs) {
  let qry = {};
  let pairs = qs.split("&");
  for (let i = 0, l = pairs.length; i < l; i++) {
    let pair = pairs[i].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}

// node_modules/engine.io-client/build/esm/transport.js
var import_engine = require("engine.io-parser@5.2.3");
var import_component_emitter = require("@socket.io/component-emitter@3.1.2");
var TransportError = class extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
};
var Transport = class extends import_component_emitter.Emitter {
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
    this.supportsBinary = !opts.forceBase64;
  }
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  open() {
    this.readyState = "opening";
    this.doOpen();
    return this;
  }
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    } else {}
  }
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  onData(data) {
    const packet = (0, import_engine.decodePacket)(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
  pause(onPause) {}
  createUri(schema, query = {}) {
    return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
  }
  _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }
  _port() {
    if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }
  _query(query) {
    const encodedQuery = encode(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }
};

// node_modules/engine.io-client/build/esm/transports/polling.js
var import_engine2 = require("engine.io-parser@5.2.3");
var Polling = class extends Transport {
  constructor() {
    super(...arguments);
    this._polling = false;
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this._poll();
  }
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this._polling || !this.writable) {
      let total = 0;
      if (this._polling) {
        total++;
        this.once("pollComplete", function () {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function () {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  _poll() {
    this._polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  onData(data) {
    const callback = packet => {
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      if ("close" === packet.type) {
        this.onClose({
          description: "transport closed by the server"
        });
        return false;
      }
      this.onPacket(packet);
    };
    (0, import_engine2.decodePayload)(data, this.socket.binaryType).forEach(callback);
    if ("closed" !== this.readyState) {
      this._polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this._poll();
      } else {}
    }
  }
  doClose() {
    const close = () => {
      this.write([{
        type: "close"
      }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      this.once("open", close);
    }
  }
  write(packets) {
    this.writable = false;
    (0, import_engine2.encodePayload)(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  uri() {
    const schema = this.opts.secure ? "https" : "http";
    const query = this.query || {};
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = randomString();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
};

// node_modules/engine.io-client/build/esm/contrib/has-cors.js
var value = false;
try {
  value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {}
var hasCORS = value;

// node_modules/engine.io-client/build/esm/transports/polling-xhr.js
var import_component_emitter2 = require("@socket.io/component-emitter@3.1.2");
function empty() {}
var BaseXHR = class extends Polling {
  constructor(opts) {
    super(opts);
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
    }
  }
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
};
var Request = class extends import_component_emitter2.Emitter {
  constructor(createRequest, uri, opts) {
    super();
    this.createRequest = createRequest;
    installTimerFunctions(this, opts);
    this._opts = opts;
    this._method = opts.method || "GET";
    this._uri = uri;
    this._data = void 0 !== opts.data ? opts.data : null;
    this._create();
  }
  _create() {
    var _a;
    const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this._opts.xd;
    const xhr = this._xhr = this.createRequest(opts);
    try {
      xhr.open(this._method, this._uri, true);
      try {
        if (this._opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i in this._opts.extraHeaders) {
            if (this._opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}
      if ("POST" === this._method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {}
      (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this._opts.withCredentials;
      }
      if (this._opts.requestTimeout) {
        xhr.timeout = this._opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        var _a2;
        if (xhr.readyState === 3) {
          (_a2 = this._opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(xhr.getResponseHeader("set-cookie"));
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this._onLoad();
        } else {
          this.setTimeoutFn(() => {
            this._onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this._data);
    } catch (e) {
      this.setTimeoutFn(() => {
        this._onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this._index = Request.requestsCount++;
      Request.requests[this._index] = this;
    }
  }
  _onError(err) {
    this.emitReserved("error", err, this._xhr);
    this._cleanup(true);
  }
  _cleanup(fromError) {
    if ("undefined" === typeof this._xhr || null === this._xhr) {
      return;
    }
    this._xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this._xhr.abort();
      } catch (e) {}
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this._index];
    }
    this._xhr = null;
  }
  _onLoad() {
    const data = this._xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this._cleanup();
    }
  }
  abort() {
    this._cleanup();
  }
};
Request.requestsCount = 0;
Request.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}
var hasXHR2 = function () {
  const xhr = newRequest({
    xdomain: false
  });
  return xhr && xhr.responseType !== null;
}();
var XHR = class extends BaseXHR {
  constructor(opts) {
    super(opts);
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }
  request(opts = {}) {
    Object.assign(opts, {
      xd: this.xd
    }, this.opts);
    return new Request(newRequest, this.uri(), opts);
  }
};
function newRequest(opts) {
  const xdomain = opts.xdomain;
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}
  if (!xdomain) {
    try {
      return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {}
  }
}

// node_modules/engine.io-client/build/esm/transports/websocket.js
var import_engine3 = require("engine.io-parser@5.2.3");
var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var BaseWS = class extends Transport {
  get name() {
    return "websocket";
  }
  doOpen() {
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = this.createSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType;
    this.addEventListeners();
  }
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = closeEvent => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = ev => this.onData(ev.data);
    this.ws.onerror = e => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      (0, import_engine3.encodePacket)(packet, this.supportsBinary, data => {
        try {
          this.doWrite(packet, data);
        } catch (e) {}
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query = this.query || {};
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = randomString();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
};
var WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
var WS = class extends BaseWS {
  createSocket(uri, protocols, opts) {
    return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
  }
  doWrite(_packet, data) {
    this.ws.send(data);
  }
};

// node_modules/engine.io-client/build/esm/transports/webtransport.js
var import_engine4 = require("engine.io-parser@5.2.3");
var WT = class extends Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch(err => {
      this.onError("webtransport error", err);
    });
    this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then(stream => {
        const decoderStream = (0, import_engine4.createPacketDecoderStream)(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
        const reader = stream.readable.pipeThrough(decoderStream).getReader();
        const encoderStream = (0, import_engine4.createPacketEncoderStream)();
        encoderStream.readable.pipeTo(stream.writable);
        this._writer = encoderStream.writable.getWriter();
        const read = () => {
          reader.read().then(({
            done,
            value: value2
          }) => {
            if (done) {
              return;
            }
            this.onPacket(value2);
            read();
          }).catch(err => {});
        };
        read();
        const packet = {
          type: "open"
        };
        if (this.query.sid) {
          packet.data = `{"sid":"${this.query.sid}"}`;
        }
        this._writer.write(packet).then(() => this.onOpen());
      });
    });
  }
  write(packets) {
    this.writable = false;
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      this._writer.write(packet).then(() => {
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    var _a;
    (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
  }
};

// node_modules/engine.io-client/build/esm/transports/index.js
var transports = {
  websocket: WS,
  webtransport: WT,
  polling: XHR
};

// node_modules/engine.io-client/build/esm/contrib/parseuri.js
var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
function parse(str) {
  if (str.length > 8e3) {
    throw "URI too long";
  }
  const src = str,
    b = str.indexOf("["),
    e = str.indexOf("]");
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
  }
  let m = re.exec(str || ""),
    uri = {},
    i = 14;
  while (i--) {
    uri[parts[i]] = m[i] || "";
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri["path"]);
  uri.queryKey = queryKey(uri, uri["query"]);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g,
    names = path.replace(regx, "/").split("/");
  if (path.slice(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.slice(-1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

// node_modules/engine.io-client/build/esm/socket.js
var import_component_emitter3 = require("@socket.io/component-emitter@3.1.2");
var import_engine5 = require("engine.io-parser@5.2.3");
var withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
var OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) {
  addEventListener("offline", () => {
    OFFLINE_EVENT_LISTENERS.forEach(listener => listener());
  }, false);
}
var SocketWithoutUpgrade = class extends import_component_emitter3.Emitter {
  constructor(uri, opts) {
    super();
    this.binaryType = defaultBinaryType;
    this.writeBuffer = [];
    this._prevBufferLen = 0;
    this._pingInterval = -1;
    this._pingTimeout = -1;
    this._maxPayload = -1;
    this._pingTimeoutTime = Infinity;
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      const parsedUri = parse(uri);
      opts.hostname = parsedUri.host;
      opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
      opts.port = parsedUri.port;
      if (parsedUri.query) opts.query = parsedUri.query;
    } else if (opts.host) {
      opts.hostname = parse(opts.host).host;
    }
    installTimerFunctions(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = [];
    this._transportsByName = {};
    opts.transports.forEach(t => {
      const transportName = t.prototype.name;
      this.transports.push(transportName);
      this._transportsByName[transportName] = t;
    });
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      addTrailingSlash: true,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: false
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
    if (typeof this.opts.query === "string") {
      this.opts.query = decode(this.opts.query);
    }
    if (withEventListeners) {
      if (this.opts.closeOnBeforeunload) {
        this._beforeunloadEventListener = () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        };
        addEventListener("beforeunload", this._beforeunloadEventListener, false);
      }
      if (this.hostname !== "localhost") {
        this._offlineEventListener = () => {
          this._onClose("transport close", {
            description: "network connection lost"
          });
        };
        OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
      }
    }
    if (this.opts.withCredentials) {
      this._cookieJar = createCookieJar();
    }
    this._open();
  }
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    query.EIO = import_engine5.protocol;
    query.transport = name;
    if (this.id) query.sid = this.id;
    const opts = Object.assign({}, this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[name]);
    return new this._transportsByName[name](opts);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const transport = this.createTransport(transportName);
    transport.open();
    this.setTransport(transport);
  }
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", reason => this._onClose("transport close", reason));
  }
  onOpen() {
    this.readyState = "open";
    SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
  }
  _onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this._sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          this._resetPingTimeout();
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this._onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {}
  }
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this._pingInterval = data.pingInterval;
    this._pingTimeout = data.pingTimeout;
    this._maxPayload = data.maxPayload;
    this.onOpen();
    if ("closed" === this.readyState) return;
    this._resetPingTimeout();
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const delay = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + delay;
    this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, delay);
    if (this.opts.autoUnref) {
      this._pingTimeoutTimer.unref();
    }
  }
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen);
    this._prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this._getWritablePackets();
      this.transport.send(packets);
      this._prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  _getWritablePackets() {
    const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1;
    for (let i = 0; i < this.writeBuffer.length; i++) {
      const data = this.writeBuffer[i].data;
      if (data) {
        payloadSize += byteLength(data);
      }
      if (i > 0 && payloadSize > this._maxPayload) {
        return this.writeBuffer.slice(0, i);
      }
      payloadSize += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return true;
    const hasExpired = Date.now() > this._pingTimeoutTime;
    if (hasExpired) {
      this._pingTimeoutTime = 0;
      nextTick(() => {
        this._onClose("ping timeout");
      }, this.setTimeoutFn);
    }
    return hasExpired;
  }
  write(msg, options, fn) {
    this._sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this._sendPacket("message", msg, options, fn);
    return this;
  }
  _sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = void 0;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }
  close() {
    const close = () => {
      this._onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  _onError(err) {
    SocketWithoutUpgrade.priorWebsocketSuccess = false;
    if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
      this.transports.shift();
      return this._open();
    }
    this.emitReserved("error", err);
    this._onClose("transport error", err);
  }
  _onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.clearTimeoutFn(this._pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (withEventListeners) {
        if (this._beforeunloadEventListener) {
          removeEventListener("beforeunload", this._beforeunloadEventListener, false);
        }
        if (this._offlineEventListener) {
          const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
          if (i !== -1) {
            OFFLINE_EVENT_LISTENERS.splice(i, 1);
          }
        }
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, description);
      this.writeBuffer = [];
      this._prevBufferLen = 0;
    }
  }
};
SocketWithoutUpgrade.protocol = import_engine5.protocol;
var SocketWithUpgrade = class extends SocketWithoutUpgrade {
  constructor() {
    super(...arguments);
    this._upgrades = [];
  }
  onOpen() {
    super.onOpen();
    if ("open" === this.readyState && this.opts.upgrade) {
      for (let i = 0; i < this._upgrades.length; i++) {
        this._probe(this._upgrades[i]);
      }
    }
  }
  _probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    SocketWithoutUpgrade.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed) return;
      transport.send([{
        type: "ping",
        data: "probe"
      }]);
      transport.once("packet", msg => {
        if (failed) return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport) return;
          SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed) return;
            if ("closed" === this.readyState) return;
            cleanup();
            this.setTransport(transport);
            transport.send([{
              type: "upgrade"
            }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed) return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = err => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
      this.setTimeoutFn(() => {
        if (!failed) {
          transport.open();
        }
      }, 200);
    } else {
      transport.open();
    }
  }
  onHandshake(data) {
    this._upgrades = this._filterUpgrades(data.upgrades);
    super.onHandshake(data);
  }
  _filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    for (let i = 0; i < upgrades.length; i++) {
      if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  }
};
var Socket = class extends SocketWithUpgrade {
  constructor(uri, opts = {}) {
    const o = typeof uri === "object" ? uri : opts;
    if (!o.transports || o.transports && typeof o.transports[0] === "string") {
      o.transports = (o.transports || ["polling", "websocket", "webtransport"]).map(transportName => transports[transportName]).filter(t => !!t);
    }
    super(uri, o);
  }
};

// node_modules/engine.io-client/build/esm/transports/polling-fetch.js
var Fetch = class extends Polling {
  doPoll() {
    this._fetch().then(res => {
      if (!res.ok) {
        return this.onError("fetch read error", res.status, res);
      }
      res.text().then(data => this.onData(data));
    }).catch(err => {
      this.onError("fetch read error", err);
    });
  }
  doWrite(data, callback) {
    this._fetch(data).then(res => {
      if (!res.ok) {
        return this.onError("fetch write error", res.status, res);
      }
      callback();
    }).catch(err => {
      this.onError("fetch write error", err);
    });
  }
  _fetch(data) {
    var _a;
    const isPost = data !== void 0;
    const headers = new Headers(this.opts.extraHeaders);
    if (isPost) {
      headers.set("content-type", "text/plain;charset=UTF-8");
    }
    (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.appendCookies(headers);
    return fetch(this.uri(), {
      method: isPost ? "POST" : "GET",
      body: isPost ? data : null,
      headers,
      credentials: this.opts.withCredentials ? "include" : "omit"
    }).then(res => {
      var _a2;
      (_a2 = this.socket._cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(res.headers.getSetCookie());
      return res;
    });
  }
};

// node_modules/engine.io-client/build/esm/index.js
var protocol2 = Socket.protocol;
};

code(module, require);
_exports(module.exports);
}}});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9lbmdpbmUuaW8tY2xpZW50LjYuNi4xLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdXRpbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3BhcnNlcXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvcG9sbGluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL2hhcy1jb3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvcG9sbGluZy14aHIuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy93ZWJzb2NrZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy93ZWJ0cmFuc3BvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3BhcnNldXJpLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3NvY2tldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3BvbGxpbmctZmV0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vaW5kZXguanMiXSwibmFtZXMiOlsiZW5naW5lX2lvX2NsaWVudF82XzZfMV9leHBvcnRzIiwiX19leHBvcnQiLCJGZXRjaCIsIk5vZGVXZWJTb2NrZXQiLCJXUyIsIk5vZGVYSFIiLCJYSFIiLCJTb2NrZXQiLCJTb2NrZXRXaXRoVXBncmFkZSIsIlNvY2tldFdpdGhvdXRVcGdyYWRlIiwiVHJhbnNwb3J0IiwiVHJhbnNwb3J0RXJyb3IiLCJXZWJTb2NrZXQiLCJXZWJUcmFuc3BvcnQiLCJXVCIsImluc3RhbGxUaW1lckZ1bmN0aW9ucyIsIm5leHRUaWNrIiwicGFyc2UiLCJwcm90b2NvbCIsInByb3RvY29sMiIsInRyYW5zcG9ydHMiLCJtb2R1bGUiLCJleHBvcnRzIiwiX190b0NvbW1vbkpTIiwiaXNQcm9taXNlQXZhaWxhYmxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjYiIsInRoZW4iLCJzZXRUaW1lb3V0Rm4iLCJnbG9iYWxUaGlzU2hpbSIsInNlbGYiLCJ3aW5kb3ciLCJGdW5jdGlvbiIsImRlZmF1bHRCaW5hcnlUeXBlIiwiY3JlYXRlQ29va2llSmFyIiwicGljayIsIm9iaiIsImF0dHIiLCJyZWR1Y2UiLCJhY2MiLCJrIiwiaGFzT3duUHJvcGVydHkiLCJOQVRJVkVfU0VUX1RJTUVPVVQiLCJzZXRUaW1lb3V0IiwiTkFUSVZFX0NMRUFSX1RJTUVPVVQiLCJjbGVhclRpbWVvdXQiLCJvcHRzIiwidXNlTmF0aXZlVGltZXJzIiwiYmluZCIsImNsZWFyVGltZW91dEZuIiwiQkFTRTY0X09WRVJIRUFEIiwiYnl0ZUxlbmd0aCIsInV0ZjhMZW5ndGgiLCJNYXRoIiwiY2VpbCIsInNpemUiLCJzdHIiLCJjIiwibGVuZ3RoIiwiaSIsImwiLCJjaGFyQ29kZUF0IiwicmFuZG9tU3RyaW5nIiwiRGF0ZSIsIm5vdyIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwicmFuZG9tIiwiZW5jb2RlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZGVjb2RlIiwicXMiLCJxcnkiLCJwYWlycyIsInNwbGl0IiwicGFpciIsImRlY29kZVVSSUNvbXBvbmVudCIsImltcG9ydF9lbmdpbmUiLCJyZXF1aXJlIiwiaW1wb3J0X2NvbXBvbmVudF9lbWl0dGVyIiwiRXJyb3IiLCJjb25zdHJ1Y3RvciIsInJlYXNvbiIsImRlc2NyaXB0aW9uIiwiY29udGV4dCIsInR5cGUiLCJFbWl0dGVyIiwid3JpdGFibGUiLCJxdWVyeSIsInNvY2tldCIsInN1cHBvcnRzQmluYXJ5IiwiZm9yY2VCYXNlNjQiLCJvbkVycm9yIiwiZW1pdFJlc2VydmVkIiwib3BlbiIsInJlYWR5U3RhdGUiLCJkb09wZW4iLCJjbG9zZSIsImRvQ2xvc2UiLCJvbkNsb3NlIiwic2VuZCIsInBhY2tldHMiLCJ3cml0ZSIsIm9uT3BlbiIsIm9uRGF0YSIsImRhdGEiLCJwYWNrZXQiLCJkZWNvZGVQYWNrZXQiLCJiaW5hcnlUeXBlIiwib25QYWNrZXQiLCJkZXRhaWxzIiwicGF1c2UiLCJvblBhdXNlIiwiY3JlYXRlVXJpIiwic2NoZW1hIiwiX2hvc3RuYW1lIiwiX3BvcnQiLCJwYXRoIiwiX3F1ZXJ5IiwiaG9zdG5hbWUiLCJpbmRleE9mIiwicG9ydCIsInNlY3VyZSIsIk51bWJlciIsImVuY29kZWRRdWVyeSIsImltcG9ydF9lbmdpbmUyIiwiUG9sbGluZyIsImFyZ3VtZW50cyIsIl9wb2xsaW5nIiwibmFtZSIsIl9wb2xsIiwidG90YWwiLCJvbmNlIiwiZG9Qb2xsIiwiY2FsbGJhY2siLCJkZWNvZGVQYXlsb2FkIiwiZm9yRWFjaCIsImVuY29kZVBheWxvYWQiLCJkb1dyaXRlIiwidXJpIiwidGltZXN0YW1wUmVxdWVzdHMiLCJ0aW1lc3RhbXBQYXJhbSIsInNpZCIsImI2NCIsInZhbHVlIiwiWE1MSHR0cFJlcXVlc3QiLCJlcnIiLCJoYXNDT1JTIiwiaW1wb3J0X2NvbXBvbmVudF9lbWl0dGVyMiIsImVtcHR5IiwiQmFzZVhIUiIsImxvY2F0aW9uIiwiaXNTU0wiLCJ4ZCIsImZuIiwicmVxIiwicmVxdWVzdCIsIm1ldGhvZCIsIm9uIiwieGhyU3RhdHVzIiwicG9sbFhociIsIlJlcXVlc3QiLCJjcmVhdGVSZXF1ZXN0IiwiX29wdHMiLCJfbWV0aG9kIiwiX3VyaSIsIl9kYXRhIiwiX2NyZWF0ZSIsIl9hIiwieGRvbWFpbiIsInhociIsIl94aHIiLCJleHRyYUhlYWRlcnMiLCJzZXREaXNhYmxlSGVhZGVyQ2hlY2siLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZSIsImNvb2tpZUphciIsImFkZENvb2tpZXMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXF1ZXN0VGltZW91dCIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJfYTIiLCJwYXJzZUNvb2tpZXMiLCJnZXRSZXNwb25zZUhlYWRlciIsInN0YXR1cyIsIl9vbkxvYWQiLCJfb25FcnJvciIsImRvY3VtZW50IiwiX2luZGV4IiwicmVxdWVzdHNDb3VudCIsInJlcXVlc3RzIiwiX2NsZWFudXAiLCJmcm9tRXJyb3IiLCJhYm9ydCIsInJlc3BvbnNlVGV4dCIsImF0dGFjaEV2ZW50IiwidW5sb2FkSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0ZXJtaW5hdGlvbkV2ZW50IiwiaGFzWEhSMiIsIm5ld1JlcXVlc3QiLCJyZXNwb25zZVR5cGUiLCJPYmplY3QiLCJhc3NpZ24iLCJjb25jYXQiLCJqb2luIiwiaW1wb3J0X2VuZ2luZTMiLCJpc1JlYWN0TmF0aXZlIiwibmF2aWdhdG9yIiwicHJvZHVjdCIsInRvTG93ZXJDYXNlIiwiQmFzZVdTIiwicHJvdG9jb2xzIiwiaGVhZGVycyIsIndzIiwiY3JlYXRlU29ja2V0IiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJvbm9wZW4iLCJhdXRvVW5yZWYiLCJfc29ja2V0IiwidW5yZWYiLCJvbmNsb3NlIiwiY2xvc2VFdmVudCIsIm9ubWVzc2FnZSIsImV2Iiwib25lcnJvciIsImxhc3RQYWNrZXQiLCJlbmNvZGVQYWNrZXQiLCJXZWJTb2NrZXRDdG9yIiwiTW96V2ViU29ja2V0IiwiX3BhY2tldCIsImltcG9ydF9lbmdpbmU0IiwiX3RyYW5zcG9ydCIsInRyYW5zcG9ydE9wdGlvbnMiLCJjbG9zZWQiLCJjYXRjaCIsInJlYWR5IiwiY3JlYXRlQmlkaXJlY3Rpb25hbFN0cmVhbSIsInN0cmVhbSIsImRlY29kZXJTdHJlYW0iLCJjcmVhdGVQYWNrZXREZWNvZGVyU3RyZWFtIiwiTUFYX1NBRkVfSU5URUdFUiIsInJlYWRlciIsInJlYWRhYmxlIiwicGlwZVRocm91Z2giLCJnZXRSZWFkZXIiLCJlbmNvZGVyU3RyZWFtIiwiY3JlYXRlUGFja2V0RW5jb2RlclN0cmVhbSIsInBpcGVUbyIsIl93cml0ZXIiLCJnZXRXcml0ZXIiLCJyZWFkIiwiZG9uZSIsInZhbHVlMiIsIndlYnNvY2tldCIsIndlYnRyYW5zcG9ydCIsInBvbGxpbmciLCJyZSIsInBhcnRzIiwic3JjIiwiYiIsInJlcGxhY2UiLCJtIiwiZXhlYyIsInNvdXJjZSIsImhvc3QiLCJhdXRob3JpdHkiLCJpcHY2dXJpIiwicGF0aE5hbWVzIiwicXVlcnlLZXkiLCJyZWd4IiwibmFtZXMiLCJzbGljZSIsInNwbGljZSIsIiQwIiwiJDEiLCIkMiIsImltcG9ydF9jb21wb25lbnRfZW1pdHRlcjMiLCJpbXBvcnRfZW5naW5lNSIsIndpdGhFdmVudExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJPRkZMSU5FX0VWRU5UX0xJU1RFTkVSUyIsImxpc3RlbmVyIiwid3JpdGVCdWZmZXIiLCJfcHJldkJ1ZmZlckxlbiIsIl9waW5nSW50ZXJ2YWwiLCJfcGluZ1RpbWVvdXQiLCJfbWF4UGF5bG9hZCIsIl9waW5nVGltZW91dFRpbWUiLCJJbmZpbml0eSIsInBhcnNlZFVyaSIsIl90cmFuc3BvcnRzQnlOYW1lIiwidCIsInRyYW5zcG9ydE5hbWUiLCJwcm90b3R5cGUiLCJwdXNoIiwiYWdlbnQiLCJ1cGdyYWRlIiwicmVtZW1iZXJVcGdyYWRlIiwiYWRkVHJhaWxpbmdTbGFzaCIsInJlamVjdFVuYXV0aG9yaXplZCIsInBlck1lc3NhZ2VEZWZsYXRlIiwidGhyZXNob2xkIiwiY2xvc2VPbkJlZm9yZXVubG9hZCIsIl9iZWZvcmV1bmxvYWRFdmVudExpc3RlbmVyIiwidHJhbnNwb3J0IiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiX29mZmxpbmVFdmVudExpc3RlbmVyIiwiX29uQ2xvc2UiLCJfY29va2llSmFyIiwiX29wZW4iLCJjcmVhdGVUcmFuc3BvcnQiLCJFSU8iLCJpZCIsInByaW9yV2Vic29ja2V0U3VjY2VzcyIsInNldFRyYW5zcG9ydCIsIl9vbkRyYWluIiwiX29uUGFja2V0IiwiZmx1c2giLCJvbkhhbmRzaGFrZSIsIkpTT04iLCJfc2VuZFBhY2tldCIsIl9yZXNldFBpbmdUaW1lb3V0IiwiY29kZSIsInBpbmdJbnRlcnZhbCIsInBpbmdUaW1lb3V0IiwibWF4UGF5bG9hZCIsIl9waW5nVGltZW91dFRpbWVyIiwiZGVsYXkiLCJ1cGdyYWRpbmciLCJfZ2V0V3JpdGFibGVQYWNrZXRzIiwic2hvdWxkQ2hlY2tQYXlsb2FkU2l6ZSIsInBheWxvYWRTaXplIiwiX2hhc1BpbmdFeHBpcmVkIiwiaGFzRXhwaXJlZCIsIm1zZyIsIm9wdGlvbnMiLCJjb21wcmVzcyIsImNsZWFudXBBbmRDbG9zZSIsIm9mZiIsIndhaXRGb3JVcGdyYWRlIiwidHJ5QWxsVHJhbnNwb3J0cyIsInNoaWZ0IiwiX3VwZ3JhZGVzIiwiX3Byb2JlIiwiZmFpbGVkIiwib25UcmFuc3BvcnRPcGVuIiwiY2xlYW51cCIsImZyZWV6ZVRyYW5zcG9ydCIsImVycm9yIiwib25UcmFuc3BvcnRDbG9zZSIsIm9udXBncmFkZSIsInRvIiwicmVtb3ZlTGlzdGVuZXIiLCJfZmlsdGVyVXBncmFkZXMiLCJ1cGdyYWRlcyIsImZpbHRlcmVkVXBncmFkZXMiLCJvIiwibWFwIiwiZmlsdGVyIiwiX2ZldGNoIiwicmVzIiwib2siLCJ0ZXh0IiwiaXNQb3N0IiwiSGVhZGVycyIsInNldCIsImFwcGVuZENvb2tpZXMiLCJmZXRjaCIsImJvZHkiLCJjcmVkZW50aWFscyIsImdldFNl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QjhRLEdBQUEsQ0FBSWpMLE1BQUEsRUFBUWlMLEdBQUc7TUFDM0Q7TUFDQUEsR0FBQSxDQUFJRSxJQUFBLENBQUssRUFBRWpWLElBQUEsQ0FBTThFLElBQUEsSUFBUyxLQUFLRCxNQUFBLENBQU9DLElBQUksQ0FBQztJQUMvQyxDQUFDLEVBQ0ltSSxLQUFBLENBQU8xRixHQUFBLElBQVE7TUFDaEIsS0FBS3RELE9BQUEsQ0FBUSxvQkFBb0JzRCxHQUFHO0lBQ3hDLENBQUM7RUFDTDtFQUNBUixRQUFRakMsSUFBQSxFQUFNNkIsUUFBQSxFQUFVO0lBQ3BCLEtBQUttTyxNQUFBLENBQU9oUSxJQUFJLEVBQ1g5RSxJQUFBLENBQU0rVSxHQUFBLElBQVE7TUFDZixJQUFJLENBQUNBLEdBQUEsQ0FBSUMsRUFBQSxFQUFJO1FBQ1QsT0FBTyxLQUFLL1EsT0FBQSxDQUFRLHFCQUFxQjhRLEdBQUEsQ0FBSWpMLE1BQUEsRUFBUWlMLEdBQUc7TUFDNUQ7TUFDQXBPLFFBQUEsQ0FBUztJQUNiLENBQUMsRUFDSXNHLEtBQUEsQ0FBTzFGLEdBQUEsSUFBUTtNQUNoQixLQUFLdEQsT0FBQSxDQUFRLHFCQUFxQnNELEdBQUc7SUFDekMsQ0FBQztFQUNMO0VBQ0F1TixPQUFPaFEsSUFBQSxFQUFNO0lBQ1QsSUFBSStELEVBQUE7SUFDSixNQUFNcU0sTUFBQSxHQUFTcFEsSUFBQSxLQUFTO0lBQ3hCLE1BQU02RyxPQUFBLEdBQVUsSUFBSXdKLE9BQUEsQ0FBUSxLQUFLaFUsSUFBQSxDQUFLOEgsWUFBWTtJQUNsRCxJQUFJaU0sTUFBQSxFQUFRO01BQ1J2SixPQUFBLENBQVF5SixHQUFBLENBQUksZ0JBQWdCLDBCQUEwQjtJQUMxRDtJQUNBLENBQUN2TSxFQUFBLEdBQUssS0FBSy9FLE1BQUEsQ0FBTzZOLFVBQUEsTUFBZ0IsUUFBUTlJLEVBQUEsS0FBTyxTQUFTLFNBQVNBLEVBQUEsQ0FBR3dNLGFBQUEsQ0FBYzFKLE9BQU87SUFDM0YsT0FBTzJKLEtBQUEsQ0FBTSxLQUFLdE8sR0FBQSxDQUFJLEdBQUc7TUFDckJrQixNQUFBLEVBQVFnTixNQUFBLEdBQVMsU0FBUztNQUMxQkssSUFBQSxFQUFNTCxNQUFBLEdBQVNwUSxJQUFBLEdBQU87TUFDdEI2RyxPQUFBO01BQ0E2SixXQUFBLEVBQWEsS0FBS3JVLElBQUEsQ0FBS29JLGVBQUEsR0FBa0IsWUFBWTtJQUN6RCxDQUFDLEVBQUV2SixJQUFBLENBQU0rVSxHQUFBLElBQVE7TUFDYixJQUFJcEwsR0FBQTtNQUVKLENBQUNBLEdBQUEsR0FBSyxLQUFLN0YsTUFBQSxDQUFPNk4sVUFBQSxNQUFnQixRQUFRaEksR0FBQSxLQUFPLFNBQVMsU0FBU0EsR0FBQSxDQUFHQyxZQUFBLENBQWFtTCxHQUFBLENBQUlwSixPQUFBLENBQVE4SixZQUFBLENBQWEsQ0FBQztNQUM3RyxPQUFPVixHQUFBO0lBQ1gsQ0FBQztFQUNMO0FBQ0o7OztBQ3BETyxJQUFNeFYsU0FBQSxHQUFXWixNQUFBLENBQU9XLFFBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii9jbGllbnQvb3V0In0=