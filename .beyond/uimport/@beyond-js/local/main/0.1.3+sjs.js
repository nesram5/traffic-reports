{"code":"System.register([\"@beyond-js/kernel@0.1.9/bundle\",\"@beyond-js/kernel@0.1.9/core\",\"@beyond-js/backend@0.1.9/client\",\"engine.io-parser@5.2.3\",\"@socket.io/component-emitter@3.1.2\",\"engine.io-client@6.6.1\",\"socket.io-parser@4.2.4\",\"socket.io-client@4.8.0\"], (_exports, _context) => {\n\nconst bimport = specifier => {\n\tconst dependencies = new Map([[\"@beyond-js/kernel\",\"0.1.9\"],[\"@beyond-js/backend\",\"0.1.9\"],[\"engine.io-parser\",\"5.2.3\"],[\"@socket.io/component-emitter\",\"3.1.2\"],[\"engine.io-client\",\"6.6.1\"],[\"socket.io-client\",\"4.8.0\"],[\"socket.io-parser\",\"4.2.4\"],[\"@beyond-js/local\",\"0.1.3\"]]);\n\treturn globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));\n};\n\n\nvar dependencies = new Map();\nvar require = dependency => dependencies.get(dependency);\nreturn {\nsetters: [dep => dependencies.set('@beyond-js/kernel@0.1.9/bundle', dep), dep => dependencies.set('@beyond-js/kernel@0.1.9/core', dep), dep => dependencies.set('@beyond-js/backend@0.1.9/client', dep), dep => dependencies.set('engine.io-parser@5.2.3', dep), dep => dependencies.set('@socket.io/component-emitter@3.1.2', dep), dep => dependencies.set('engine.io-client@6.6.1', dep), dep => dependencies.set('socket.io-parser@4.2.4', dep), dep => dependencies.set('socket.io-client@4.8.0', dep)],\nexecute: function() {\n// Prevent esbuild from considering the context to be amd\nconst define = void 0;\nconst module = {};\n\nconst code = (module, require) => {\nvar __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __export = (target, all) => {\n  for (var name in all) __defProp(target, name, {\n    get: all[name],\n    enumerable: true\n  });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {\n      get: () => from[key],\n      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable\n    });\n  }\n  return to;\n};\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, \"default\", {\n  value: mod,\n  enumerable: true\n}) : target, mod));\nvar __toCommonJS = mod => __copyProps(__defProp({}, \"__esModule\", {\n  value: true\n}), mod);\n\n// .beyond/uimport/@beyond-js/local/main.0.1.3.js\nvar main_0_1_3_exports = {};\n__export(main_0_1_3_exports, {\n  __beyond_pkg: () => __beyond_pkg,\n  hmr: () => hmr,\n  local: () => local\n});\nmodule.exports = __toCommonJS(main_0_1_3_exports);\n\n// node_modules/@beyond-js/local/main/main.browser.mjs\nvar dependency_0 = __toESM(require(\"@beyond-js/kernel@0.1.9/bundle\"), 0);\nvar dependency_1 = __toESM(require(\"@beyond-js/backend@0.1.9/client\"), 0);\nvar dependency_2 = __toESM(require(\"@beyond-js/kernel@0.1.9/core\"), 0);\nvar dependency_3 = __toESM(require(\"socket.io-client@4.8.0\"), 0);\nvar import_meta = {};\nvar {\n  Bundle: __Bundle\n} = dependency_0;\nvar __pkg = new __Bundle({\n  \"module\": {\n    \"vspecifier\": \"@beyond-js/local@0.1.3/main\"\n  },\n  \"type\": \"ts\"\n}, _context.meta.url).package();\n;\n__pkg.dependencies.update([[\"@beyond-js/backend/client\", dependency_1], [\"@beyond-js/kernel/core\", dependency_2], [\"socket.io-client\", dependency_3]]);\nvar ims = /* @__PURE__ */new Map();\nims.set(\"./application/index\", {\n  hash: 2751618994,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.default = void 0;\n    var _client = require2(\"@beyond-js/backend/client\");\n    var _core = require2(\"@beyond-js/kernel/core\");\n    class _default extends _core.Events {\n      #update = is => {\n        const resource = is === \"application\" ? \"styles\" : \"global\";\n        document.getElementById(`beyond-${is}-styles`).setAttribute(\"href\", `/${resource}.css?updated=${Date.now()}`);\n        if (is === \"global\") {\n          const {\n            instances\n          } = brequire(\"@beyond-js/kernel/bundle\");\n          if (instances.has(\"@beyond-js/widgets/render\")) {\n            const {\n              globalcss\n            } = instances.get(\"@beyond-js/widgets/render\").package().exports.values;\n            globalcss.update();\n          }\n        }\n        this.trigger(`${is}:change`);\n      };\n      #subscribe = async () => {\n        const backend = await _client.backends.get(\"@beyond-js/local\");\n        const socket = await backend.socket;\n        socket.on(\"application-styles\", () => this.#update(\"application\"));\n        socket.on(\"global-styles\", () => this.#update(\"global\"));\n      };\n      constructor() {\n        super();\n        if (typeof globalThis.process !== \"undefined\") return;\n        this.#subscribe().catch(exc => console.error(exc.stack));\n      }\n    }\n    exports.default = _default;\n  }\n});\nims.set(\"./hmr/index\", {\n  hash: 520602716,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.default = void 0;\n    var _bundle = require2(\"@beyond-js/kernel/bundle\");\n    var _client = require2(\"@beyond-js/backend/client\");\n    class _default {\n      #devServer;\n      #changes = /* @__PURE__ */new Map();\n      async #js(vspecifier, language) {\n        if (!_bundle.instances.has(vspecifier)) return;\n        const pkg = _bundle.instances.get(vspecifier).package(language !== \".\" ? language : \"\");\n        const change = (() => {\n          !this.#changes.has(vspecifier) && this.#changes.set(vspecifier, 0);\n          const change2 = this.#changes.get(vspecifier);\n          this.#changes.set(vspecifier, change2 + 1);\n          return change2;\n        })();\n        try {\n          const resource = (() => {\n            if (!this.#devServer) return `${pkg.vspecifier}?hmr=${change}`;\n            const split = vspecifier.split(\"/\");\n            split[0].startsWith(\"@\") && split.shift();\n            split.shift();\n            const subpath = split.join(\"/\");\n            return `http://localhost:${this.#devServer}/${subpath}.js?hmr=${change}`;\n          })();\n          await bimport(resource, change);\n        } catch (exc) {\n          console.log(`Error loading hmr of bundle \"${pkg.bundle.id}\"`, exc.stack);\n        }\n      }\n      async #css(vspecifier) {\n        if (typeof location !== \"object\") return;\n        const {\n          styles\n        } = await bimport(\"@beyond-js/kernel/styles\");\n        if (!styles.has(vspecifier)) return;\n        styles.get(vspecifier).change();\n      }\n      async #onchange({\n        vspecifier,\n        language,\n        extname\n      }) {\n        if (extname === \".js\") return await this.#js(vspecifier, language);\n        if (extname === \".css\") return await this.#css(vspecifier);\n      }\n      #subscribe = async () => {\n        const backend = await _client.backends.get(\"@beyond-js/local\");\n        const socket = await backend.socket;\n        socket.on(\"bundle/change\", message => this.#onchange(message).catch(exc => console.log(exc.stack)));\n      };\n      constructor(devServer) {\n        this.#devServer = devServer;\n        this.#subscribe().catch(exc => console.error(exc.stack));\n      }\n    }\n    exports.default = _default;\n  }\n});\nims.set(\"./launchers/index\", {\n  hash: 1827458998,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.default = void 0;\n    var _launcher = require2(\"./launcher\");\n    class _default {\n      #launchers = /* @__PURE__ */new Map();\n      get(id) {\n        if (this.#launchers.has(id)) return this.#launchers.get(id);\n        const launcher = new _launcher.default(id);\n        this.#launchers.set(id, launcher);\n        return launcher;\n      }\n    }\n    exports.default = _default;\n  }\n});\nims.set(\"./launchers/launcher\", {\n  hash: 686597120,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.default = void 0;\n    var _beyond_context = require2(\"beyond_context\");\n    var _core = require2(\"@beyond-js/kernel/core\");\n    class _default extends _core.Events {\n      #id;\n      constructor(id) {\n        super();\n        this.#id = id;\n      }\n      #status = async () => {\n        return await _beyond_context.module.execute(\"launchers/status\", {\n          id: this.#id\n        });\n      };\n      get status() {\n        return this.#status();\n      }\n      async start() {\n        await _beyond_context.module.execute(\"launchers/start\", {\n          id: this.#id\n        });\n      }\n      async stop() {\n        await _beyond_context.module.execute(\"launchers/stop\", {\n          id: this.#id\n        });\n      }\n    }\n    exports.default = _default;\n  }\n});\nims.set(\"./local\", {\n  hash: 1978769925,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.local = void 0;\n    var _hmr = require2(\"./hmr\");\n    var _application = require2(\"./application\");\n    var _launchers = require2(\"./launchers\");\n    var _client = require2(\"@beyond-js/backend/client\");\n    const local2 = new class BeyondLocal {\n      #launchers;\n      get launchers() {\n        return this.#launchers;\n      }\n      #application;\n      get application() {\n        return this.#application;\n      }\n      #hmr;\n      get hmr() {\n        return this.#hmr;\n      }\n      #registered;\n      register(inspect, devServer) {\n        if (this.#registered) throw new Error(\"@beyond-js/local .register method call should be called only once\");\n        this.#registered = true;\n        _client.backends.register(\"@beyond-js/local\", `http://localhost:${inspect}`);\n        this.#launchers = new _launchers.default();\n        this.#hmr = new _hmr.default(devServer);\n        this.#application = new _application.default();\n      }\n    }();\n    exports.local = local2;\n  }\n});\n__pkg.exports.descriptor = [{\n  \"im\": \"./local\",\n  \"from\": \"local\",\n  \"name\": \"local\"\n}];\nvar local;\n__pkg.exports.process = function ({\n  require: require2,\n  prop,\n  value\n}) {\n  (require2 || prop === \"local\") && (local = require2 ? require2(\"./local\").local : value);\n};\nvar __beyond_pkg = __pkg;\nvar hmr = new function () {\n  this.on = (event, listener) => void 0;\n  this.off = (event, listener) => void 0;\n}();\n__pkg.initialise(ims);\n};\n\ncode(module, require);\n_exports(module.exports);\n}}});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9AYmV5b25kLWpzL2xvY2FsL21haW4uMC4xLjMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJleW9uZC1qcy9sb2NhbC9tYWluL19fc291cmNlcy9tYWluL2FwcGxpY2F0aW9uL2luZGV4LnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BiZXlvbmQtanMvbG9jYWwvbWFpbi9fX3NvdXJjZXMvbWFpbi9obXIvaW5kZXgudHMiLCIuLi9ub2RlX21vZHVsZXMvQGJleW9uZC1qcy9sb2NhbC9tYWluL19fc291cmNlcy9tYWluL2xhdW5jaGVycy9pbmRleC50cyIsIi4uL25vZGVfbW9kdWxlcy9AYmV5b25kLWpzL2xvY2FsL21haW4vX19zb3VyY2VzL21haW4vbGF1bmNoZXJzL2xhdW5jaGVyLnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BiZXlvbmQtanMvbG9jYWwvbWFpbi9fX3NvdXJjZXMvbWFpbi9sb2NhbC50cyJdLCJuYW1lcyI6WyJtYWluXzBfMV8zX2V4cG9ydHMiLCJfX2V4cG9ydCIsIl9fYmV5b25kX3BrZyIsImhtciIsImxvY2FsIiwibW9kdWxlIiwiZXhwb3J0cyIsIl9fdG9Db21tb25KUyIsIl9jbGllbnQiLCJyZXF1aXJlMiIsIl9jb3JlIiwiX2RlZmF1bHQiLCJFdmVudHMiLCJ1cGRhdGUiLCJpcyIsInJlc291cmNlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNldEF0dHJpYnV0ZSIsIkRhdGUiLCJub3ciLCJpbnN0YW5jZXMiLCJicmVxdWlyZSIsImhhcyIsImdsb2JhbGNzcyIsImdldCIsInBhY2thZ2UiLCJ2YWx1ZXMiLCJ0cmlnZ2VyIiwic3Vic2NyaWJlIiwiI3N1YnNjcmliZSIsImJhY2tlbmQiLCJiYWNrZW5kcyIsInNvY2tldCIsIm9uIiwiY29uc3RydWN0b3IiLCJnbG9iYWxUaGlzIiwicHJvY2VzcyIsImNhdGNoIiwiZXhjIiwiY29uc29sZSIsImVycm9yIiwic3RhY2siLCJkZWZhdWx0IiwiX2J1bmRsZSIsImRldlNlcnZlciIsImNoYW5nZXMiLCJNYXAiLCJqcyIsIiNqcyIsInZzcGVjaWZpZXIiLCJsYW5ndWFnZSIsInBrZyIsImNoYW5nZSIsInNldCIsImNoYW5nZTIiLCJzcGxpdCIsInN0YXJ0c1dpdGgiLCJzaGlmdCIsInN1YnBhdGgiLCJqb2luIiwiYmltcG9ydCIsImxvZyIsImJ1bmRsZSIsImlkIiwiY3NzIiwiI2NzcyIsImxvY2F0aW9uIiwic3R5bGVzIiwib25jaGFuZ2UiLCIjb25jaGFuZ2UiLCJleHRuYW1lIiwibWVzc2FnZSIsIl9sYXVuY2hlciIsImxhdW5jaGVycyIsImxhdW5jaGVyIiwiX2JleW9uZF9jb250ZXh0Iiwic3RhdHVzIiwiI3N0YXR1cyIsImV4ZWN1dGUiLCJzdGFydCIsInN0b3AiLCJfaG1yIiwiX2FwcGxpY2F0aW9uIiwiX2xhdW5jaGVycyIsImxvY2FsMiIsIkJleW9uZExvY2FsIiwiYXBwbGljYXRpb24iLCJyZWdpc3RlcmVkIiwicmVnaXN0ZXIiLCJpbnNwZWN0IiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGtCQUFBO0FBQUFDLFFBQUEsQ0FBQUQsa0JBQUE7RUFBQUUsWUFBQSxFQUFBQSxDQUFBLEtBQUFBLFlBQUE7RUFBQUMsR0FBQSxFQUFBQSxDQUFBLEtBQUFBLEdBQUE7RUFBQUMsS0FBQSxFQUFBQSxDQUFBLEtBQUFBO0FBQUE7QUFBQUMsTUFBQSxDQUFBQyxPQUFBLEdBQUFDLFlBQUEsQ0FBQVAsa0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQUEsSUFBQVEsT0FBQSxHQUFBQyxRQUFBO0lBQ0EsSUFBQUMsS0FBQSxHQUFBRCxRQUFBO0lBS2MsTUFBQUUsUUFBQSxTQUFlRCxLQUFBLENBQUFFLE1BQUEsQ0FBTTtNQUkvQixDQUFBQyxNQUFBLEdBQVdDLEVBQUEsSUFBYztRQUNyQixNQUFNQyxRQUFBLEdBQVdELEVBQUEsS0FBTyxnQkFB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LFVBQUE7TUFRQUMsU0FBU0MsT0FBQSxFQUFpQjdDLFNBQUEsRUFBaUI7UUFDdkMsSUFBSSxLQUFLLENBQUEyQyxVQUFBLEVBQWEsTUFBTSxJQUFJRyxLQUFBLENBQU0sbUVBQW1FO1FBQ3pHLEtBQUssQ0FBQUgsVUFBQSxHQUFjO1FBRW5CaEYsT0FBQSxDQUFBd0IsUUFBQSxDQUFTeUQsUUFBQSxDQUFTLG9CQUFvQixvQkFBb0JDLE9BQUEsRUFBUztRQUNuRSxLQUFLLENBQUFoQixTQUFBLEdBQWEsSUFBSVUsVUFBQSxDQUFBekMsT0FBQSxDQUFTO1FBQy9CLEtBQUssQ0FBQXhDLEdBQUEsR0FBTyxJQUFJK0UsSUFBQSxDQUFBdkMsT0FBQSxDQUFJRSxTQUFTO1FBQzdCLEtBQUssQ0FBQTBDLFdBQUEsR0FBZSxJQUFJSixZQUFBLENBQUF4QyxPQUFBLENBQVc7TUFDdkM7TUFDSDtJQUFBckMsT0FBQSxDQUFBRixLQUFBLEdBQUFpRixNQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvY2xpZW50L291dCJ9","dependencies":[{"id":"@beyond-js/kernel@0.1.9/bundle","path":"D:\\Test\\client\\node_modules\\@beyond-js\\kernel"},{"id":"@beyond-js/kernel@0.1.9/core","path":"D:\\Test\\client\\node_modules\\@beyond-js\\kernel"},{"id":"@beyond-js/backend@0.1.9/client","path":"D:\\Test\\client\\node_modules\\@beyond-js\\backend"},{"id":"engine.io-parser@5.2.3","path":"D:\\Test\\client\\node_modules\\engine.io-parser"},{"id":"@socket.io/component-emitter@3.1.2","path":"D:\\Test\\client\\node_modules\\@socket.io\\component-emitter"},{"id":"engine.io-client@6.6.1","path":"D:\\Test\\client\\node_modules\\engine.io-client"},{"id":"socket.io-parser@4.2.4","path":"D:\\Test\\client\\node_modules\\socket.io-parser"},{"id":"socket.io-client@4.8.0","path":"D:\\Test\\client\\node_modules\\socket.io-client"}],"warnings":[]}