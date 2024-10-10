System.register([], (_exports, _context) => {

const bimport = specifier => {
	const dependencies = new Map([["@socket.io/component-emitter","3.1.2"]]);
	return globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));
};


var dependencies = new Map();
var require = dependency => dependencies.get(dependency);
return {
setters: [],
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

// .beyond/uimport/@socket.io/component-emitter.3.1.2.js
var component_emitter_3_1_2_exports = {};
__export(component_emitter_3_1_2_exports, {
  Emitter: () => Emitter
});
module.exports = __toCommonJS(component_emitter_3_1_2_exports);

// node_modules/@socket.io/component-emitter/lib/esm/index.js
function Emitter(obj) {
  if (obj) return mixin(obj);
}
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }
  on.fn = fn;
  this.on(event, on);
  return this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks) return this;
  if (1 == arguments.length) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1),
    callbacks = this._callbacks["$" + event];
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};
};

code(module, require);
_exports(module.exports);
}}});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9Ac29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyLjMuMS4yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0Bzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXIvbGliL2VzbS9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21wb25lbnRfZW1pdHRlcl8zXzFfMl9leHBvcnRzIiwiX19leHBvcnQiLCJFbWl0dGVyIiwibW9kdWxlIiwiZXhwb3J0cyIsIl9fdG9Db21tb25KUyIsIm9iaiIsIm1peGluIiwia2V5IiwicHJvdG90eXBlIiwib24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJmbiIsIl9jYWxsYmFja3MiLCJwdXNoIiwib25jZSIsIm9mZiIsImFwcGx5IiwiYXJndW1lbnRzIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibGVuZ3RoIiwiY2FsbGJhY2tzIiwiY2IiLCJpIiwic3BsaWNlIiwiZW1pdCIsImFyZ3MiLCJBcnJheSIsInNsaWNlIiwibGVuIiwiZW1pdFJlc2VydmVkIiwibGlzdGVuZXJzIiwiaGFzTGlzdGVuZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSwrQkFBQTtBQUFBQyxRQUFBLENBQUFELCtCQUFBO0VBQUFFLE9BQUEsRUFBQUEsQ0FBQSxLQUFBQTtBQUFBO0FBQUFDLE1BQUEsQ0FBQUMsT0FBQSxHQUFBQyxZQUFBLENBQUFMLCtCQUFBOzs7QUNNTyxTQUFTRSxRQUFRSSxHQUFBLEVBQUs7RUFDM0IsSUFBSUEsR0FBQSxFQUFLLE9BQU9DLEtBQUEsQ0FBTUQsR0FBRztBQUMzQjtBQVVBLFNBQVNDLE1BQU1ELEdBQUEsRUFBSztFQUNsQixTQUFTRSxHQUFBLElBQU9OLE9BQUEsQ0FBUU8sU0FBQSxFQUFXO0lBQ2pDSCxHQUFBLENBQUlFLEdBQUEsSUFBT04sT0FB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