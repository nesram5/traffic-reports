{"code":"System.register([\"@beyond-js/kernel@0.1.9/bundle\",\"@beyond-js/kernel@0.1.9/core\",\"@beyond-js/widgets@0.1.6/render\",\"@beyond-js/kernel@0.1.9/routing\"], (_exports, _context) => {\n\nconst bimport = specifier => {\n\tconst dependencies = new Map([[\"@beyond-js/kernel\",\"0.1.9\"],[\"@beyond-js/widgets\",\"0.1.6\"]]);\n\treturn globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));\n};\n\n\nvar dependencies = new Map();\nvar require = dependency => dependencies.get(dependency);\nreturn {\nsetters: [dep => dependencies.set('@beyond-js/kernel@0.1.9/bundle', dep), dep => dependencies.set('@beyond-js/kernel@0.1.9/core', dep), dep => dependencies.set('@beyond-js/widgets@0.1.6/render', dep), dep => dependencies.set('@beyond-js/kernel@0.1.9/routing', dep)],\nexecute: function() {\n// Prevent esbuild from considering the context to be amd\nconst define = void 0;\nconst module = {};\n\nconst code = (module, require) => {\nvar __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __export = (target, all) => {\n  for (var name in all) __defProp(target, name, {\n    get: all[name],\n    enumerable: true\n  });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {\n      get: () => from[key],\n      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable\n    });\n  }\n  return to;\n};\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, \"default\", {\n  value: mod,\n  enumerable: true\n}) : target, mod));\nvar __toCommonJS = mod => __copyProps(__defProp({}, \"__esModule\", {\n  value: true\n}), mod);\n\n// .beyond/uimport/@beyond-js/widgets/routing.0.1.6.js\nvar routing_0_1_6_exports = {};\n__export(routing_0_1_6_exports, {\n  Layout: () => Layout,\n  PageInstance: () => PageInstance,\n  PageURI: () => PageURI,\n  Route: () => Route,\n  __beyond_pkg: () => __beyond_pkg,\n  hmr: () => hmr,\n  manager: () => manager\n});\nmodule.exports = __toCommonJS(routing_0_1_6_exports);\n\n// node_modules/@beyond-js/widgets/routing/routing.browser.mjs\nvar dependency_0 = __toESM(require(\"@beyond-js/kernel@0.1.9/bundle\"), 0);\nvar dependency_1 = __toESM(require(\"@beyond-js/kernel@0.1.9/core\"), 0);\nvar dependency_2 = __toESM(require(\"@beyond-js/widgets@0.1.6/render\"), 0);\nvar dependency_3 = __toESM(require(\"@beyond-js/kernel@0.1.9/routing\"), 0);\nvar import_meta = {};\nvar {\n  Bundle: __Bundle\n} = dependency_0;\nvar __pkg = new __Bundle({\n  \"module\": {\n    \"vspecifier\": \"@beyond-js/widgets@0.1.5/routing\"\n  },\n  \"type\": \"ts\"\n}, _context.meta.url).package();\n;\n__pkg.dependencies.update([[\"@beyond-js/kernel/core\", dependency_1], [\"@beyond-js/widgets/render\", dependency_2], [\"@beyond-js/kernel/routing\", dependency_3]]);\nvar ims = /* @__PURE__ */new Map();\nims.set(\"./layouts/index\", {\n  hash: 2940970575,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.default = void 0;\n    class _default extends Map {\n      register(layout) {\n        this.set(layout.id, layout);\n      }\n    }\n    exports.default = _default;\n  }\n});\nims.set(\"./layouts/layout\", {\n  hash: 2602064878,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.Layout = void 0;\n    var _core = require2(\"@beyond-js/kernel/core\");\n    class Layout2 extends _core.Events {\n      get is() {\n        return \"layout\";\n      }\n      #layouts;\n      #element;\n      get element() {\n        return this.#element;\n      }\n      get id() {\n        return this.#element;\n      }\n      #active;\n      get active() {\n        return this.#active;\n      }\n      #parent;\n      #children = /* @__PURE__ */new Map();\n      get children() {\n        return this.#children;\n      }\n      constructor(layouts, element, parent) {\n        super();\n        this.#layouts = layouts;\n        this.#element = element ? element : \"main\";\n        this.#parent = parent;\n      }\n      select(page, descending) {\n        if (descending.length && descending[0].name === this.#element) {\n          console.log(`Invalid layout configuration. Layout element \"${this.#element}\" is already created`);\n          return;\n        }\n        const child = (() => {\n          if (!descending.length) return page;\n          const {\n            name: element\n          } = descending[0];\n          const found = [...this.#children.values()].find(child2 => child2.element === element);\n          if (found) return found;\n          const layout = new Layout2(this.#layouts, element, this);\n          this.#layouts.register(layout);\n          return layout;\n        })();\n        this.#children.set(child.id, child);\n        const changed = this.#active !== child;\n        this.#active = child;\n        descending.shift();\n        child.is === \"layout\" && child.select(page, descending);\n        changed && this.trigger(\"change\");\n      }\n    }\n    exports.Layout = Layout2;\n  }\n});\nims.set(\"./manager\", {\n  hash: 1504779151,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.manager = void 0;\n    var _core = require2(\"@beyond-js/kernel/core\");\n    var _routing = require2(\"@beyond-js/kernel/routing\");\n    var _layout = require2(\"./layouts/layout\");\n    var _pages = require2(\"./pages\");\n    var _layouts = require2(\"./layouts\");\n    var _route = require2(\"./route\");\n    const manager2 = exports.manager = typeof process === \"object\" ? void 0 : new class Manager {\n      #instances = {\n        layouts: new _layouts.default(),\n        pages: new _pages.default()\n      };\n      #initialised = false;\n      get initialised() {\n        return this.#initialised;\n      }\n      #resolve;\n      #ready = new Promise(resolve => this.#resolve = resolve);\n      get ready() {\n        return this.#ready;\n      }\n      constructor() {\n        const set = () => this.set(_routing.routing.uri).catch(exc => console.log(exc.stack));\n        const {\n          specifier\n        } = globalThis.__app_package;\n        Promise.all([bimport(`${specifier}/config`), bimport(`${specifier}/start`)]).then(([{\n          default: config\n        }]) => {\n          this.#main = new _layout.Layout(this.#instances.layouts, config.layout);\n          _routing.routing.on(\"change\", set);\n          _routing.routing.initialised ? set() : _routing.routing.ready.then(set);\n        });\n      }\n      get layouts() {\n        return this.#instances.layouts;\n      }\n      get pages() {\n        return this.#instances.pages;\n      }\n      #main;\n      get main() {\n        return this.#main;\n      }\n      #ct = new _core.CancellationToken();\n      async set(uri) {\n        const cid = this.#ct.reset();\n        const route = new _route.Route(uri.pathname);\n        await route.process();\n        if (!this.#ct.check(cid)) return;\n        const done = () => {\n          !this.#initialised && this.#resolve();\n          this.#initialised = true;\n        };\n        const {\n          page: element\n        } = route;\n        if (!element) {\n          console.error(`Pathname \"${uri.pathname}\" does not have a page widget associated to it`);\n          return done();\n        }\n        const page = this.#instances.pages.register(uri, route);\n        const {\n          error,\n          value: descending\n        } = page.parents;\n        if (error) {\n          console.error(`Page on \"${uri.uri}\" cannot be shown: ${error}`);\n          return done();\n        }\n        this.#main.select(page, descending);\n        return done();\n      }\n    }();\n  }\n});\nims.set(\"./pages/index\", {\n  hash: 635174642,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.default = void 0;\n    var _instance = require2(\"./instance\");\n    class _default extends Map {\n      instance(id) {\n        return [...this.values()].find(instance => instance.id === id);\n      }\n      register(uri, route) {\n        const {\n          pathname\n        } = uri;\n        let instance = this.has(pathname) ? this.get(pathname) : void 0;\n        instance = instance ? instance : new _instance.PageInstance(uri, route);\n        this.set(pathname, instance);\n        return instance;\n      }\n    }\n    exports.default = _default;\n  }\n});\nims.set(\"./pages/instance\", {\n  hash: 2192565275,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.PageInstance = void 0;\n    var _render = require2(\"@beyond-js/widgets/render\");\n    let id = 0;\n    class PageInstance2 {\n      #uri;\n      get uri() {\n        return this.#uri;\n      }\n      #route;\n      get route() {\n        return this.#route;\n      }\n      get element() {\n        return this.#route.page;\n      }\n      get is() {\n        return \"page\";\n      }\n      #id;\n      get id() {\n        return `${this.element}:${this.#id}`;\n      }\n      get parents() {\n        const value = [];\n        let {\n          layout\n        } = _render.widgets.get(this.element);\n        while (layout) {\n          const found = [..._render.widgets.values()].find(({\n            name\n          }) => name === layout);\n          if (!found) {\n            const error = `Layout \"${layout}\" not found`;\n            return {\n              error\n            };\n          }\n          value.unshift(found);\n          layout = found.layout;\n        }\n        return {\n          value\n        };\n      }\n      constructor(uri, route) {\n        this.#uri = uri;\n        this.#route = route;\n        this.#id = ++id;\n      }\n    }\n    exports.PageInstance = PageInstance2;\n  }\n});\nims.set(\"./route\", {\n  hash: 408835594,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.Route = void 0;\n    var _render = require2(\"@beyond-js/widgets/render\");\n    var _routing = require2(\"@beyond-js/kernel/routing\");\n    class Route2 {\n      #pathname;\n      get pathname() {\n        return this.#pathname;\n      }\n      #page;\n      get page() {\n        return this.#page;\n      }\n      #vars;\n      get vars() {\n        return this.#vars;\n      }\n      constructor(pathname) {\n        this.#pathname = pathname;\n      }\n      async process() {\n        const pathname = this.#pathname.split(\"/\");\n        const registered = /* @__PURE__ */new Map();\n        _render.widgets.forEach(({\n          is,\n          name,\n          route\n        }) => is === \"page\" && registered.set(name, route.split(\"/\")));\n        const target = [...registered].filter(([, route]) => route.length === pathname.length);\n        this.#vars = /* @__PURE__ */new Map();\n        const found = target.find(([, route]) => {\n          this.#vars.clear();\n          for (let i = 0; i < pathname.length; i++) {\n            const dir = route[i];\n            if (dir.startsWith(\"${\") && dir.endsWith(\"}\")) {\n              const vname = dir.slice(2, dir.length - 1);\n              this.#vars.set(vname, pathname[i]);\n              continue;\n            }\n            if (dir !== pathname[i]) return false;\n          }\n          return true;\n        });\n        this.#page = found ? found[0] : await _routing.routing.missing?.(this.#pathname);\n      }\n    }\n    exports.Route = Route2;\n  }\n});\nims.set(\"./uri\", {\n  hash: 615392904,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.PageURI = void 0;\n    var _manager = require2(\"./manager\");\n    class PageURI2 {\n      #uri;\n      #route;\n      get uri() {\n        return this.#uri;\n      }\n      get pathname() {\n        return this.#uri.pathname;\n      }\n      get search() {\n        return this.#uri.search;\n      }\n      get qs() {\n        return this.#uri.qs;\n      }\n      get hash() {\n        return this.#uri.hash;\n      }\n      get vars() {\n        return this.#route.vars;\n      }\n      constructor({\n        widget,\n        uri,\n        route\n      }) {\n        if (widget) {\n          const child = widget.getAttribute(\"data-child-id\");\n          const page = _manager.manager.pages.instance(child);\n          if (!page) {\n            throw new Error(`Element \"${widget.localName}\" is not a page, or page not found`);\n          }\n          ({\n            uri,\n            route\n          } = page);\n        }\n        this.#uri = uri;\n        this.#route = route;\n      }\n    }\n    exports.PageURI = PageURI2;\n  }\n});\n__pkg.exports.descriptor = [{\n  \"im\": \"./layouts/layout\",\n  \"from\": \"Layout\",\n  \"name\": \"Layout\"\n}, {\n  \"im\": \"./manager\",\n  \"from\": \"manager\",\n  \"name\": \"manager\"\n}, {\n  \"im\": \"./pages/instance\",\n  \"from\": \"PageInstance\",\n  \"name\": \"PageInstance\"\n}, {\n  \"im\": \"./route\",\n  \"from\": \"Route\",\n  \"name\": \"Route\"\n}, {\n  \"im\": \"./uri\",\n  \"from\": \"PageURI\",\n  \"name\": \"PageURI\"\n}];\nvar Layout, manager, PageInstance, Route, PageURI;\n__pkg.exports.process = function ({\n  require: require2,\n  prop,\n  value\n}) {\n  (require2 || prop === \"Layout\") && (Layout = require2 ? require2(\"./layouts/layout\").Layout : value);\n  (require2 || prop === \"manager\") && (manager = require2 ? require2(\"./manager\").manager : value);\n  (require2 || prop === \"PageInstance\") && (PageInstance = require2 ? require2(\"./pages/instance\").PageInstance : value);\n  (require2 || prop === \"Route\") && (Route = require2 ? require2(\"./route\").Route : value);\n  (require2 || prop === \"PageURI\") && (PageURI = require2 ? require2(\"./uri\").PageURI : value);\n};\nvar __beyond_pkg = __pkg;\nvar hmr = new function () {\n  this.on = (event, listener) => void 0;\n  this.off = (event, listener) => void 0;\n}();\n__pkg.initialise(ims);\n};\n\ncode(module, require);\n_exports(module.exports);\n}}});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9AYmV5b25kLWpzL3dpZGdldHMvcm91dGluZy4wLjEuNi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmV5b25kLWpzL3dpZGdldHMvcm91dGluZy9fX3NvdXJjZXMvcm91dGluZy9sYXlvdXRzL2luZGV4LnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BiZXlvbmQtanMvd2lkZ2V0cy9yb3V0aW5nL19fc291cmNlcy9yb3V0aW5nL2xheW91dHMvbGF5b3V0LnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BiZXlvbmQtanMvd2lkZ2V0cy9yb3V0aW5nL19fc291cmNlcy9yb3V0aW5nL21hbmFnZXIudHMiLCIuLi9ub2RlX21vZHVsZXMvQGJleW9uZC1qcy93aWRnZXRzL3JvdXRpbmcvX19zb3VyY2VzL3JvdXRpbmcvcGFnZXMvaW5kZXgudHMiLCIuLi9ub2RlX21vZHVsZXMvQGJleW9uZC1qcy93aWRnZXRzL3JvdXRpbmcvX19zb3VyY2VzL3JvdXRpbmcvcGFnZXMvaW5zdGFuY2UudHMiLCIuLi9ub2RlX21vZHVsZXMvQGJleW9uZC1qcy93aWRnZXRzL3JvdXRpbmcvX19zb3VyY2VzL3JvdXRpbmcvcm91dGUudHMiLCIuLi9ub2RlX21vZHVsZXMvQGJleW9uZC1qcy93aWRnZXRzL3JvdXRpbmcvX19zb3VyY2VzL3JvdXRpbmcvdXJpLnRzIl0sIm5hbWVzIjpbInJvdXRpbmdfMF8xXzZfZXhwb3J0cyIsIl9fZXhwb3J0IiwiTGF5b3V0IiwiUGFnZUluc3RhbmNlIiwiUGFnZVVSSSIsIlJvdXRlIiwiX19iZXlvbmRfcGtnIiwiaG1yIiwibWFuYWdlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJfX3RvQ29tbW9uSlMiLCJfZGVmYXVsdCIsIk1hcCIsInJlZ2lzdGVyIiwibGF5b3V0Iiwic2V0IiwiaWQiLCJkZWZhdWx0IiwiX2NvcmUiLCJyZXF1aXJlMiIsIkxheW91dDIiLCJFdmVudHMiLCJpcyIsImxheW91dHMiLCJlbGVtZW50IiwiYWN0aXZlIiwicGFyZW50IiwiY2hpbGRyZW4iLCJjb25zdHJ1Y3RvciIsInNlbGVjdCIsInBhZ2UiLCJkZXNjZW5kaW5nIiwibGVuZ3RoIiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJjaGlsZCIsImZvdW5kIiwidmFsdWVzIiwiZmluZCIsImNoaWxkMiIsImNoYW5nZWQiLCJzaGlmdCIsInRyaWdnZXIiLCJfcm91dGluZyIsIl9sYXlvdXQiLCJfcGFnZXMiLCJfbGF5b3V0cyIsIl9yb3V0ZSIsIm1hbmFnZXIyIiwicHJvY2VzcyIsIk1hbmFnZXIiLCJpbnN0YW5jZXMiLCJwYWdlcyIsImluaXRpYWxpc2VkIiwicmVzb2x2ZSIsInJlYWR5IiwiUHJvbWlzZSIsInJvdXRpbmciLCJ1cmkiLCJjYXRjaCIsImV4YyIsInN0YWNrIiwic3BlY2lmaWVyIiwiZ2xvYmFsVGhpcyIsIl9fYXBwX3BhY2thZ2UiLCJhbGwiLCJiaW1wb3J0IiwidGhlbiIsImNvbmZpZyIsIm1haW4iLCJvbiIsImN0IiwiQ2FuY2VsbGF0aW9uVG9rZW4iLCJjaWQiLCJyZXNldCIsInJvdXRlIiwicGF0aG5hbWUiLCJjaGVjayIsImRvbmUiLCJlcnJvciIsInZhbHVlIiwicGFyZW50cyIsIl9pbnN0YW5jZSIsImluc3RhbmNlIiwiaGFzIiwiZ2V0IiwiX3JlbmRlciIsIlBhZ2VJbnN0YW5jZTIiLCJ3aWRnZXRzIiwidW5zaGlmdCIsIlJvdXRlMiIsInZhcnMiLCJzcGxpdCIsInJlZ2lzdGVyZWQiLCJmb3JFYWNoIiwidGFyZ2V0IiwiZmlsdGVyIiwiY2xlYXIiLCJpIiwiZGlyIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwidm5hbWUiLCJzbGljZSIsIm1pc3NpbmciLCJfbWFuYWdlciIsIlBhZ2VVUkkyIiwic2VhcmNoIiwicXMiLCJoYXNoIiwid2lkZ2V0IiwiZ2V0QXR0cmlidXRlIiwiRXJyb3IiLCJsb2NhbE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLHFCQUFBO0FBQUFDLFFBQUEsQ0FBQUQscUJBQUE7RUFBQUUsTUFBQSxFQUFBQSxDQUFBLEtBQUFBLE1BQUE7RUFBQUMsWUFBQSxFQUFBQSxDQUFBLEtBQUFBLFlBQUE7RUFBQUMsT0FBQSxFQUFBQSxDQUFBLEtBQUFBLE9BQUE7RUFBQUMsS0FBQSxFQUFBQSxDQUFBLEtBQUFBLEtBQUE7RUFBQUMsWUFBQSxFQUFBQSxDQUFBLEtBQUFBLFlBQUE7RUFBQUMsR0FBQSxFQUFBQSxDQUFBLEtBQUFBLEdBQUE7RUFBQUMsT0FBQSxFQUFBQSxDQUFBLEtBQUFBO0FBQUE7QUFBQUMsTUFBQSxDQUFBQyxPQUFBLEdBQUFDLFlBQUEsQ0FBQVgscUJBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDS2MsTUFBQVksUUFBQSxTQUFlQyxHQUFBLENBQW1CO01BQzVDQyxTQUFTQyxNQUFBLEVBQWM7UUFDbkIsS0FBS0MsR0FBQSxDQUFJRCxNQUFBLENBQU9FLEVBQUEsRUFBSUYsTUFBTTtNQUM5Qjs7SUFDSEwsT0FBQSxDQUFBUSxPQUFBLEdBQUFOLFFBQUE7Ozs7Ozs7Ozs7OztJQ1BELElBQUFPLEtBQUEsR0FBQUMsUUFBQTtJQUtpQixNQUNYQyxPQUFBLFNBQWVGLEtBQUEsQ0FBQUcsTUFBQSxDQUFNO01BQ3ZCLElBQUlDLEdBQUEsRUFBRTtRQUNGLE9BQU87TUFDWDtNQUVTLENBQUFDLE9BQUE7TUFFQSxDQUFBQyxPQUFBO01BQ1QsSUFBSUEsUUFBQSxFQUFPO1FBQ1AsT0FBTyxLQUFLLENBQUFBLE9BQUE7TUFDaEI7TUFFQSxJQUFJUixHQUFBLEVBQUU7UUFDRixPQUFPLEtBQUssQ0FBQVEsT0FBQTtNQUNoQjtNQUdBLENBQUFDLE1BQUE7TUFDQSxJQUFJQSxPQUFBLEVBQU07UUFDTixPQUFPLEtBQUssQ0FBQUEsTUFBQTtNQUNoQjtNQUdBLENBQUFDLE1BQUE7TUFHUyxDQUFBQyxRQUFBLEdBQXNDLG1CQUFJZixHQUFBLENBQUc7TUFDdEQsSUFBSWUsU0FBQSxFQUFRO1FBQ1IsT0FBTyxLQUFLLENBQUFBLFFBQUE7TUFDaEI7TUFVQUMsWUFBWUwsT0FBQSxFQUFrQkMsT0FBQSxFQUFrQkUsTUFBQSxFQUFlO1FBQzNELE1BQUs7UUFFTCxLQUFLLENBQUFILE9BQUEsR0FBV0EsT0FBQTtRQUNoQixLQUFLLENBQUFDLE9BQUEsR0FBV0EsT0FBQSxHQUFVQSxPQUFBLEdBQVU7UUFDcEMsS0FBSyxDQUFBRSxNQUFBLEdBQVVBLE1BQUE7TUFDbkI7TUFRQUcsT0FBT0MsSUFBQSxFQUFvQkMsVUFBQSxFQUEwQjtRQUNqRCxJQUFJQSxVQUFBLENBQVdDLE1BQUEsSUFBVUQsVUFBQSxDQUFXLEdBQUdFLElBQUEsS0FBUyxLQUFLLENBQUFULE9BQUEsRUFBVTtVQUMzRFUsT0FBQSxDQUFRQyxHQUFBLENBQUksaURBQWlELEtBQUssQ0FBQVgsT0FBQSxzQkFBOEI7VUFDaEc7O1FBR0osTUFBTVksS0FBQSxJQUFzQixNQUFLO1VBQzdCLElBQUksQ0FBQ0wsVUFBQSxDQUFXQyxNQUFBLEVBQVEsT0FBT0YsSUFBQTtVQUMvQixNQUFNO1lBQUNHLElBQUEsRUFBTVQ7VUFBTyxJQUFJTyxVQUFBLENBQVc7VUFFbkMsTUFBTU0sS0FBQSxHQUFnQixDQUFDLEdBQUcsS0FBSyxDQUFBVixRQUFBLENBQVVXLE1BQUEsQ0FBTSxDQUFFLEVBQUVDLElBQUEsQ0FBS0MsTUFBQSxJQUFTQSxNQUFBLENBQU1oQixPQUFBLEtBQVlBLE9BQU87VUFDMUYsSUFBSWEsS0FBQSxFQUFPLE9BQU9BLEtBQUE7VUFFbEIsTUFBTXZCLE1BQUEsR0FBUyxJQUFJTSxPQUFBLENBQU8sS0FBSyxDQUFBRyxPQUFBLEVBQVVDLE9BQUEsRUFBUyxJQUFJO1VBQ3RELEtBQUssQ0FBQUQsT0FBQSxDQUFTVixRQUFBLENBQVNDLE1BQU07VUFDN0IsT0FBT0EsTUFBQTtRQUNYLEdBQUU7UUFFRixLQUFLLENBQUFhLFFBQUEsQ0FBVVosR0FBQSxDQUFJcUIsS0FBQSxDQUFNcEIsRUFBQSxFQUFJb0IsS0FBSztRQUVsQyxNQUFNSyxPQUFBLEdBQVUsS0FBSyxDQUFBaEIsTUFBQSxLQUFZVyxLQUFBO1FBQ2pDLEtBQUssQ0FBQVgsTUFBQSxHQUFVVyxLQUFBO1FBRWZMLFVBQUEsQ0FBV1csS0FBQSxDQUFLO1FBQ2hCTixLQUFBLENBQU1kLEVBQUEsS0FBTyxZQUFhYyxLQUFBLENBQWlCUCxNQUFBLENBQU9DLElBQUEsRUFBTUMsVUFBVTtRQUNsRVUsT0FBQSxJQUFXLEtBQUtFLE9BQUEsQ0FBUSxRQUFRO01BQ3BDOztJQUNIbEMsT0FBQSxDQUFBUixNQUFBLEdBQUFtQixPQUFBOzs7Ozs7Ozs7Ozs7SUN4RkQsSUFBQUYsS0FBQSxHQUFBQyxRQUFBO0lBQ0EsSUFBQXlCLFFBQUEsR0FBQXpCLFFBQUE7SUFDQSxJQUFBMEIsT0FBQSxHQUFBMUIsUUFBQTtJQUVBLElBQUEyQixNQUFBLEdBQUEzQixRQUFBO0lBQ0EsSUFBQTRCLFFBQUEsR0FBQTVCLFFBQUE7SUFDQSxJQUFBNkIsTUFBQSxHQUFBN0IsUUFBQTtJQU1BLE1BQU04QixRQUFBLEdBQU94QyxPQUFBLENBQUFGLE9BQUEsR0FBRyxPQUFPMkMsT0FBQSxLQUFZLFdBQVcsU0FBUyxJQUFJLE1BQU1DLE9BQUEsQ0FBTztNQUUzRCxDQUFBQyxTQUFBLEdBQWE7UUFBQzdCLE9BQUEsRUFBUyxJQUFJd0IsUUFBQSxDQUFBOUIsT0FBQSxDQUFPO1FBQUlvQyxLQUFBLEVBQU8sSUFBSVAsTUFBQSxDQUFBN0IsT0FBQSxDQUFLO01BQUU7TUFFakUsQ0FBQXFDLFdBQUEsR0FBZTtNQUNmLElBQUlBLFlBQUEsRUFBVztRQUNYLE9BQU8sS0FBSyxDQUFBQSxXQUFBO01BQ2hCO01BRUEsQ0FBQUMsT0FBQTtNQUNBLENBQUFDLEtBQUEsR0FBUyxJQUFJQyxPQUFBLENBQVFGLE9BQUEsSUFBVyxLQUFLLENBQUFBLE9BQUEsR0FBV0EsT0FBTztNQUN2RCxJQUFJQyxNQUFBLEVBQUs7UUFDTCxPQUFPLEtBQUssQ0FBQUEsS0FBQTtNQUNoQjtNQUVBNUIsWUFBQTtRQUNJLE1BQU1iLEdBQUEsR0FBTUEsQ0FBQSxLQUFNLEtBQUtBLEdBQUEsQ0FBSTZCLFFBQUEsQ0FBQWMsT0FBQSxDQUFRQyxHQUFHLEVBQUVDLEtBQUEsQ0FBTUMsR0FBQSxJQUFPM0IsT0FBQSxDQUFRQyxHQUFBLENBQUkwQixHQUFBLENBQUlDLEtBQUssQ0FBQztRQUczRSxNQUFNO1VBQUNDO1FBQVMsSUFBVUMsVUFBQSxDQUFZQyxhQUFBO1FBQ3RDUixPQUFBLENBQVFTLEdBQUEsQ0FBSSxDQUNSQyxPQUFBLENBQVEsR0FBR0osU0FBQSxTQUFrQixHQUM3QkksT0FBQSxDQUFRLEdBQUdKLFNBQUEsUUFBaUIsQ0FBQyxDQUNoQyxFQUFFSyxJQUFBLENBQUssQ0FBQyxDQUFDO1VBQUNuRCxPQUFBLEVBQVNvRDtRQUFNLENBQUMsTUFBSztVQUM1QixLQUFLLENBQUFDLElBQUEsR0FBUSxJQUFJekIsT0FBQSxDQUFBNUMsTUFBQSxDQUFPLEtBQUssQ0FBQW1ELFNBQUEsQ0FBVzdCLE9BQUEsRUFBUzhDLE1BQUEsQ0FBT3ZELE1BQU07VUFFOUQ4QixRQUFBLENBQUFjLE9BQUEsQ0FBUWEsRUFBQSxDQUFHLFVBQVV4RCxHQUFHO1VBQ3hCNkIsUUFBQSxDQUFBYyxPQUFBLENBQVFKLFdBQUEsR0FBY3ZDLEdBQUEsQ0FBRyxJQUFLNkIsUUFBQSxDQUFBYyxPQUFBLENBQVFGLEtBQUEsQ0FBTVksSUFBQSxDQUFLckQsR0FBRztRQUN4RCxDQUFDO01BQ0w7TUFFQSxJQUFJUSxRQUFBLEVBQU87UUFDUCxPQUFPLEtBQUssQ0FBQTZCLFNBQUEsQ0FBVzdCLE9BQUE7TUFDM0I7TUFFQSxJQUFJOEIsTUFBQSxFQUFLO1FBQ0wsT0FBTyxLQUFLLENBQUFELFNBQUEsQ0FBV0MsS0FBQTtNQUMzQjtNQUlBLENBQUFpQixJQUFBO01BQ0EsSUFBSUEsS0FBQSxFQUFJO1FBQ0osT0FBTyxLQUFLLENBQUFBLElBQUE7TUFDaEI7TUFFQSxDQUFBRSxFQUFBLEdBQU0sSUFBSXRELEtBQUEsQ0FBQXVELGlCQUFBLENBQWlCO01BRTNCLE1BQU0xRCxJQUFJNEMsR0FBQSxFQUFRO1FBQ2QsTUFBTWUsR0FBQSxHQUFNLEtBQUssQ0FBQUYsRUFBQSxDQUFJRyxLQUFBLENBQUs7UUFFMUIsTUFBTUMsS0FBQSxHQUFRLElBQUk1QixNQUFBLENBQUE1QyxLQUFBLENBQU11RCxHQUFBLENBQUlrQixRQUFRO1FBQ3BDLE1BQU1ELEtBQUEsQ0FBTTFCLE9BQUEsQ0FBTztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFBc0IsRUFBQSxDQUFJTSxLQUFBLENBQU1KLEdBQUcsR0FBRztRQUUxQixNQUFNSyxJQUFBLEdBQU9BLENBQUEsS0FBSztVQUNkLENBQUMsS0FBSyxDQUFBekIsV0FBQSxJQUFnQixLQUFLLENBQUFDLE9BQUEsQ0FBUTtVQUNuQyxLQUFLLENBQUFELFdBQUEsR0FBZTtRQUN4QjtRQUVBLE1BQU07VUFBQ3hCLElBQUEsRUFBTU47UUFBTyxJQUFJb0QsS0FBQTtRQUN4QixJQUFJLENBQUNwRCxPQUFBLEVBQVM7VUFDVlUsT0FBQSxDQUFROEMsS0FBQSxDQUFNLGFBQWFyQixHQUFBLENBQUlrQixRQUFBLGdEQUF3RDtVQUN2RixPQUFPRSxJQUFBLENBQUk7O1FBR2YsTUFBTWpELElBQUEsR0FBcUIsS0FBSyxDQUFBc0IsU0FBQSxDQUFXQyxLQUFBLENBQU14QyxRQUFBLENBQVM4QyxHQUFBLEVBQUtpQixLQUFLO1FBR3BFLE1BQU07VUFBQ0ksS0FBQTtVQUFPQyxLQUFBLEVBQU9sRDtRQUFVLElBQUlELElBQUEsQ0FBS29ELE9BQUE7UUFDeEMsSUFBSUYsS0FBQSxFQUFPO1VBQ1A5QyxPQUFBLENBQVE4QyxLQUFBLENBQU0sWUFBWXJCLEdBQUEsQ0FBSUEsR0FBQSxzQkFBeUJxQixLQUFBLEVBQU87VUFDOUQsT0FBT0QsSUFBQSxDQUFJOztRQUdmLEtBQUssQ0FBQVQsSUFBQSxDQUFNekMsTUFBQSxDQUFPQyxJQUFBLEVBQU1DLFVBQVU7UUFDbEMsT0FBT2dELElBQUEsQ0FBSTtNQUNmO01BQ0g7Ozs7Ozs7Ozs7OztJQzFGRCxJQUFBSSxTQUFBLEdBQUFoRSxRQUFBO0lBTWMsTUFBQVIsUUFBQSxTQUFlQyxHQUFBLENBQTJCO01BQ3BEd0UsU0FBU3BFLEVBQUEsRUFBVTtRQUNmLE9BQU8sQ0FBQyxHQUFHLEtBQUtzQixNQUFBLENBQU0sQ0FBRSxFQUFFQyxJQUFBLENBQUs2QyxRQUFBLElBQVlBLFFBQUEsQ0FBU3BFLEVBQUEsS0FBT0EsRUFBRTtNQUNqRTtNQUVBSCxTQUFTOEMsR0FBQSxFQUFVaUIsS0FBQSxFQUFZO1FBQzNCLE1BQU07VUFBQ0M7UUFBUSxJQUFJbEIsR0FBQTtRQUVuQixJQUFJeUIsUUFBQSxHQUF5QixLQUFLQyxHQUFBLENBQUlSLFFBQVEsSUFBSSxLQUFLUyxHQUFBLENBQUlULFFBQVEsSUFBSTtRQUN2RU8sUUFBQSxHQUFXQSxRQUFBLEdBQVdBLFFBQUEsR0FBVyxJQUFJRCxTQUFBLENBQUFqRixZQUFBLENBQWF5RCxHQUFBLEVBQUtpQixLQUFLO1FBQzVELEtBQUs3RCxHQUFBLENBQUk4RCxRQUFBLEVBQVVPLFFBQVE7UUFFM0IsT0FBT0EsUUFBQTtNQUNYOztJQUNIM0UsT0FBQSxDQUFBUSxPQUFBLEdBQUFOLFFBQUE7Ozs7Ozs7Ozs7OztJQ2xCRCxJQUFBNEUsT0FBQSxHQUFBcEUsUUFBQTtJQU9BLElBQUlILEVBQUEsR0FBSztJQUVRLE1BQ1h3RSxhQUFBLENBQVk7TUFDTCxDQUFBN0IsR0FBQTtNQUNULElBQUlBLElBQUEsRUFBRztRQUNILE9BQU8sS0FBSyxDQUFBQSxHQUFBO01BQ2hCO01BRVMsQ0FBQWlCLEtBQUE7TUFDVCxJQUFJQSxNQUFBLEVBQUs7UUFDTCxPQUFPLEtBQUssQ0FBQUEsS0FBQTtNQUNoQjtNQUVBLElBQUlwRCxRQUFBLEVBQU87UUFDUCxPQUFPLEtBQUssQ0FBQW9ELEtBQUEsQ0FBTzlDLElBQUE7TUFDdkI7TUFFQSxJQUFJUixHQUFBLEVBQUU7UUFDRixPQUFPO01BQ1g7TUFFUyxDQUFBTixFQUFBO01BQ1QsSUFBSUEsR0FBQSxFQUFFO1FBQ0YsT0FBTyxHQUFHLEtBQUtRLE9BQUEsSUFBVyxLQUFLLENBQUFSLEVBQUE7TUFDbkM7TUFPQSxJQUFJa0UsUUFBQSxFQUFPO1FBRVAsTUFBTUQsS0FBQSxHQUF3QjtRQUM5QixJQUFJO1VBQUNuRTtRQUFNLElBQUl5RSxPQUFBLENBQUFFLE9BQUEsQ0FBUUgsR0FBQSxDQUFJLEtBQUs5RCxPQUFPO1FBQ3ZDLE9BQU9WLE1BQUEsRUFBUTtVQUNYLE1BQU11QixLQUFBLEdBQVEsQ0FBQyxHQUFHa0QsT0FBQSxDQUFBRSxPQUFBLENBQVFuRCxNQUFBLENBQU0sQ0FBRSxFQUFFQyxJQUFBLENBQUssQ0FBQztZQUFDTjtVQUFJLE1BQU1BLElBQUEsS0FBU25CLE1BQU07VUFDcEUsSUFBSSxDQUFDdUIsS0FBQSxFQUFPO1lBQ1IsTUFBTTJDLEtBQUEsR0FBUSxXQUFXbEUsTUFBQTtZQUN6QixPQUFPO2NBQUNrRTtZQUFLOztVQUdqQkMsS0FBQSxDQUFNUyxPQUFBLENBQVFyRCxLQUFLO1VBQ25CdkIsTUFBQSxHQUFTdUIsS0FBQSxDQUFNdkIsTUFBQTs7UUFHbkIsT0FBTztVQUFDbUU7UUFBSztNQUNqQjtNQUVBckQsWUFBWStCLEdBQUEsRUFBVWlCLEtBQUEsRUFBWTtRQUM5QixLQUFLLENBQUFqQixHQUFBLEdBQU9BLEdBQUE7UUFDWixLQUFLLENBQUFpQixLQUFBLEdBQVNBLEtBQUE7UUFDZCxLQUFLLENBQUE1RCxFQUFBLEdBQU0sRUFBRUEsRUFBQTtNQUNqQjs7SUFDSFAsT0FBQSxDQUFBUCxZQUFBLEdBQUFzRixhQUFBOzs7Ozs7Ozs7Ozs7SUNoRUQsSUFBQUQsT0FBQSxHQUFBcEUsUUFBQTtJQUNBLElBQUF5QixRQUFBLEdBQUF6QixRQUFBO0lBRWlCLE1BQ1h3RSxNQUFBLENBQUs7TUFDRSxDQUFBZCxRQUFBO01BQ1QsSUFBSUEsU0FBQSxFQUFRO1FBQ1IsT0FBTyxLQUFLLENBQUFBLFFBQUE7TUFDaEI7TUFFQSxDQUFBL0MsSUFBQTtNQUNBLElBQUlBLEtBQUEsRUFBSTtRQUNKLE9BQU8sS0FBSyxDQUFBQSxJQUFBO01BQ2hCO01BRUEsQ0FBQThELElBQUE7TUFDQSxJQUFJQSxLQUFBLEVBQUk7UUFDSixPQUFPLEtBQUssQ0FBQUEsSUFBQTtNQUNoQjtNQUVBaEUsWUFBWWlELFFBQUEsRUFBZ0I7UUFDeEIsS0FBSyxDQUFBQSxRQUFBLEdBQVlBLFFBQUE7TUFDckI7TUFFQSxNQUFNM0IsUUFBQSxFQUFPO1FBQ1QsTUFBTTJCLFFBQUEsR0FBVyxLQUFLLENBQUFBLFFBQUEsQ0FBVWdCLEtBQUEsQ0FBTSxHQUFHO1FBSXpDLE1BQU1DLFVBQUEsR0FBb0MsbUJBQUlsRixHQUFBLENBQUc7UUFDakQyRSxPQUFBLENBQUFFLE9BQUEsQ0FBUU0sT0FBQSxDQUFRLENBQUM7VUFBQ3pFLEVBQUE7VUFBSVcsSUFBQTtVQUFNMkM7UUFBSyxNQUFNdEQsRUFBQSxLQUFPLFVBQVV3RSxVQUFBLENBQVcvRSxHQUFBLENBQUlrQixJQUFBLEVBQU0yQyxLQUFBLENBQU1pQixLQUFBLENBQU0sR0FBRyxDQUFDLENBQUM7UUFHOUYsTUFBTUcsTUFBQSxHQUFTLENBQUMsR0FBR0YsVUFBVSxFQUFFRyxNQUFBLENBQU8sQ0FBQyxHQUFHckIsS0FBSyxNQUFNQSxLQUFBLENBQU01QyxNQUFBLEtBQVc2QyxRQUFBLENBQVM3QyxNQUFNO1FBRXJGLEtBQUssQ0FBQTRELElBQUEsR0FBUSxtQkFBSWhGLEdBQUEsQ0FBRztRQUNwQixNQUFNeUIsS0FBQSxHQUFRMkQsTUFBQSxDQUFPekQsSUFBQSxDQUFLLENBQUMsR0FBR3FDLEtBQUssTUFBSztVQUNwQyxLQUFLLENBQUFnQixJQUFBLENBQU1NLEtBQUEsQ0FBSztVQUNoQixTQUFTQyxDQUFBLEdBQUksR0FBR0EsQ0FBQSxHQUFJdEIsUUFBQSxDQUFTN0MsTUFBQSxFQUFRbUUsQ0FBQSxJQUFLO1lBQ3RDLE1BQU1DLEdBQUEsR0FBTXhCLEtBQUEsQ0FBTXVCLENBQUE7WUFHbEIsSUFBSUMsR0FBQSxDQUFJQyxVQUFBLENBQVcsSUFBSSxLQUFLRCxHQUFBLENBQUlFLFFBQUEsQ0FBUyxHQUFHLEdBQUc7Y0FDM0MsTUFBTUMsS0FBQSxHQUFRSCxHQUFBLENBQUlJLEtBQUEsQ0FBTSxHQUFHSixHQUFBLENBQUlwRSxNQUFBLEdBQVMsQ0FBQztjQUN6QyxLQUFLLENBQUE0RCxJQUFBLENBQU03RSxHQUFBLENBQUl3RixLQUFBLEVBQU8xQixRQUFBLENBQVNzQixDQUFBLENBQUU7Y0FDakM7O1lBR0osSUFBSUMsR0FBQSxLQUFRdkIsUUFBQSxDQUFTc0IsQ0FBQSxHQUFJLE9BQU87O1VBRXBDLE9BQU87UUFDWCxDQUFDO1FBRUQsS0FBSyxDQUFBckUsSUFBQSxHQUFRTyxLQUFBLEdBQVFBLEtBQUEsQ0FBTSxLQUFLLE1BQU1PLFFBQUEsQ0FBQWMsT0FBQSxDQUFRK0MsT0FBQSxHQUFVLEtBQUssQ0FBQTVCLFFBQVM7TUFDMUU7O0lBQ0hwRSxPQUFBLENBQUFMLEtBQUEsR0FBQXVGLE1BQUE7Ozs7Ozs7Ozs7OztJQ3BERCxJQUFBZSxRQUFBLEdBQUF2RixRQUFBO0lBRWlCLE1BQ1h3RixRQUFBLENBQU87TUFDQSxDQUFBaEQsR0FBQTtNQUNBLENBQUFpQixLQUFBO01BRVQsSUFBSWpCLElBQUEsRUFBRztRQUNILE9BQU8sS0FBSyxDQUFBQSxHQUFBO01BQ2hCO01BRUEsSUFBSWtCLFNBQUEsRUFBUTtRQUNSLE9BQU8sS0FBSyxDQUFBbEIsR0FBQSxDQUFLa0IsUUFBQTtNQUNyQjtNQUVBLElBQUkrQixPQUFBLEVBQU07UUFDTixPQUFPLEtBQUssQ0FBQWpELEdBQUEsQ0FBS2lELE1BQUE7TUFDckI7TUFFQSxJQUFJQyxHQUFBLEVBQUU7UUFDRixPQUFPLEtBQUssQ0FBQWxELEdBQUEsQ0FBS2tELEVBQUE7TUFDckI7TUFFQSxJQUFJQyxLQUFBLEVBQUk7UUFDSixPQUFPLEtBQUssQ0FBQW5ELEdBQUEsQ0FBS21ELElBQUE7TUFDckI7TUFFQSxJQUFJbEIsS0FBQSxFQUFJO1FBQ0osT0FBTyxLQUFLLENBQUFoQixLQUFBLENBQU9nQixJQUFBO01BQ3ZCO01BRUFoRSxZQUFZO1FBQUNtRixNQUFBO1FBQVFwRCxHQUFBO1FBQUtpQjtNQUFLLEdBQXNEO1FBQ2pGLElBQUltQyxNQUFBLEVBQVE7VUFDUixNQUFNM0UsS0FBQSxHQUFRMkUsTUFBQSxDQUFPQyxZQUFBLENBQWEsZUFBZTtVQUNqRCxNQUFNbEYsSUFBQSxHQUFPNEUsUUFBQSxDQUFBbkcsT0FBQSxDQUFROEMsS0FBQSxDQUFNK0IsUUFBQSxDQUFTaEQsS0FBSztVQUN6QyxJQUFJLENBQUNOLElBQUEsRUFBTTtZQUNQLE1BQU0sSUFBSW1GLEtBQUEsQ0FBTSxZQUFZRixNQUFBLENBQU9HLFNBQUEsb0NBQTZDOztVQUdwRixDQUFDO1lBQUN2RCxHQUFBO1lBQUtpQjtVQUFLLElBQUk5QyxJQUFBOztRQUdwQixLQUFLLENBQUE2QixHQUFBLEdBQU9BLEdBQUE7UUFDWixLQUFLLENBQUFpQixLQUFBLEdBQVNBLEtBQUE7TUFDbEI7O0lBQ0huRSxPQUFBLENBQUFOLE9BQUEsR0FBQXdHLFFBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii9jbGllbnQvb3V0In0=","dependencies":[{"id":"@beyond-js/kernel@0.1.9/bundle","path":"D:\\Test\\client\\node_modules\\@beyond-js\\kernel"},{"id":"@beyond-js/kernel@0.1.9/core","path":"D:\\Test\\client\\node_modules\\@beyond-js\\kernel"},{"id":"@beyond-js/widgets@0.1.6/render","path":"D:\\Test\\client\\node_modules\\@beyond-js\\widgets"},{"id":"@beyond-js/kernel@0.1.9/routing","path":"D:\\Test\\client\\node_modules\\@beyond-js\\kernel"}],"warnings":[]}