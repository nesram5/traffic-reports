System.register(["@beyond-js/kernel@0.1.9/bundle","react@18.3.1","scheduler@0.23.2","react-dom@18.3.1","react-dom@18.3.1/client","@beyond-js/kernel@0.1.9/core","@beyond-js/widgets@0.1.6/render","@beyond-js/kernel@0.1.9/styles","@beyond-js/widgets@0.1.6/controller","@beyond-js/react-18-widgets@1.0.4/base","@beyond-js/kernel@0.1.9/routing","@beyond-js/widgets@0.1.6/routing"], (_exports, _context) => {

const bimport = specifier => {
	const dependencies = new Map([["@beyond-js/kernel","0.1.9"],["react","18.3.1"],["scheduler","0.23.2"],["react-dom","18.3.1"],["@beyond-js/widgets","0.1.6"],["@beyond-js/react-18-widgets","1.0.4"]]);
	return globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));
};


var dependencies = new Map();
var require = dependency => dependencies.get(dependency);
return {
setters: [dep => dependencies.set('@beyond-js/kernel@0.1.9/bundle', dep), dep => dependencies.set('react@18.3.1', dep), dep => dependencies.set('scheduler@0.23.2', dep), dep => dependencies.set('react-dom@18.3.1', dep), dep => dependencies.set('react-dom@18.3.1/client', dep), dep => dependencies.set('@beyond-js/kernel@0.1.9/core', dep), dep => dependencies.set('@beyond-js/widgets@0.1.6/render', dep), dep => dependencies.set('@beyond-js/kernel@0.1.9/styles', dep), dep => dependencies.set('@beyond-js/widgets@0.1.6/controller', dep), dep => dependencies.set('@beyond-js/react-18-widgets@1.0.4/base', dep), dep => dependencies.set('@beyond-js/kernel@0.1.9/routing', dep), dep => dependencies.set('@beyond-js/widgets@0.1.6/routing', dep)],
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

// .beyond/uimport/@beyond-js/react-18-widgets/page.1.0.4.js
var page_1_0_4_exports = {};
__export(page_1_0_4_exports, {
  PageReactWidgetController: () => PageReactWidgetController,
  __beyond_pkg: () => __beyond_pkg,
  hmr: () => hmr
});
module.exports = __toCommonJS(page_1_0_4_exports);

// node_modules/@beyond-js/react-18-widgets/page/page.browser.mjs
var dependency_0 = __toESM(require("@beyond-js/kernel@0.1.9/bundle"), 0);
var dependency_1 = __toESM(require("@beyond-js/react-18-widgets@1.0.4/base"), 0);
var dependency_2 = __toESM(require("@beyond-js/widgets@0.1.6/routing"), 0);
var import_meta = {};
var {
  Bundle: __Bundle
} = dependency_0;
var __pkg = new __Bundle({
  "module": {
    "vspecifier": "@beyond-js/react-18-widgets@1.0.4/page"
  },
  "type": "ts"
}, _context.meta.url).package();
;
__pkg.dependencies.update([["@beyond-js/react-18-widgets/base", dependency_1], ["@beyond-js/widgets/routing", dependency_2]]);
var ims = /* @__PURE__ */new Map();
ims.set("./page", {
  hash: 3741393941,
  creator: function (require2, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PageReactWidgetController = void 0;
    var _base = require2("@beyond-js/react-18-widgets/base");
    var _routing = require2("@beyond-js/widgets/routing");
    class PageReactWidgetController2 extends _base.ReactWidgetController {
      #uri;
      get uri() {
        return this.#uri;
      }
      mount() {
        return super.mount({
          uri: this.#uri
        });
      }
      async initialise() {
        this.#uri = new _routing.PageURI({
          widget: this.widget
        });
        await super.initialise();
      }
    }
    exports.PageReactWidgetController = PageReactWidgetController2;
  }
});
__pkg.exports.descriptor = [{
  "im": "./page",
  "from": "PageReactWidgetController",
  "name": "PageReactWidgetController"
}];
var PageReactWidgetController;
__pkg.exports.process = function ({
  require: require2,
  prop,
  value
}) {
  (require2 || prop === "PageReactWidgetController") && (PageReactWidgetController = require2 ? require2("./page").PageReactWidgetController : value);
};
var __beyond_pkg = __pkg;
var hmr = new function () {
  this.on = (event, listener) => void 0;
  this.off = (event, listener) => void 0;
}();
__pkg.initialise(ims);
};

code(module, require);
_exports(module.exports);
}}});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9AYmV5b25kLWpzL3JlYWN0LTE4LXdpZGdldHMvcGFnZS4xLjAuNC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmV5b25kLWpzL3JlYWN0LTE4LXdpZGdldHMvcGFnZS9fX3NvdXJjZXMvcGFnZS9wYWdlLnRzIl0sIm5hbWVzIjpbInBhZ2VfMV8wXzRfZXhwb3J0cyIsIl9fZXhwb3J0IiwiUGFnZVJlYWN0V2lkZ2V0Q29udHJvbGxlciIsIl9fYmV5b25kX3BrZyIsImhtciIsIm1vZHVsZSIsImV4cG9ydHMiLCJfX3RvQ29tbW9uSlMiLCJfYmFzZSIsInJlcXVpcmUyIiwiX3JvdXRpbmciLCJQYWdlUmVhY3RXaWRnZXRDb250cm9sbGVyMiIsIlJlYWN0V2lkZ2V0Q29udHJvbGxlciIsInVyaSIsIm1vdW50IiwiaW5pdGlhbGlzZSIsIlBhZ2VVUkkiLCJ3aWRnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGtCQUFBO0FBQUFDLFFBQUEsQ0FBQUQsa0JBQUE7RUFBQUUseUJBQUEsRUFBQUEsQ0FBQSxLQUFBQSx5QkFBQTtFQUFBQyxZQUFBLEVBQUFBLENBQUEsS0FBQUEsWUFBQTtFQUFBQyxHQUFBLEVBQUFBLENBQUEsS0FBQUE7QUFBQTtBQUFBQyxNQUFBLENBQUFDLE9BQUEsR0FBQUMsWUFBQSxDQUFBUCxrQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBLElBQUFRLEtBQUEsR0FBQUMsUUFBQTtJQUNBLElBQUFDLFFBQUEsR0FBQUQsUUFBQTtJQUVpQixNQUNGRSwwQkFBQSxTQUFrQ0gsS0FBQSxDQUFBSSxxQkFBQSxDQUFxQjtNQUNyRSxDQUFBQyxHQUFBO01BQ0EsSUFBSUEsSUFBQSxFQUFHO1FBQ04sT0FBTyxLQUFLLENBQUFBLEdBQUE7TUFDYjtNQUVBQyxNQUFBLEVBQUs7UUFDSixPQUFPLE1BQU1BLEtBQUEsQ0FBTTtVQUFFRCxHQUFBLEVBQUssS0FBSyxDQUFBQTtRQUFJLENBQUU7TUFDdEM7TUFFQSxNQUFNRSxXQUFBLEVBQVU7UUFDZixLQUFLLENBQUFGLEdBQUEsR0FBTyxJQUFJSCxRQUFBLENBQUFNLE9BQUEsQ0FBUTtVQUFFQyxNQUFBLEVBQWEsS0FBS0E7UUFBTSxDQUFFO1FBQ3BELE1BQU0sTUFBTUYsVUFBQSxDQUFVO01BQ3ZCOztJQUNBVCxPQUFBLENBQUFKLHlCQUFBLEdBQUFTLDBCQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvY2xpZW50L291dCJ9