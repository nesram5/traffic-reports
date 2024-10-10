{"code":"System.register([\"react@18.3.1\",\"scheduler@0.23.2\",\"react-dom@18.3.1\"], (_exports, _context) => {\n\nconst bimport = specifier => {\n\tconst dependencies = new Map([[\"react\",\"18.3.1\"],[\"scheduler\",\"0.23.2\"],[\"react-dom\",\"18.3.1\"]]);\n\treturn globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));\n};\n\n\nvar dependencies = new Map();\nvar require = dependency => dependencies.get(dependency);\nreturn {\nsetters: [dep => dependencies.set('react@18.3.1', dep), dep => dependencies.set('scheduler@0.23.2', dep), dep => dependencies.set('react-dom@18.3.1', dep)],\nexecute: function() {\n// Prevent esbuild from considering the context to be amd\nconst define = void 0;\nconst module = {};\n\nconst code = (module, require) => {\nvar __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __commonJS = (cb, mod) => function __require() {\n  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {\n    exports: {}\n  }).exports, mod), mod.exports;\n};\nvar __export = (target, all) => {\n  for (var name in all) __defProp(target, name, {\n    get: all[name],\n    enumerable: true\n  });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {\n      get: () => from[key],\n      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable\n    });\n  }\n  return to;\n};\nvar __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, \"default\"), secondTarget && __copyProps(secondTarget, mod, \"default\"));\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, \"default\", {\n  value: mod,\n  enumerable: true\n}) : target, mod));\nvar __toCommonJS = mod => __copyProps(__defProp({}, \"__esModule\", {\n  value: true\n}), mod);\n\n// node_modules/react-dom/client.js\nvar require_client = __commonJS({\n  \"node_modules/react-dom/client.js\"(exports) {\n    \"use strict\";\n\n    var m = require(\"react-dom@18.3.1\");\n    if (false) {\n      exports.createRoot = m.createRoot;\n      exports.hydrateRoot = m.hydrateRoot;\n    } else {\n      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;\n      exports.createRoot = function (c, o) {\n        i.usingClientEntryPoint = true;\n        try {\n          return m.createRoot(c, o);\n        } finally {\n          i.usingClientEntryPoint = false;\n        }\n      };\n      exports.hydrateRoot = function (c, h, o) {\n        i.usingClientEntryPoint = true;\n        try {\n          return m.hydrateRoot(c, h, o);\n        } finally {\n          i.usingClientEntryPoint = false;\n        }\n      };\n    }\n    var i;\n  }\n});\n\n// .beyond/uimport/react-dom/client.18.3.1.js\nvar client_18_3_1_exports = {};\n__export(client_18_3_1_exports, {\n  default: () => client_18_3_1_default\n});\nmodule.exports = __toCommonJS(client_18_3_1_exports);\n__reExport(client_18_3_1_exports, __toESM(require_client()), module.exports);\nvar import_client = __toESM(require_client());\nvar client_18_3_1_default = import_client.default;\n};\n\ncode(module, require);\n_exports(module.exports);\n}}});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vY2xpZW50LmpzIiwiLi4vLmJleW9uZC91aW1wb3J0L3JlYWN0LWRvbS9jbGllbnQuMTguMy4xLmpzIl0sIm5hbWVzIjpbInJlcXVpcmVfY2xpZW50IiwiX19jb21tb25KUyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1kb20vY2xpZW50LmpzIiwiZXhwb3J0cyIsIm0iLCJyZXF1aXJlIiwiY3JlYXRlUm9vdCIsImh5ZHJhdGVSb290IiwiaSIsIl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEIiwiYyIsIm8iLCJ1c2luZ0NsaWVudEVudHJ5UG9pbnQiLCJoIiwiY2xpZW50XzE4XzNfMV9leHBvcnRzIiwiX19leHBvcnQiLCJkZWZhdWx0IiwiY2xpZW50XzE4XzNfMV9kZWZhdWx0IiwibW9kdWxlIiwiX190b0NvbW1vbkpTIiwiX19yZUV4cG9ydCIsIl9fdG9FU00iLCJpbXBvcnRfY2xpZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxjQUFBLEdBQUFDLFVBQUE7RUFBQSxrQ0FBQUMsQ0FBQUMsT0FBQTtJQUFBOztJQUVBLElBQUlDLENBQUEsR0FBSUMsT0FBQSxDQUFRO0lBQ2hCLElBQUksT0FBdUM7TUFDekNGLE9BQUEsQ0FBUUcsVUFBQSxHQUFhRixDQUFBLENBQUVFLFVBQUE7TUFDdkJILE9BQUEsQ0FBUUksV0FBQSxHQUFjSCxDQUFBLENBQUVHLFdBQUE7SUFDMUIsT0FBTztNQUNEQyxDQUFBLEdBQUlKLENBQUEsQ0FBRUssa0RBQUE7TUFDVk4sT0FBQSxDQUFRRyxVQUFBLEdBQWEsVUFBU0ksQ0FBQSxFQUFHQyxDQUFBLEVBQUc7UUFDbENILENBQUEsQ0FBRUkscUJBQUEsR0FBd0I7UUFDMUIsSUFBSTtVQUNGLE9BQU9SLENBQUEsQ0FBRUUsVUFBQSxDQUFXSSxDQUFBLEVBQUdDLENBQUM7UUFDMUIsVUFBRTtVQUNBSCxDQUFBLENBQUVJLHFCQUFBLEdBQXdCO1FBQzVCO01BQ0Y7TUFDQVQsT0FBQSxDQUFRSSxXQUFBLEdBQWMsVUFBU0csQ0FBQSxFQUFHRyxDQUFBLEVBQUdGLENBQUEsRUFBRztRQUN0Q0gsQ0FBQSxDQUFFSSxxQkFBQSxHQUF3QjtRQUMxQixJQUFJO1VBQ0YsT0FBT1IsQ0FBQSxDQUFFRyxXQUFBLENBQVlHLENBQUEsRUFBR0csQ0FBQSxFQUFHRixDQUFDO1FBQzlCLFVBQUU7VUFDQUgsQ0FBQSxDQUFFSSxxQkFBQSxHQUF3QjtRQUM1QjtNQUNGO0lBQ0Y7SUFqQk0sSUFBQUosQ0FBQTtFQUFBO0FBQUE7OztBQ1BOLElBQUFNLHFCQUFBO0FBQUFDLFFBQUEsQ0FBQUQscUJBQUE7RUFBQUUsT0FBQSxFQUFBQSxDQUFBLEtBQUFDO0FBQUE7QUFBQUMsTUFBQSxDQUFBZixPQUFBLEdBQUFnQixZQUFBLENBQUFMLHFCQUFBO0FBQUFNLFVBQUEsQ0FBQU4scUJBQUEsRUFBY08sT0FBQSxDQUFBckIsY0FBQSxLQUFka0IsTUFBQSxDQUFBZixPQUFBO0FBRUEsSUFBQW1CLGFBQUEsR0FBcUJELE9BQUEsQ0FBQXJCLGNBQUE7QUFDckIsSUFBT2lCLHFCQUFBLEdBQVFLLGFBQUEsQ0FBQU4sT0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiL2NsaWVudC9vdXQifQ==","dependencies":[{"id":"react@18.3.1","path":"D:\\Test\\client\\node_modules\\react"},{"id":"scheduler@0.23.2","path":"D:\\Test\\client\\node_modules\\scheduler"},{"id":"react-dom@18.3.1","path":"D:\\Test\\client\\node_modules\\react-dom"}],"warnings":[]}