System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", {
        "package": "client",
        "version": "0.0.1",
        "languages": {
          "default": "en",
          "supported": ["en", "es"]
        },
        "environment": "development",
        "global.css": true,
        "layout": "main-layout",
        "params": {},
        "ssr": {},
        "backend": {}
      });
    }
  };
});