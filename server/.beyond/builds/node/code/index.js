globalThis.__app_package = {specifier: 'server'};
Object.defineProperty(globalThis, 'brequire', {get: () => require});
Object.defineProperty(globalThis, 'bimport', {get: () => async specifier => require(specifier)});

require('./start.js');