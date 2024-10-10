System.register(["@beyond-js/widgets@0.1.6/render", "@beyond-js/kernel@0.1.9/bundle", "@beyond-js/kernel@0.1.9/styles", "@beyond-js/react-18-widgets@1.0.4/page", "react@18.3.1", "react-router-dom@6.26.2"], function (_export, _context) {
  "use strict";

  var dependency_0, dependency_1, dependency_2, dependency_3, dependency_4, dependency_5, bimport, __Bundle, __pkg, ims, Controller, View, __beyond_pkg, hmr;
  _export({
    Controller: void 0,
    View: void 0
  });
  return {
    setters: [function (_beyondJsWidgets016Render) {
      dependency_0 = _beyondJsWidgets016Render;
    }, function (_beyondJsKernel019Bundle) {
      dependency_1 = _beyondJsKernel019Bundle;
    }, function (_beyondJsKernel019Styles) {
      dependency_2 = _beyondJsKernel019Styles;
    }, function (_beyondJsReact18Widgets104Page) {
      dependency_3 = _beyondJsReact18Widgets104Page;
    }, function (_react2) {
      dependency_4 = _react2;
    }, function (_reactRouterDom2) {
      dependency_5 = _reactRouterDom2;
    }],
    execute: function () {
      bimport = specifier => {
        const dependencies = new Map([["@beyond-js/kernel", "0.1.9"], ["@beyond-js/react-18-widgets", "1.0.4"], ["socket.io-client", "4.8.0"], ["react", "18.3.1"], ["react-dom", "18.3.1"], ["react-markdown", "9.0.1"], ["react-router-dom", "6.26.2"], ["react-scripts", "5.0.1"], ["typescript", "4.9.5"], ["@beyond-js/local", "0.1.3"], ["@types/react", "18.3.11"], ["@types/react-dom", "18.3.0"], ["@types/sass", "1.43.1"], ["client", "0.0.1"], ["client", "0.0.1"]]);
        return globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));
      };
      ({
        Bundle: __Bundle
      } = dependency_1);
      __pkg = new __Bundle({
        "module": {
          "vspecifier": "client@0.0.1/home"
        },
        "type": "widget"
      }, _context.meta.url).package();
      ;
      __pkg.dependencies.update([['@beyond-js/widgets/render', dependency_0], ['@beyond-js/kernel/styles', dependency_2], ['@beyond-js/react-18-widgets/page', dependency_3], ['react', dependency_4], ['react-router-dom', dependency_5]]);
      brequire('@beyond-js/widgets/render').widgets.register([{
        "name": "home-page",
        "vspecifier": "client@0.0.1/home",
        "is": "page",
        "route": "/"
      }]);
      brequire('@beyond-js/kernel/styles').styles.register('client@0.0.1/home');
      ims = new Map();
      /****************************
      INTERNAL MODULE: ./controller
      ****************************/
      ims.set('./controller', {
        hash: 2333043366,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.Controller = void 0;
          var _page = require("@beyond-js/react-18-widgets/page");
          var _store = require("./store");
          var _index = require("./views/index");
          /*bundle*/
          class Controller extends _page.PageReactWidgetController {
            #store;
            createStore() {
              this.#store = new _store.StoreManager();
              return this.#store;
            }
            get Widget() {
              return _index.View;
            }
            /**
             * this method is executed when the widget is showd
             */
            show() {}
            /**
             * this method is executed when the widget is hidden
             */
            hide() {}
          }
          exports.Controller = Controller;
        }
      });

      /***********************
      INTERNAL MODULE: ./store
      ***********************/

      ims.set('./store', {
        hash: 1793251939,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.StoreManager = void 0;
          class StoreManager {}
          exports.StoreManager = StoreManager;
        }
      });

      /**********************************
      INTERNAL MODULE: ./types/date-group
      **********************************/

      ims.set('./types/date-group', {
        hash: 3832778008,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
        }
      });

      /**************************************
      INTERNAL MODULE: ./types/traffic-report
      **************************************/

      ims.set('./types/traffic-report', {
        hash: 1249779049,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
        }
      });

      /*****************************
      INTERNAL MODULE: ./views/index
      *****************************/

      ims.set('./views/index', {
        hash: 1955919054,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.View = View;
          require("./css/global.scss");
          var _react = require("react");
          var _dropDownList = require("../../../list/drop-down-list");
          var _getReport = require("../../../get/get-report");
          var _login = require("../../../login/login");
          var _configPage = require("../../../config/configPage");
          var _reactRouterDom = require("react-router-dom");
          /*bundle*/
          function View() {
            const [showGetReport, setShowGetReport] = (0, _react.useState)(false); // State to control the visibility of GetReport
            return _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement("div", {
              className: "parent"
            }, _react.default.createElement("div", {
              className: "main-section"
            }, _react.default.createElement(_reactRouterDom.Routes, null, _react.default.createElement(_reactRouterDom.Route, {
              path: "/config",
              element: _react.default.createElement(_configPage.ConfigurationPage, null)
            }), _react.default.createElement(_reactRouterDom.Route, {
              path: "/login",
              element: _react.default.createElement(_login.Login, null)
            }), _react.default.createElement(_reactRouterDom.Route, {
              path: "/",
              element: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactRouterDom.Link, {
                to: "/login",
                className: "login-link"
              }, "Login"), _react.default.createElement(_reactRouterDom.Link, {
                to: "/config",
                className: "config-link"
              }, "Configuration"), _react.default.createElement("div", {
                className: "title-and-button"
              }, _react.default.createElement("h1", null, "Reportes de tr\u00E1fico por hora"), _react.default.createElement("button", {
                onClick: () => setShowGetReport(true),
                className: "generate-button"
              }, "Generar ahora")), showGetReport && _react.default.createElement("div", {
                className: "report-section"
              }, _react.default.createElement(_getReport.GetReport, null)), _react.default.createElement(_dropDownList.TrafficReportDropDown, null))
            })))));
          }
        }
      });
      __pkg.exports.descriptor = [{
        "im": "./controller",
        "from": "Controller",
        "name": "Controller"
      }, {
        "im": "./views/index",
        "from": "View",
        "name": "View"
      }];
      // Module exports
      __pkg.exports.process = function ({
        require,
        prop,
        value
      }) {
        (require || prop === 'Controller') && _export("Controller", Controller = require ? require('./controller').Controller : value);
        (require || prop === 'View') && _export("View", View = require ? require('./views/index').View : value);
      };
      _export("__beyond_pkg", __beyond_pkg = __pkg);
      _export("hmr", hmr = new function () {
        this.on = (event, listener) => __pkg.hmr.on(event, listener);
        this.off = (event, listener) => __pkg.hmr.off(event, listener);
      }());
      __pkg.initialise(ims);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGFnZSIsInJlcXVpcmUiLCJfc3RvcmUiLCJfaW5kZXgiLCJDb250cm9sbGVyIiwiUGFnZVJlYWN0V2lkZ2V0Q29udHJvbGxlciIsInN0b3JlIiwiY3JlYXRlU3RvcmUiLCJTdG9yZU1hbmFnZXIiLCJXaWRnZXQiLCJWaWV3Iiwic2hvdyIsImhpZGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIl9yZWFjdCIsIl9kcm9wRG93bkxpc3QiLCJfZ2V0UmVwb3J0IiwiX2xvZ2luIiwiX2NvbmZpZ1BhZ2UiLCJfcmVhY3RSb3V0ZXJEb20iLCJzaG93R2V0UmVwb3J0Iiwic2V0U2hvd0dldFJlcG9ydCIsInVzZVN0YXRlIiwiZGVmYXVsdCIsImNyZWF0ZUVsZW1lbnQiLCJCcm93c2VyUm91dGVyIiwiY2xhc3NOYW1lIiwiUm91dGVzIiwiUm91dGUiLCJwYXRoIiwiZWxlbWVudCIsIkNvbmZpZ3VyYXRpb25QYWdlIiwiTG9naW4iLCJGcmFnbWVudCIsIkxpbmsiLCJ0byIsIm9uQ2xpY2siLCJHZXRSZXBvcnQiLCJUcmFmZmljUmVwb3J0RHJvcERvd24iXSwic291cmNlcyI6WyIvdHMvY29udHJvbGxlci50cyIsIi90cy9zdG9yZS50cyIsIi9kYXRlLWdyb3VwLnRzIiwiL3RyYWZmaWMtcmVwb3J0LnRzIiwiL3RzL3ZpZXdzL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6W251bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBQUEsSUFBQUEsS0FBQSxHQUFBQyxPQUFBO1VBQ0EsSUFBQUMsTUFBQSxHQUFBRCxPQUFBO1VBQ0EsSUFBQUUsTUFBQSxHQUFBRixPQUFBO1VBRU87VUFBVSxNQUNYRyxVQUFXLFNBQVFKLEtBQUEsQ0FBQUsseUJBQXlCO1lBQ2pELENBQUFDLEtBQU07WUFDTkMsV0FBV0EsQ0FB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