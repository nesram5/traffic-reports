System.register([], (_exports, _context) => {

const bimport = specifier => {
	const dependencies = new Map([["@remix-run/router","1.19.2"]]);
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

// .beyond/uimport/@remix-run/router.1.19.2.js
var router_1_19_2_exports = {};
__export(router_1_19_2_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Action: () => Action,
  IDLE_BLOCKER: () => IDLE_BLOCKER,
  IDLE_FETCHER: () => IDLE_FETCHER,
  IDLE_NAVIGATION: () => IDLE_NAVIGATION,
  UNSAFE_DEFERRED_SYMBOL: () => UNSAFE_DEFERRED_SYMBOL,
  UNSAFE_DeferredData: () => DeferredData,
  UNSAFE_ErrorResponseImpl: () => ErrorResponseImpl,
  UNSAFE_convertRouteMatchToUiMatch: () => convertRouteMatchToUiMatch,
  UNSAFE_convertRoutesToDataRoutes: () => convertRoutesToDataRoutes,
  UNSAFE_decodePath: () => decodePath,
  UNSAFE_getResolveToMatches: () => getResolveToMatches,
  UNSAFE_invariant: () => invariant,
  UNSAFE_warning: () => warning,
  createBrowserHistory: () => createBrowserHistory,
  createHashHistory: () => createHashHistory,
  createMemoryHistory: () => createMemoryHistory,
  createPath: () => createPath,
  createRouter: () => createRouter,
  createStaticHandler: () => createStaticHandler,
  defer: () => defer,
  generatePath: () => generatePath,
  getStaticContextFromError: () => getStaticContextFromError,
  getToPathname: () => getToPathname,
  isDataWithResponseInit: () => isDataWithResponseInit,
  isDeferredData: () => isDeferredData,
  isRouteErrorResponse: () => isRouteErrorResponse,
  joinPaths: () => joinPaths,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  normalizePathname: () => normalizePathname,
  parsePath: () => parsePath,
  redirect: () => redirect,
  redirectDocument: () => redirectDocument,
  replace: () => replace,
  resolvePath: () => resolvePath,
  resolveTo: () => resolveTo,
  stripBasename: () => stripBasename,
  unstable_data: () => data
});
module.exports = __toCommonJS(router_1_19_2_exports);

// node_modules/@remix-run/router/dist/router.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function (Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
var PopStateEventType = "popstate";
function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries;
  entries = initialEntries.map((entry, index2) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index2 === 0 ? "default" : void 0));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation("", {
      pathname,
      search,
      hash
    }, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation("", {
      pathname,
      search,
      hash
    }, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {}
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    key: to && to.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace2(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
var ResultType;
(function (ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
var immutableRouteKeys = /* @__PURE__ */new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`);
    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties(route), {
        id
      });
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
        id,
        children: void 0
      });
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded, allowPartial);
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(route.index !== true, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".'));
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = s => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
    path = path.replace(/\*$/, "/*");
  }
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify = p => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    if (isLastSegment && segment === "*") {
      const star = "*";
      return stringify(params[star]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, 'Missing ":' + key + '" param');
      return stringify(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter(segment => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map(v => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map(match => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
var joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var json = function json2(data2, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data2), _extends({}, responseInit, {
    headers
  }));
};
var DataWithResponseInit = class {
  constructor(data2, init) {
    this.type = "DataWithResponseInit";
    this.data = data2;
    this.init = init || null;
  }
};
function data(data2, init) {
  return new DataWithResponseInit(data2, typeof init === "number" ? {
    status: init
  } : init);
}
var AbortedDeferredError = class extends Error {};
var DeferredData = class {
  constructor(data2, responseInit) {
    this.pendingKeysSet = /* @__PURE__ */new Set();
    this.subscribers = /* @__PURE__ */new Set();
    this.deferredKeys = [];
    invariant(data2 && typeof data2 === "object" && !Array.isArray(data2), "defer() only accepts plain objects");
    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();
    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data2).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
    if (this.done) {
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }
    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key);
    let promise = Promise.race([value, this.abortPromise]).then(data2 => this.onSettle(promise, key, void 0, data2), error => this.onSettle(promise, key, error));
    promise.catch(() => {});
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }
  onSettle(promise, key, error, data2) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }
    this.pendingKeysSet.delete(key);
    if (this.done) {
      this.unlistenAbortSignal();
    }
    if (error === void 0 && data2 === void 0) {
      let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
      Object.defineProperty(promise, "_error", {
        get: () => undefinedError
      });
      this.emit(false, key);
      return Promise.reject(undefinedError);
    }
    if (data2 === void 0) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }
    Object.defineProperty(promise, "_data", {
      get: () => data2
    });
    this.emit(false, key);
    return data2;
  }
  emit(aborted, settledKey) {
    this.subscribers.forEach(subscriber => subscriber(aborted, settledKey));
  }
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
    this.emit(true);
  }
  async resolveData(signal) {
    let aborted = false;
    if (!this.done) {
      let onAbort = () => this.cancel();
      signal.addEventListener("abort", onAbort);
      aborted = await new Promise(resolve => {
        this.subscribe(aborted2 => {
          signal.removeEventListener("abort", onAbort);
          if (aborted2 || this.done) {
            resolve(aborted2);
          }
        });
      });
    }
    return aborted;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref3) => {
      let [key, value] = _ref3;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
};
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
var defer = function defer2(data2, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data2, responseInit);
};
var redirect = function redirect2(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
var redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
var replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
var validMutationMethodsArr = ["post", "put", "patch", "delete"];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var defaultMapRouteProperties = route => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  const isServer = !isBrowser;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties;
  if (init.mapRouteProperties) {
    mapRouteProperties = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, void 0, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.unstable_dataStrategy || defaultDataStrategy;
  let patchRoutesOnNavigationImpl = init.unstable_patchRoutesOnNavigation;
  let future = _extends({
    v7_fetcherPersist: false,
    v7_normalizeFormMethod: false,
    v7_partialHydration: false,
    v7_prependBasename: false,
    v7_relativeSplatPath: false,
    v7_skipActionErrorRevalidation: false
  }, init.future);
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */new Set();
  let discoveredRoutesMaxSize = 1e3;
  let discoveredRoutes = /* @__PURE__ */new Set();
  let savedScrollPositions = null;
  let getScrollRestorationKey = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialErrors = null;
  if (initialMatches == null && !patchRoutesOnNavigationImpl) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  if (initialMatches && !init.hydrationData) {
    let fogOfWar = checkFogOfWar(initialMatches, dataRoutes, init.history.location.pathname);
    if (fogOfWar.active) {
      initialMatches = null;
    }
  }
  let initialized;
  if (!initialMatches) {
    initialized = false;
    initialMatches = [];
    if (future.v7_partialHydration) {
      let fogOfWar = checkFogOfWar(null, dataRoutes, init.history.location.pathname);
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatches = fogOfWar.matches;
      }
    }
  } else if (initialMatches.some(m => m.route.lazy)) {
    initialized = false;
  } else if (!initialMatches.some(m => m.route.loader)) {
    initialized = true;
  } else if (future.v7_partialHydration) {
    let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
    let errors = init.hydrationData ? init.hydrationData.errors : null;
    let isRouteInitialized = m => {
      if (!m.route.loader) {
        return true;
      }
      if (typeof m.route.loader === "function" && m.route.loader.hydrate === true) {
        return false;
      }
      return loaderData && loaderData[m.route.id] !== void 0 || errors && errors[m.route.id] !== void 0;
    };
    if (errors) {
      let idx = initialMatches.findIndex(m => errors[m.route.id] !== void 0);
      initialized = initialMatches.slice(0, idx + 1).every(isRouteInitialized);
    } else {
      initialized = initialMatches.every(isRouteInitialized);
    }
  } else {
    initialized = init.hydrationData != null;
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */new Map(),
    blockers: /* @__PURE__ */new Map()
  };
  let pendingAction = Action.Pop;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledDeferredRoutes = [];
  let cancelledFetcherLoads = /* @__PURE__ */new Set();
  let fetchControllers = /* @__PURE__ */new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */new Map();
  let fetchRedirectIds = /* @__PURE__ */new Set();
  let fetchLoadMatches = /* @__PURE__ */new Map();
  let activeFetchers = /* @__PURE__ */new Map();
  let deletedFetchers = /* @__PURE__ */new Set();
  let activeDeferreds = /* @__PURE__ */new Map();
  let blockerFunctions = /* @__PURE__ */new Map();
  let pendingPatchRoutes = /* @__PURE__ */new Map();
  let unblockBlockerHistoryUpdate = void 0;
  function initialize() {
    unlistenHistory = init.history.listen(_ref => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      if (unblockBlockerHistoryUpdate) {
        unblockBlockerHistoryUpdate();
        unblockBlockerHistoryUpdate = void 0;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        let nextHistoryUpdatePromise = new Promise(resolve => {
          unblockBlockerHistoryUpdate = resolve;
        });
        init.history.go(delta * -1);
        updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location
            });
            nextHistoryUpdatePromise.then(() => init.history.go(delta));
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER);
            updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    });
    if (isBrowser) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation(Action.Pop, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state = _extends({}, state, newState);
    let completedFetchers = [];
    let deletedFetchersKeys = [];
    if (future.v7_fetcherPersist) {
      state.fetchers.forEach((fetcher, key) => {
        if (fetcher.state === "idle") {
          if (deletedFetchers.has(key)) {
            deletedFetchersKeys.push(key);
          } else {
            completedFetchers.push(key);
          }
        }
      });
    }
    [...subscribers].forEach(subscriber => subscriber(state, {
      deletedFetchers: deletedFetchersKeys,
      unstable_viewTransitionOpts: opts.viewTransitionOpts,
      unstable_flushSync: opts.flushSync === true
    }));
    if (future.v7_fetcherPersist) {
      completedFetchers.forEach(key => state.fetchers.delete(key));
      deletedFetchersKeys.forEach(key => deleteFetcher(key));
    }
  }
  function completeNavigation(location, newState, _temp) {
    var _location$state, _location$state2;
    let {
      flushSync
    } = _temp === void 0 ? {} : _temp;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation) ;else if (pendingAction === Action.Pop) ;else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === Action.Pop) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers
    }), {
      viewTransitionOpts,
      flushSync: flushSync === true
    });
    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
  }
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false) ;else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.unstable_viewTransition,
      flushSync
    });
  }
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    });
    if (state.navigation.state === "submitting") {
      return;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    }
    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation,
      enableViewTransition: pendingViewTransitionEnabled === true
    });
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(routesToUse, location, basename);
    let flushSync = (opts && opts.flushSync) === true;
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let {
        error,
        notFoundMatches,
        route
      } = handleNavigational404(location.pathname);
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      }, {
        flushSync
      });
      return;
    }
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      }, {
        flushSync
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [findNearestBoundary(matches).route.id, {
        type: ResultType.error,
        error: opts.pendingError
      }];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(request, location, opts.submission, matches, fogOfWar.active, {
        replace: opts.replace,
        flushSync
      });
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync = false;
      fogOfWar.active = false;
      request = createClientSideRequest(init.history, request.url, request.signal);
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, _extends({
      matches: updatedMatches || matches
    }, getActionDataForCommit(pendingActionResult), {
      loaderData,
      errors
    }));
  }
  async function handleAction(request, location, submission, matches, isFogOfWar, opts) {
    if (opts === void 0) {
      opts = {};
    }
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({
      navigation
    }, {
      flushSync: opts.flushSync === true
    });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let {
          boundaryId,
          error
        } = handleDiscoverRouteError(location.pathname, discoverResult);
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [boundaryId, {
            type: ResultType.error,
            error
          }]
        };
      } else if (!discoverResult.matches) {
        let {
          notFoundMatches,
          error,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          pendingActionResult: [route.id, {
            type: ResultType.error,
            error
          }]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let results = await callDataStrategy("action", state, request, [actionMatch], matches, null);
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
        replace2 = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return {
        shortCircuited: true
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        matches,
        pendingActionResult: [boundaryMatch.route.id, result]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration);
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(_extends({
          navigation: loadingNavigation
        }, actionData !== void 0 ? {
          actionData
        } : {}), {
          flushSync
        });
      }
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let {
          boundaryId,
          error
        } = handleDiscoverRouteError(location.pathname, discoverResult);
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: error
          }
        };
      } else if (!discoverResult.matches) {
        let {
          error,
          notFoundMatches,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
    cancelActiveDeferreds(routeId => !(matches && matches.some(m => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some(m => m.route.id === routeId));
    pendingNavigationLoadId = ++incrementingLoadId;
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(location, _extends({
        matches,
        loaderData: {},
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null
      }, getActionDataForCommit(pendingActionResult), updatedFetchers2 ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync
      });
      return {
        shortCircuited: true
      };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, {
        flushSync
      });
    }
    revalidatingFetchers.forEach(rf => {
      if (fetchControllers.has(rf.key)) {
        abortFetcher(rf.key);
      }
      if (rf.controller) {
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(f => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }
    revalidatingFetchers.forEach(rf => fetchControllers.delete(rf.key));
    let redirect3 = findRedirect(loaderResults);
    if (redirect3) {
      await startRedirectNavigation(request, redirect3.result, true, {
        replace: replace2
      });
      return {
        shortCircuited: true
      };
    }
    redirect3 = findRedirect(fetcherResults);
    if (redirect3) {
      fetchRedirectIds.add(redirect3.key);
      await startRedirectNavigation(request, redirect3.result, true, {
        replace: replace2
      });
      return {
        shortCircuited: true
      };
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe(aborted => {
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    if (future.v7_partialHydration && initialHydration && state.errors) {
      Object.entries(state.errors).filter(_ref2 => {
        let [id] = _ref2;
        return !matchesToLoad.some(m => m.route.id === id);
      }).forEach(_ref3 => {
        let [routeId, error] = _ref3;
        errors = Object.assign(errors || {}, {
          [routeId]: error
        });
      });
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      matches,
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach(rf => {
      let fetcher = state.fetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
      state.fetchers.set(rf.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    }
    if (fetchControllers.has(key)) abortFetcher(key);
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }), {
        flushSync
      });
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error, {
        flushSync
      });
      return;
    }
    let match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, fogOfWar.active, flushSync, submission);
      return;
    }
    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, fogOfWar.active, flushSync, submission);
  }
  async function handleFetcherAction(key, routeId, path, match, requestMatches, isFogOfWar, flushSync, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    function detectAndHandle405Error(m) {
      if (!m.route.action && !m.route.lazy) {
        let error = getInternalRouterError(405, {
          method: submission.formMethod,
          pathname: path,
          routeId
        });
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return true;
      }
      return false;
    }
    if (!isFogOfWar && detectAndHandle405Error(match)) {
      return;
    }
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(requestMatches, path, fetchRequest.signal);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        let {
          error
        } = handleDiscoverRouteError(path, discoverResult);
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync
        });
        return;
      } else {
        requestMatches = discoverResult.matches;
        match = getTargetMatch(requestMatches, path);
        if (detectAndHandle405Error(match)) {
          return;
        }
      }
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let actionResults = await callDataStrategy("action", state, fetchRequest, [match], requestMatches, key);
    let actionResult = actionResults[match.route.id];
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
    revalidatingFetchers.filter(rf => rf.key !== key).forEach(rf => {
      let staleKey = rf.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
      state.fetchers.set(staleKey, revalidatingFetcher);
      if (fetchControllers.has(staleKey)) {
        abortFetcher(staleKey);
      }
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(rf => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach(r => fetchControllers.delete(r.key));
    let redirect3 = findRedirect(loaderResults);
    if (redirect3) {
      return startRedirectNavigation(revalidationRequest, redirect3.result, false);
    }
    redirect3 = findRedirect(fetcherResults);
    if (redirect3) {
      fetchRedirectIds.add(redirect3.key);
      return startRedirectNavigation(revalidationRequest, redirect3.result, false);
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, match, matches, isFogOfWar, flushSync, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, path, fetchRequest.signal);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        let {
          error
        } = handleDiscoverRouteError(path, discoverResult);
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync
        });
        return;
      } else {
        matches = discoverResult.matches;
        match = getTargetMatch(matches, path);
      }
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let results = await callDataStrategy("loader", state, fetchRequest, [match], matches, key);
    let result = results[match.route.id];
    if (isDeferredResult(result)) {
      result = (await resolveDeferredData(result, fetchRequest.signal, true)) || result;
    }
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (deletedFetchers.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false);
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect3, isNavigation, _temp2) {
    let {
      submission,
      fetcherSubmission,
      replace: replace2
    } = _temp2 === void 0 ? {} : _temp2;
    if (redirect3.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect3.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(location, new URL(request.url), basename);
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser) {
      let isDocumentReload = false;
      if (redirect3.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (ABSOLUTE_URL_REGEX.test(location)) {
        const url = init.history.createURL(location);
        isDocumentReload = url.origin !== routerWindow.location.origin || stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace2 === true || redirect3.response.headers.has("X-Remix-Replace") ? Action.Replace : Action.Push;
    let {
      formMethod,
      formAction,
      formEncType
    } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect3.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, activeSubmission, {
          formAction: location
        }),
        preventScrollReset: pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        fetcherSubmission,
        preventScrollReset: pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(type, state2, request, matchesToLoad, matches, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(dataStrategyImpl, type, state2, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties);
    } catch (e) {
      matchesToLoad.forEach(m => {
        dataResults[m.route.id] = {
          type: ResultType.error,
          error: e
        };
      });
      return dataResults;
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResultResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: ResultType.redirect,
          response: normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, future.v7_relativeSplatPath)
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(state2, matches, matchesToLoad, fetchersToLoad, request) {
    let currentMatches = state2.matches;
    let loaderResultsPromise = callDataStrategy("loader", state2, request, matchesToLoad, matches, null);
    let fetcherResultsPromise = Promise.all(fetchersToLoad.map(async f => {
      if (f.matches && f.match && f.controller) {
        let results = await callDataStrategy("loader", state2, createClientSideRequest(init.history, f.path, f.controller.signal), [f.match], f.matches, f.key);
        let result = results[f.match.route.id];
        return {
          [f.key]: result
        };
      } else {
        return Promise.resolve({
          [f.key]: {
            type: ResultType.error,
            error: getInternalRouterError(404, {
              pathname: f.path
            })
          }
        });
      }
    }));
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce((acc, r) => Object.assign(acc, r), {});
    await Promise.all([resolveNavigationDeferredResults(matches, loaderResults, request.signal, currentMatches, state2.loaderData), resolveFetcherDeferredResults(matches, fetcherResults, fetchersToLoad)]);
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    cancelledDeferredRoutes.push(...cancelActiveDeferreds());
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
        abortFetcher(key);
      }
    });
  }
  function updateFetcherState(key, fetcher, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function setFetcherError(key, routeId, error, opts) {
    if (opts === void 0) {
      opts = {};
    }
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function getFetcher(key) {
    if (future.v7_fetcherPersist) {
      activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
      if (deletedFetchers.has(key)) {
        deletedFetchers.delete(key);
      }
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    deletedFetchers.delete(key);
    cancelledFetcherLoads.delete(key);
    state.fetchers.delete(key);
  }
  function deleteFetcherAndUpdateState(key) {
    if (future.v7_fetcherPersist) {
      let count = (activeFetchers.get(key) || 0) - 1;
      if (count <= 0) {
        activeFetchers.delete(key);
        deletedFetchers.add(key);
      } else {
        activeFetchers.set(key, count);
      }
    } else {
      deleteFetcher(key);
    }
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref4) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref4;
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, {
      pathname
    });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let {
      matches,
      route
    } = getShortCircuitMatches(routesToUse);
    cancelActiveDeferreds();
    return {
      notFoundMatches: matches,
      route,
      error
    };
  }
  function handleDiscoverRouteError(pathname, discoverResult) {
    return {
      boundaryId: findNearestBoundary(discoverResult.partialMatches).route.id,
      error: getInternalRouterError(400, {
        type: "route-discovery",
        pathname,
        message: discoverResult.error != null && "message" in discoverResult.error ? discoverResult.error : String(discoverResult.error)
      })
    };
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey) {
      let key = getScrollRestorationKey(location, matches.map(m => convertRouteMatchToUiMatch(m, state.loaderData)));
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (patchRoutesOnNavigationImpl) {
      if (discoveredRoutes.has(pathname)) {
        return {
          active: false,
          matches
        };
      }
      if (!matches) {
        let fogMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
        return {
          active: true,
          matches: fogMatches || []
        };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
          return {
            active: true,
            matches: partialMatches
          };
        }
      }
    }
    return {
      active: false,
      matches: null
    };
  }
  async function discoverRoutes(matches, pathname, signal) {
    let partialMatches = matches;
    while (true) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      try {
        await loadLazyRouteChildren(patchRoutesOnNavigationImpl, pathname, partialMatches, routesToUse, manifest, mapRouteProperties, pendingPatchRoutes, signal);
      } catch (e) {
        return {
          type: "error",
          error: e,
          partialMatches
        };
      } finally {
        if (isNonHMR) {
          dataRoutes = [...dataRoutes];
        }
      }
      if (signal.aborted) {
        return {
          type: "aborted"
        };
      }
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      if (newMatches) {
        addToFifoQueue(pathname, discoveredRoutes);
        return {
          type: "success",
          matches: newMatches
        };
      }
      let newPartialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
      if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every((m, i) => m.route.id === newPartialMatches[i].route.id)) {
        addToFifoQueue(pathname, discoveredRoutes);
        return {
          type: "success",
          matches: null
        };
      }
      partialMatches = newPartialMatches;
    }
  }
  function addToFifoQueue(path, queue) {
    if (queue.size >= discoveredRoutesMaxSize) {
      let first = queue.values().next().value;
      queue.delete(first);
    }
    queue.add(path);
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, void 0, manifest);
  }
  function patchRoutes(routeId, children) {
    let isNonHMR = inFlightDataRoutes == null;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties);
    if (isNonHMR) {
      dataRoutes = [...dataRoutes];
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    createHref: to => init.history.createHref(to),
    encodeLocation: to => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: deleteFetcherAndUpdateState,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    _internalSetRoutes
  };
  return router;
}
var UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties;
  if (opts != null && opts.mapRouteProperties) {
    mapRouteProperties = opts.mapRouteProperties;
  } else if (opts != null && opts.detectErrorBoundary) {
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  let future = _extends({
    v7_relativeSplatPath: false,
    v7_throwAbortReason: false
  }, opts ? opts.future : null);
  let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, void 0, manifest);
  async function query(request, _temp3) {
    let {
      requestContext,
      skipLoaderErrorBubbling,
      unstable_dataStrategy
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, skipLoaderErrorBubbling === true, null);
    if (isResponse(result)) {
      return result;
    }
    return _extends({
      location,
      basename
    }, result);
  }
  async function queryRoute(request, _temp4) {
    let {
      routeId,
      requestContext,
      unstable_dataStrategy
    } = _temp4 === void 0 ? {} : _temp4;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let match = routeId ? matches.find(m => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, false, match);
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0) {
      throw error;
    }
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      var _result$activeDeferre;
      let data2 = Object.values(result.loaderData)[0];
      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data2[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }
      return data2;
    }
    return void 0;
  }
  async function queryImpl(request, location, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result2 = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch != null);
        return result2;
      }
      let result = await loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === ResultType.error) {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches, isRouteRequest, requestContext, unstable_dataStrategy);
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest, future);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let context2 = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null, [boundaryMatch.route.id, result]);
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let context = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null);
    return _extends({}, context, {
      actionData: {
        [actionMatch.route.id]: result.data
      }
    }, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionHeaders: result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {}
    });
  }
  async function loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
    let matchesToLoad = requestMatches.filter(m => m.route.loader || m.route.lazy);
    if (matchesToLoad.length === 0) {
      return {
        matches,
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }
    let results = await callDataStrategy("loader", request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy);
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest, future);
    }
    let activeDeferreds = /* @__PURE__ */new Map();
    let context = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling);
    let executedLoaders = new Set(matchesToLoad.map(match => match.route.id));
    matches.forEach(match => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy) {
    let results = await callDataStrategyImpl(unstable_dataStrategy || defaultDataStrategy, type, null, request, matchesToLoad, matches, null, manifest, mapRouteProperties, requestContext);
    let dataResults = {};
    await Promise.all(matches.map(async match => {
      if (!(match.route.id in results)) {
        return;
      }
      let result = results[match.route.id];
      if (isRedirectDataStrategyResultResult(result)) {
        let response = result.result;
        throw normalizeRelativeRoutingRedirectResponse(response, request, match.route.id, matches, basename, future.v7_relativeSplatPath);
      }
      if (isResponse(result.result) && isRouteRequest) {
        throw result;
      }
      dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
    }));
    return dataResults;
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes, context, error) {
  let newContext = _extends({}, context, {
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });
  return newContext;
}
function throwStaticHandlerAbortedError(request, isRouteRequest, future) {
  if (future.v7_throwAbortReason && request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(method + "() call aborted: " + request.method + " " + request.url);
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? Array.from(opts.body.entries()).reduce((acc, _ref5) => {
        let [name, value] = _ref5;
        return "" + acc + name + "=" + value + "\n";
      }, "") : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json3 = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json: json3,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData === "function", "FormData is not available in this environment");
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return {
      path,
      submission
    };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex(m => m.route.id === boundaryId);
    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isInitialLoad, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let boundaryId = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[0] : void 0;
  let boundaryMatches = boundaryId ? getLoaderMatchesUntilBoundary(matches, boundaryId) : matches;
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
  let navigationMatches = boundaryMatches.filter((match, index) => {
    let {
      route
    } = match;
    if (route.lazy) {
      return true;
    }
    if (route.loader == null) {
      return false;
    }
    if (isInitialLoad) {
      if (typeof route.loader !== "function" || route.loader.hydrate) {
        return true;
      }
      return state.loaderData[route.id] === void 0 && (!state.errors || state.errors[route.id] === void 0);
    }
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some(id => id === match.route.id)) {
      return true;
    }
    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      actionStatus,
      defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    if (isInitialLoad || !matches.some(m => m.route.id === f.routeId) || deletedFetchers.has(key)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key);
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let shouldRevalidate = false;
    if (fetchRedirectIds.has(key)) {
      shouldRevalidate = false;
    } else if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      shouldRevalidate = true;
    } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
      shouldRevalidate = isRevalidationRequired;
    } else {
      shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params
      }, submission, {
        actionResult,
        actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      }));
    }
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = !currentMatch || match.route.id !== currentMatch.route.id;
  let isMissingData = currentLoaderData[match.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return currentMatch.pathname !== match.pathname || currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"];
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
async function loadLazyRouteChildren(patchRoutesOnNavigationImpl, path, matches, routes, manifest, mapRouteProperties, pendingRouteChildren, signal) {
  let key = [path, ...matches.map(m => m.route.id)].join("-");
  try {
    let pending = pendingRouteChildren.get(key);
    if (!pending) {
      pending = patchRoutesOnNavigationImpl({
        path,
        matches,
        patch: (routeId, children) => {
          if (!signal.aborted) {
            patchRoutesImpl(routeId, children, routes, manifest, mapRouteProperties);
          }
        }
      });
      pendingRouteChildren.set(key, pending);
    }
    if (pending && isPromise(pending)) {
      await pending;
    }
  } finally {
    pendingRouteChildren.delete(key);
  }
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties) {
  if (routeId) {
    var _route$children;
    let route = manifest[routeId];
    invariant(route, "No route found to patch children into: routeId = " + routeId);
    let dataChildren = convertRoutesToDataRoutes(children, mapRouteProperties, [routeId, "patch", String(((_route$children = route.children) == null ? void 0 : _route$children.length) || "0")], manifest);
    if (route.children) {
      route.children.push(...dataChildren);
    } else {
      route.children = dataChildren;
    }
  } else {
    let dataChildren = convertRoutesToDataRoutes(children, mapRouteProperties, ["patch", String(routesToUse.length || "0")], manifest);
    routesToUse.push(...dataChildren);
  }
}
async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== void 0 && lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  Object.assign(routeToUpdate, routeUpdates);
  Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
    lazy: void 0
  }));
}
async function defaultDataStrategy(_ref6) {
  let {
    matches
  } = _ref6;
  let matchesToLoad = matches.filter(m => m.shouldLoad);
  let results = await Promise.all(matchesToLoad.map(m => m.resolve()));
  return results.reduce((acc, result, i) => Object.assign(acc, {
    [matchesToLoad[i].route.id]: result
  }), {});
}
async function callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties, requestContext) {
  let loadRouteDefinitionsPromises = matches.map(m => m.route.lazy ? loadLazyRouteModule(m.route, mapRouteProperties, manifest) : void 0);
  let dsMatches = matches.map((match, i) => {
    let loadRoutePromise = loadRouteDefinitionsPromises[i];
    let shouldLoad = matchesToLoad.some(m => m.route.id === match.route.id);
    let resolve = async handlerOverride => {
      if (handlerOverride && request.method === "GET" && (match.route.lazy || match.route.loader)) {
        shouldLoad = true;
      }
      return shouldLoad ? callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, requestContext) : Promise.resolve({
        type: ResultType.data,
        result: void 0
      });
    };
    return _extends({}, match, {
      shouldLoad,
      resolve
    });
  });
  let results = await dataStrategyImpl({
    matches: dsMatches,
    request,
    params: matches[0].params,
    fetcherKey,
    context: requestContext
  });
  try {
    await Promise.all(loadRouteDefinitionsPromises);
  } catch (e) {}
  return results;
}
async function callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, staticContext) {
  let result;
  let onReject;
  let runHandler = handler => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = ctx => {
      if (typeof handler !== "function") {
        return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + type + '" [routeId: ' + match.route.id + "]")));
      }
      return handler({
        request,
        params: match.params,
        context: staticContext
      }, ...(ctx !== void 0 ? [ctx] : []));
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride(ctx => actualHandler(ctx)) : actualHandler());
        return {
          type: "data",
          result: val
        };
      } catch (e) {
        return {
          type: "error",
          result: e
        };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (loadRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([runHandler(handler).catch(e => {
          handlerError = e;
        }), loadRoutePromise]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await loadRoutePromise;
        handler = match.route[type];
        if (handler) {
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return {
            type: ResultType.data,
            result: void 0
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
    invariant(result.result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    return {
      type: ResultType.error,
      result: e
    };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let {
    result,
    type
  } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      let contentType = result.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data2 = null;
        } else {
          data2 = await result.json();
        }
      } else {
        data2 = await result.text();
      }
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
    if (type === ResultType.error) {
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === ResultType.error) {
    if (isDataWithResponseInit(result)) {
      var _result$init2;
      if (result.data instanceof Error) {
        var _result$init;
        return {
          type: ResultType.error,
          error: result.data,
          statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status
        };
      }
      result = new ErrorResponseImpl(((_result$init2 = result.init) == null ? void 0 : _result$init2.status) || 500, void 0, result.data);
    }
    return {
      type: ResultType.error,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDeferredData(result)) {
    var _result$init3, _result$init4;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init3 = result.init) == null ? void 0 : _result$init3.status,
      headers: ((_result$init4 = result.init) == null ? void 0 : _result$init4.headers) && new Headers(result.init.headers)
    };
  }
  if (isDataWithResponseInit(result)) {
    var _result$init5, _result$init6;
    return {
      type: ResultType.data,
      data: result.data,
      statusCode: (_result$init5 = result.init) == null ? void 0 : _result$init5.status,
      headers: (_result$init6 = result.init) != null && _result$init6.headers ? new Headers(result.init.headers) : void 0
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
  let location = response.headers.get("Location");
  invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
  if (!ABSOLUTE_URL_REGEX.test(location)) {
    let trimmedMatches = matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1);
    location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (ABSOLUTE_URL_REGEX.test(location)) {
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({
        "Content-Type": formEncType
      });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach(match => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      loaderData[id] = void 0;
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
        if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      } else {
        loaderData[id] = result.data;
        if (result.statusCode && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = {
      [pendingActionResult[0]]: pendingError
    };
    loaderData[pendingActionResult[0]] = void 0;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, false);
  revalidatingFetchers.forEach(rf => {
    let {
      key,
      match,
      controller
    } = rf;
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (controller && controller.signal.aborted) {
      return;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  });
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id)) {
      if (newLoaderData[id] !== void 0) {
        mergedLoaderData[id] = newLoaderData[id];
      }
    } else if (loaderData[id] !== void 0 && match.route.loader) {
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find(r => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp5) {
  let {
    pathname,
    routeId,
    method,
    type,
    message
  } = _temp5 === void 0 ? {} : _temp5;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (type === "route-discovery") {
      errorMessage = 'Unable to match URL "' + pathname + '" - the `unstable_patchRoutesOnNavigation()` ' + ("function threw the following error:\n" + message);
    } else if (method && pathname && routeId) {
      errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = 'No route matches URL "' + pathname + '"';
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
    }
  }
  return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return {
        key,
        result
      };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function isPromise(val) {
  return typeof val === "object" && val != null && "then" in val;
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === ResultType.data || result.type === ResultType.error);
}
function isRedirectDataStrategyResultResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }
  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveNavigationDeferredResults(matches, results, signal, currentMatches, currentLoaderData) {
  let entries = Object.entries(results);
  for (let index = 0; index < entries.length; index++) {
    let [routeId, result] = entries[index];
    let match = matches.find(m => (m == null ? void 0 : m.route.id) === routeId);
    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find(m => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
    if (isDeferredResult(result) && isRevalidatingLoader) {
      await resolveDeferredData(result, signal, false).then(result2 => {
        if (result2) {
          results[routeId] = result2;
        }
      });
    }
  }
}
async function resolveFetcherDeferredResults(matches, results, revalidatingFetchers) {
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      routeId,
      controller
    } = revalidatingFetchers[index];
    let result = results[key];
    let match = matches.find(m => (m == null ? void 0 : m.route.id) === routeId);
    if (!match) {
      continue;
    }
    if (isDeferredResult(result)) {
      invariant(controller, "Expected an AbortController for revalidating fetcher deferred result");
      await resolveDeferredData(result, controller.signal, true).then(result2 => {
        if (result2) {
          results[key] = result2;
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(v => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json: json3
  } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json3 !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: json3,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
    if (sessionPositions) {
      let json3 = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json3 || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {}
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json3 = {};
    for (let [k, v] of transitions) {
      json3[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json3));
    } catch (error) {
      warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
    }
  }
}
/**
 * @remix-run/router v1.19.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
};

code(module, require);
_exports(module.exports);
}}});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9AcmVtaXgtcnVuL3JvdXRlci4xLjE5LjIuanMiLCIuLi9ub2RlX21vZHVsZXMvQHJlbWl4LXJ1bi9yb3V0ZXIvaGlzdG9yeS50cyIsIi4uL25vZGVfbW9kdWxlcy9AcmVtaXgtcnVuL3JvdXRlci91dGlscy50cyIsIi4uL25vZGVfbW9kdWxlcy9AcmVtaXgtcnVuL3JvdXRlci9yb3V0ZXIudHMiXSwibmFtZXMiOlsicm91dGVyXzFfMTlfMl9leHBvcnRzIiwiX19leHBvcnQiLCJBYm9ydGVkRGVmZXJyZWRFcnJvciIsIkFjdGlvbiIsIklETEVfQkxPQ0tFUiIsIklETEVfRkVUQ0hFUiIsIklETEVfTkFWSUdBVElPTiIsIlVOU0FGRV9ERUZFUlJFRF9TWU1CT0wiLCJVTlNBRkVfRGVmZXJyZWREYXRhIiwiRGVmZXJyZWREYXRhIiwiVU5TQUZFX0Vycm9yUmVzcG9uc2VJbXBsIiwiRXJyb3JSZXNwb25zZUltcGwiLCJVTlNBRkVfY29udmVydFJvdXRlTWF0Y2hUb1VpTWF0Y2giLCJjb252ZXJ0Um91dGVNYXRjaFRvVWlNYXRjaCIsIlVOU0FGRV9jb252ZXJ0Um91dGVzVG9EYXRhUm91dGVzIiwiY29udmVydFJvdXRlc1RvRGF0YVJvdXRlcyIsIlVOU0FGRV9kZWNvZGVQYXRoIiwiZGVjb2RlUGF0aCIsIlVOU0FGRV9nZXRSZXNvbHZlVG9NYXRjaGVzIiwiZ2V0UmVzb2x2ZVRvTWF0Y2hlcyIsIlVOU0FGRV9pbnZhcmlhbnQiLCJpbnZhcmlhbnQiLCJVTlNBRkVfd2FybmluZyIsIndhcm5pbmciLCJjcmVhdGVCcm93c2VySGlzdG9yeSIsImNyZWF0ZUhhc2hIaXN0b3J5IiwiY3JlYXRlTWVtb3J5SGlzdG9yeSIsImNyZWF0ZVBhdGgiLCJjcmVhdGVSb3V0ZXIiLCJjcmVhdGVTdGF0aWNIYW5kbGVyIiwiZGVmZXIiLCJnZW5lcmF0ZVBhdGgiLCJnZXRTdGF0aWNDb250ZXh0RnJvbUVycm9yIiwiZ2V0VG9QYXRobmFtZSIsImlzRGF0YVdpdGhSZXNwb25zZUluaXQiLCJpc0RlZmVycmVkRGF0YSIsImlzUm91dGVFcnJvclJlc3BvbnNlIiwiam9pblBhdGhzIiwianNvbiIsIm1hdGNoUGF0aCIsIm1hdGNoUm91dGVzIiwibm9ybWFsaXplUGF0aG5hbWUiLCJwYXJzZVBhdGgiLCJyZWRpcmVjdCIsInJlZGlyZWN0RG9jdW1lbnQiLCJyZXBsYWNlIiwicmVzb2x2ZVBhdGgiLCJyZXNvbHZlVG8iLCJzdHJpcEJhc2VuYW1lIiwidW5zdGFibGVfZGF0YSIsImRhdGEiLCJtb2R1bGUiLCJleHBvcnRzIiwiX190b0NvbW1vbkpTIiwiQWN0aW9uMiIsIlBvcFN0YXRlRXZlbnRUeXBlIiwib3B0aW9ucyIsImluaXRpYWxFbnRyaWVzIiwiaW5pdGlhbEluZGV4IiwidjVDb21wYXQiLCJlbnRyaWVzIiwibWFwIiwiZW50cnkiLCJpbmRleDIiLCJjcmVhdGVNZW1vcnlMb2NhdGlvbiIsInN0YXRlIiwiaW5kZXgiLCJjbGFtcEluZGV4IiwibGVuZ3RoIiwiYWN0aW9uIiwiUG9wIiwibGlzdGVuZXIiLCJuIiwiTWF0aCIsIm1pbiIsIm1heCIsImdldEN1cnJlbnRMb2NhdGlvbiIsInRvIiwia2V5IiwibG9jYXRpb24iLCJjcmVhdGVMb2NhdGlvbiIsInBhdGhuYW1lIiwiY2hhckF0IiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWF0ZUhyZWYiLCJoaXN0b3J5IiwiY3JlYXRlVVJMIiwiVVJMIiwiZW5jb2RlTG9jYXRpb24iLCJwYXRoIiwic2VhcmNoIiwiaGFzaCIsInB1c2giLCJQdXNoIiwibmV4dExvY2F0aW9uIiwic3BsaWNlIiwiZGVsdGEiLCJSZXBsYWNlIiwiZ28iLCJuZXh0SW5kZXgiLCJsaXN0ZW4iLCJmbiIsImNyZWF0ZUJyb3dzZXJMb2NhdGlvbiIsIndpbmRvdzIiLCJnbG9iYWxIaXN0b3J5IiwidXNyIiwiY3JlYXRlQnJvd3NlckhyZWYiLCJnZXRVcmxCYXNlZEhpc3RvcnkiLCJjcmVhdGVIYXNoTG9jYXRpb24iLCJzdWJzdHIiLCJzdGFydHNXaXRoIiwiY3JlYXRlSGFzaEhyZWYiLCJiYXNlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaHJlZiIsImdldEF0dHJpYnV0ZSIsInVybCIsImhhc2hJbmRleCIsImluZGV4T2YiLCJzbGljZSIsInZhbGlkYXRlSGFzaExvY2F0aW9uIiwidmFsdWUiLCJtZXNzYWdlIiwiRXJyb3IiLCJjb25kIiwiY29uc29sZSIsIndhcm4iLCJlIiwiY3JlYXRlS2V5IiwicmFuZG9tIiwidG9TdHJpbmciLCJnZXRIaXN0b3J5U3RhdGUiLCJpZHgiLCJjdXJyZW50IiwiX2V4dGVuZHMiLCJfcmVmIiwicGFyc2VkUGF0aCIsInNlYXJjaEluZGV4IiwiZ2V0TG9jYXRpb24iLCJ2YWxpZGF0ZUxvY2F0aW9uIiwid2luZG93IiwiZGVmYXVsdFZpZXciLCJnZXRJbmRleCIsInJlcGxhY2VTdGF0ZSIsImhhbmRsZVBvcCIsImhpc3RvcnlTdGF0ZSIsInB1c2hTdGF0ZSIsImVycm9yIiwiRE9NRXhjZXB0aW9uIiwibmFtZSIsImFzc2lnbiIsInJlcGxhY2UyIiwib3JpZ2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJSZXN1bHRUeXBlIiwiUmVzdWx0VHlwZTIiLCJpbW11dGFibGVSb3V0ZUtleXMiLCJTZXQiLCJpc0luZGV4Um91dGUiLCJyb3V0ZSIsInJvdXRlcyIsIm1hcFJvdXRlUHJvcGVydGllcyIsInBhcmVudFBhdGgiLCJtYW5pZmVzdCIsInRyZWVQYXRoIiwiU3RyaW5nIiwiaWQiLCJqb2luIiwiY2hpbGRyZW4iLCJpbmRleFJvdXRlIiwicGF0aE9yTGF5b3V0Um91dGUiLCJsb2NhdGlvbkFyZyIsImJhc2VuYW1lIiwibWF0Y2hSb3V0ZXNJbXBsIiwiYWxsb3dQYXJ0aWFsIiwiYnJhbmNoZXMiLCJmbGF0dGVuUm91dGVzIiwicmFua1JvdXRlQnJhbmNoZXMiLCJtYXRjaGVzIiwiaSIsImRlY29kZWQiLCJtYXRjaFJvdXRlQnJhbmNoIiwibWF0Y2giLCJsb2FkZXJEYXRhIiwicGFyYW1zIiwiaGFuZGxlIiwicGFyZW50c01ldGEiLCJmbGF0dGVuUm91dGUiLCJyZWxhdGl2ZVBhdGgiLCJtZXRhIiwiY2FzZVNlbnNpdGl2ZSIsImNoaWxkcmVuSW5kZXgiLCJyb3V0ZXNNZXRhIiwiY29uY2F0Iiwic2NvcmUiLCJjb21wdXRlU2NvcmUiLCJmb3JFYWNoIiwiX3JvdXRlJHBhdGgiLCJpbmNsdWRlcyIsImV4cGxvZGVkIiwiZXhwbG9kZU9wdGlvbmFsU2VnbWVudHMiLCJzZWdtZW50cyIsInNwbGl0IiwiZmlyc3QiLCJyZXN0IiwiaXNPcHRpb25hbCIsImVuZHNXaXRoIiwicmVxdWlyZWQiLCJyZXN0RXhwbG9kZWQiLCJyZXN1bHQiLCJzdWJwYXRoIiwic29ydCIsImEiLCJiIiwiY29tcGFyZUluZGV4ZXMiLCJwYXJhbVJlIiwiZHluYW1pY1NlZ21lbnRWYWx1ZSIsImluZGV4Um91dGVWYWx1ZSIsImVtcHR5U2VnbWVudFZhbHVlIiwic3RhdGljU2VnbWVudFZhbHVlIiwic3BsYXRQZW5hbHR5IiwiaXNTcGxhdCIsInMiLCJpbml0aWFsU2NvcmUiLCJzb21lIiwiZmlsdGVyIiwicmVkdWNlIiwic2VnbWVudCIsInRlc3QiLCJzaWJsaW5ncyIsImV2ZXJ5IiwiYnJhbmNoIiwibWF0Y2hlZFBhcmFtcyIsIm1hdGNoZWRQYXRobmFtZSIsImVuZCIsInJlbWFpbmluZ1BhdGhuYW1lIiwiT2JqZWN0IiwicGF0aG5hbWVCYXNlIiwib3JpZ2luYWxQYXRoIiwicHJlZml4IiwicCIsImFycmF5IiwiaXNMYXN0U2VnbWVudCIsInN0YXIiLCJrZXlNYXRjaCIsIm9wdGlvbmFsIiwicGFyYW0iLCJwYXR0ZXJuIiwibWF0Y2hlciIsImNvbXBpbGVkUGFyYW1zIiwiY29tcGlsZVBhdGgiLCJjYXB0dXJlR3JvdXBzIiwibWVtbyIsInBhcmFtTmFtZSIsInNwbGF0VmFsdWUiLCJyZWdleHBTb3VyY2UiLCJfIiwiUmVnRXhwIiwidiIsImRlY29kZVVSSUNvbXBvbmVudCIsInRvTG93ZXJDYXNlIiwic3RhcnRJbmRleCIsIm5leHRDaGFyIiwiZnJvbVBhdGhuYW1lIiwidG9QYXRobmFtZSIsInJlc29sdmVQYXRobmFtZSIsIm5vcm1hbGl6ZVNlYXJjaCIsIm5vcm1hbGl6ZUhhc2giLCJyZWxhdGl2ZVNlZ21lbnRzIiwicG9wIiwiZ2V0SW52YWxpZFBhdGhFcnJvciIsImNoYXIiLCJmaWVsZCIsImRlc3QiLCJnZXRQYXRoQ29udHJpYnV0aW5nTWF0Y2hlcyIsInY3X3JlbGF0aXZlU3BsYXRQYXRoIiwicGF0aE1hdGNoZXMiLCJ0b0FyZyIsInJvdXRlUGF0aG5hbWVzIiwibG9jYXRpb25QYXRobmFtZSIsImlzUGF0aFJlbGF0aXZlIiwiaXNFbXB0eVBhdGgiLCJmcm9tIiwicm91dGVQYXRobmFtZUluZGV4IiwidG9TZWdtZW50cyIsInNoaWZ0IiwiaGFzRXhwbGljaXRUcmFpbGluZ1NsYXNoIiwiaGFzQ3VycmVudFRyYWlsaW5nU2xhc2giLCJwYXRocyIsImpzb24yIiwiZGF0YTIiLCJpbml0IiwicmVzcG9uc2VJbml0Iiwic3RhdHVzIiwiaGVhZGVycyIsIkhlYWRlcnMiLCJoYXMiLCJzZXQiLCJSZXNwb25zZSIsIkRhdGFXaXRoUmVzcG9uc2VJbml0IiwiY29uc3RydWN0b3IiLCJ0eXBlIiwicGVuZGluZ0tleXNTZXQiLCJzdWJzY3JpYmVycyIsImRlZmVycmVkS2V5cyIsIkFycmF5IiwiaXNBcnJheSIsInJlamVjdCIsImFib3J0UHJvbWlzZSIsIlByb21pc2UiLCJyIiwiY29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsIm9uQWJvcnQiLCJ1bmxpc3RlbkFib3J0U2lnbmFsIiwic2lnbmFsIiwiYWNjIiwiX3JlZjIiLCJ0cmFja1Byb21pc2UiLCJkb25lIiwiYWRkIiwicHJvbWlzZSIsInJhY2UiLCJ0aGVuIiwib25TZXR0bGUiLCJjYXRjaCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiYWJvcnRlZCIsImRlbGV0ZSIsInVuZGVmaW5lZEVycm9yIiwiZW1pdCIsInNldHRsZWRLZXkiLCJzdWJzY3JpYmVyIiwic3Vic2NyaWJlIiwiY2FuY2VsIiwiYWJvcnQiLCJrIiwicmVzb2x2ZURhdGEiLCJyZXNvbHZlIiwiYWJvcnRlZDIiLCJzaXplIiwidW53cmFwcGVkRGF0YSIsIl9yZWYzIiwidW53cmFwVHJhY2tlZFByb21pc2UiLCJwZW5kaW5nS2V5cyIsImlzVHJhY2tlZFByb21pc2UiLCJfdHJhY2tlZCIsIl9lcnJvciIsIl9kYXRhIiwiZGVmZXIyIiwicmVkaXJlY3QyIiwicmVzcG9uc2UiLCJzdGF0dXNUZXh0IiwiaW50ZXJuYWwiLCJ2YWxpZE11dGF0aW9uTWV0aG9kc0FyciIsInZhbGlkTXV0YXRpb25NZXRob2RzIiwidmFsaWRSZXF1ZXN0TWV0aG9kc0FyciIsInZhbGlkUmVxdWVzdE1ldGhvZHMiLCJyZWRpcmVjdFN0YXR1c0NvZGVzIiwicmVkaXJlY3RQcmVzZXJ2ZU1ldGhvZFN0YXR1c0NvZGVzIiwiZm9ybU1ldGhvZCIsImZvcm1BY3Rpb24iLCJmb3JtRW5jVHlwZSIsImZvcm1EYXRhIiwidGV4dCIsInByb2NlZWQiLCJyZXNldCIsIkFCU09MVVRFX1VSTF9SRUdFWCIsImRlZmF1bHRNYXBSb3V0ZVByb3BlcnRpZXMiLCJoYXNFcnJvckJvdW5kYXJ5IiwiQm9vbGVhbiIsIlRSQU5TSVRJT05TX1NUT1JBR0VfS0VZIiwicm91dGVyV2luZG93IiwiaXNCcm93c2VyIiwiY3JlYXRlRWxlbWVudCIsImlzU2VydmVyIiwiZGV0ZWN0RXJyb3JCb3VuZGFyeSIsImRhdGFSb3V0ZXMiLCJpbkZsaWdodERhdGFSb3V0ZXMiLCJkYXRhU3RyYXRlZ3lJbXBsIiwidW5zdGFibGVfZGF0YVN0cmF0ZWd5IiwiZGVmYXVsdERhdGFTdHJhdGVneSIsInBhdGNoUm91dGVzT25OYXZpZ2F0aW9uSW1wbCIsInVuc3RhYmxlX3BhdGNoUm91dGVzT25OYXZpZ2F0aW9uIiwiZnV0dXJlIiwidjdfZmV0Y2hlclBlcnNpc3QiLCJ2N19ub3JtYWxpemVGb3JtTWV0aG9kIiwidjdfcGFydGlhbEh5ZHJhdGlvbiIsInY3X3ByZXBlbmRCYXNlbmFtZSIsInY3X3NraXBBY3Rpb25FcnJvclJldmFsaWRhdGlvbiIsInVubGlzdGVuSGlzdG9yeSIsImRpc2NvdmVyZWRSb3V0ZXNNYXhTaXplIiwiZGlzY292ZXJlZFJvdXRlcyIsInNhdmVkU2Nyb2xsUG9zaXRpb25zIiwiZ2V0U2Nyb2xsUmVzdG9yYXRpb25LZXkiLCJnZXRTY3JvbGxQb3NpdGlvbiIsImluaXRpYWxTY3JvbGxSZXN0b3JlZCIsImh5ZHJhdGlvbkRhdGEiLCJpbml0aWFsTWF0Y2hlcyIsImluaXRpYWxFcnJvcnMiLCJnZXRJbnRlcm5hbFJvdXRlckVycm9yIiwiZ2V0U2hvcnRDaXJjdWl0TWF0Y2hlcyIsImZvZ09mV2FyIiwiY2hlY2tGb2dPZldhciIsImFjdGl2ZSIsImluaXRpYWxpemVkIiwibSIsImxhenkiLCJsb2FkZXIiLCJlcnJvcnMiLCJpc1JvdXRlSW5pdGlhbGl6ZWQiLCJoeWRyYXRlIiwiZmluZEluZGV4Iiwicm91dGVyIiwiaGlzdG9yeUFjdGlvbiIsIm5hdmlnYXRpb24iLCJyZXN0b3JlU2Nyb2xsUG9zaXRpb24iLCJwcmV2ZW50U2Nyb2xsUmVzZXQiLCJyZXZhbGlkYXRpb24iLCJhY3Rpb25EYXRhIiwiZmV0Y2hlcnMiLCJNYXAiLCJibG9ja2VycyIsInBlbmRpbmdBY3Rpb24iLCJwZW5kaW5nUHJldmVudFNjcm9sbFJlc2V0IiwicGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyIiwicGVuZGluZ1ZpZXdUcmFuc2l0aW9uRW5hYmxlZCIsImFwcGxpZWRWaWV3VHJhbnNpdGlvbnMiLCJyZW1vdmVQYWdlSGlkZUV2ZW50TGlzdGVuZXIiLCJpc1VuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb24iLCJpc1JldmFsaWRhdGlvblJlcXVpcmVkIiwiY2FuY2VsbGVkRGVmZXJyZWRSb3V0ZXMiLCJjYW5jZWxsZWRGZXRjaGVyTG9hZHMiLCJmZXRjaENvbnRyb2xsZXJzIiwiaW5jcmVtZW50aW5nTG9hZElkIiwicGVuZGluZ05hdmlnYXRpb25Mb2FkSWQiLCJmZXRjaFJlbG9hZElkcyIsImZldGNoUmVkaXJlY3RJZHMiLCJmZXRjaExvYWRNYXRjaGVzIiwiYWN0aXZlRmV0Y2hlcnMiLCJkZWxldGVkRmV0Y2hlcnMiLCJhY3RpdmVEZWZlcnJlZHMiLCJibG9ja2VyRnVuY3Rpb25zIiwicGVuZGluZ1BhdGNoUm91dGVzIiwidW5ibG9ja0Jsb2NrZXJIaXN0b3J5VXBkYXRlIiwiaW5pdGlhbGl6ZSIsImJsb2NrZXJLZXkiLCJzaG91bGRCbG9ja05hdmlnYXRpb24iLCJjdXJyZW50TG9jYXRpb24iLCJuZXh0SGlzdG9yeVVwZGF0ZVByb21pc2UiLCJ1cGRhdGVCbG9ja2VyIiwidXBkYXRlU3RhdGUiLCJzdGFydE5hdmlnYXRpb24iLCJyZXN0b3JlQXBwbGllZFRyYW5zaXRpb25zIiwiX3NhdmVBcHBsaWVkVHJhbnNpdGlvbnMiLCJwZXJzaXN0QXBwbGllZFRyYW5zaXRpb25zIiwiaW5pdGlhbEh5ZHJhdGlvbiIsImRpc3Bvc2UiLCJjbGVhciIsImRlbGV0ZUZldGNoZXIiLCJkZWxldGVCbG9ja2VyIiwibmV3U3RhdGUiLCJvcHRzIiwiY29tcGxldGVkRmV0Y2hlcnMiLCJkZWxldGVkRmV0Y2hlcnNLZXlzIiwiZmV0Y2hlciIsInVuc3RhYmxlX3ZpZXdUcmFuc2l0aW9uT3B0cyIsInZpZXdUcmFuc2l0aW9uT3B0cyIsInVuc3RhYmxlX2ZsdXNoU3luYyIsImZsdXNoU3luYyIsImNvbXBsZXRlTmF2aWdhdGlvbiIsIl90ZW1wIiwiX2xvY2F0aW9uJHN0YXRlIiwiX2xvY2F0aW9uJHN0YXRlMiIsImlzQWN0aW9uUmVsb2FkIiwiaXNNdXRhdGlvbk1ldGhvZCIsIl9pc1JlZGlyZWN0Iiwia2V5cyIsIm1lcmdlTG9hZGVyRGF0YSIsInByaW9yUGF0aHMiLCJ0b1BhdGhzIiwiZ2V0U2F2ZWRTY3JvbGxQb3NpdGlvbiIsIm5hdmlnYXRlIiwibm9ybWFsaXplZFBhdGgiLCJub3JtYWxpemVUbyIsImZyb21Sb3V0ZUlkIiwicmVsYXRpdmUiLCJzdWJtaXNzaW9uIiwibm9ybWFsaXplTmF2aWdhdGVPcHRpb25zIiwidXNlclJlcGxhY2UiLCJwZW5kaW5nRXJyb3IiLCJlbmFibGVWaWV3VHJhbnNpdGlvbiIsInVuc3RhYmxlX3ZpZXdUcmFuc2l0aW9uIiwicmV2YWxpZGF0ZSIsImludGVycnVwdEFjdGl2ZUxvYWRzIiwic3RhcnRVbmludGVycnVwdGVkUmV2YWxpZGF0aW9uIiwib3ZlcnJpZGVOYXZpZ2F0aW9uIiwic2F2ZVNjcm9sbFBvc2l0aW9uIiwicm91dGVzVG9Vc2UiLCJsb2FkaW5nTmF2aWdhdGlvbiIsIm5vdEZvdW5kTWF0Y2hlcyIsImhhbmRsZU5hdmlnYXRpb25hbDQwNCIsImlzSGFzaENoYW5nZU9ubHkiLCJyZXF1ZXN0IiwiY3JlYXRlQ2xpZW50U2lkZVJlcXVlc3QiLCJwZW5kaW5nQWN0aW9uUmVzdWx0IiwiZmluZE5lYXJlc3RCb3VuZGFyeSIsImFjdGlvblJlc3VsdCIsImhhbmRsZUFjdGlvbiIsInNob3J0Q2lyY3VpdGVkIiwicm91dGVJZCIsImlzRXJyb3JSZXN1bHQiLCJnZXRMb2FkaW5nTmF2aWdhdGlvbiIsInVwZGF0ZWRNYXRjaGVzIiwiaGFuZGxlTG9hZGVycyIsImZldGNoZXJTdWJtaXNzaW9uIiwiZ2V0QWN0aW9uRGF0YUZvckNvbW1pdCIsImlzRm9nT2ZXYXIiLCJnZXRTdWJtaXR0aW5nTmF2aWdhdGlvbiIsImRpc2NvdmVyUmVzdWx0IiwiZGlzY292ZXJSb3V0ZXMiLCJib3VuZGFyeUlkIiwiaGFuZGxlRGlzY292ZXJSb3V0ZUVycm9yIiwicGFydGlhbE1hdGNoZXMiLCJhY3Rpb25NYXRjaCIsImdldFRhcmdldE1hdGNoIiwibWV0aG9kIiwicmVzdWx0cyIsImNhbGxEYXRhU3RyYXRlZ3kiLCJpc1JlZGlyZWN0UmVzdWx0IiwibG9jYXRpb24yIiwibm9ybWFsaXplUmVkaXJlY3RMb2NhdGlvbiIsInN0YXJ0UmVkaXJlY3ROYXZpZ2F0aW9uIiwiaXNEZWZlcnJlZFJlc3VsdCIsImJvdW5kYXJ5TWF0Y2giLCJhY3RpdmVTdWJtaXNzaW9uIiwiZ2V0U3VibWlzc2lvbkZyb21OYXZpZ2F0aW9uIiwic2hvdWxkVXBkYXRlTmF2aWdhdGlvblN0YXRlIiwiZ2V0VXBkYXRlZEFjdGlvbkRhdGEiLCJtYXRjaGVzVG9Mb2FkIiwicmV2YWxpZGF0aW5nRmV0Y2hlcnMiLCJnZXRNYXRjaGVzVG9Mb2FkIiwiY2FuY2VsQWN0aXZlRGVmZXJyZWRzIiwidXBkYXRlZEZldGNoZXJzMiIsIm1hcmtGZXRjaFJlZGlyZWN0c0RvbmUiLCJ1cGRhdGVzIiwiZ2V0VXBkYXRlZFJldmFsaWRhdGluZ0ZldGNoZXJzIiwicmYiLCJhYm9ydEZldGNoZXIiLCJhYm9ydFBlbmRpbmdGZXRjaFJldmFsaWRhdGlvbnMiLCJmIiwibG9hZGVyUmVzdWx0cyIsImZldGNoZXJSZXN1bHRzIiwiY2FsbExvYWRlcnNBbmRNYXliZVJlc29sdmVEYXRhIiwicmVkaXJlY3QzIiwiZmluZFJlZGlyZWN0IiwicHJvY2Vzc0xvYWRlckRhdGEiLCJkZWZlcnJlZERhdGEiLCJ1cGRhdGVkRmV0Y2hlcnMiLCJkaWRBYm9ydEZldGNoTG9hZHMiLCJhYm9ydFN0YWxlRmV0Y2hMb2FkcyIsInNob3VsZFVwZGF0ZUZldGNoZXJzIiwicmV2YWxpZGF0aW5nRmV0Y2hlciIsImdldExvYWRpbmdGZXRjaGVyIiwiZmV0Y2giLCJzZXRGZXRjaGVyRXJyb3IiLCJoYW5kbGVGZXRjaGVyQWN0aW9uIiwiaGFuZGxlRmV0Y2hlckxvYWRlciIsInJlcXVlc3RNYXRjaGVzIiwiZGV0ZWN0QW5kSGFuZGxlNDA1RXJyb3IiLCJleGlzdGluZ0ZldGNoZXIiLCJ1cGRhdGVGZXRjaGVyU3RhdGUiLCJnZXRTdWJtaXR0aW5nRmV0Y2hlciIsImFib3J0Q29udHJvbGxlciIsImZldGNoUmVxdWVzdCIsIm9yaWdpbmF0aW5nTG9hZElkIiwiYWN0aW9uUmVzdWx0cyIsImdldERvbmVGZXRjaGVyIiwicmV2YWxpZGF0aW9uUmVxdWVzdCIsImxvYWRJZCIsImxvYWRGZXRjaGVyIiwic3RhbGVLZXkiLCJleGlzdGluZ0ZldGNoZXIyIiwiZG9uZUZldGNoZXIiLCJyZXNvbHZlRGVmZXJyZWREYXRhIiwiaXNOYXZpZ2F0aW9uIiwiX3RlbXAyIiwicmVkaXJlY3RMb2NhdGlvbiIsImlzRG9jdW1lbnRSZWxvYWQiLCJyZWRpcmVjdEhpc3RvcnlBY3Rpb24iLCJzdGF0ZTIiLCJmZXRjaGVyS2V5IiwiZGF0YVJlc3VsdHMiLCJjYWxsRGF0YVN0cmF0ZWd5SW1wbCIsImlzUmVkaXJlY3REYXRhU3RyYXRlZ3lSZXN1bHRSZXN1bHQiLCJub3JtYWxpemVSZWxhdGl2ZVJvdXRpbmdSZWRpcmVjdFJlc3BvbnNlIiwiY29udmVydERhdGFTdHJhdGVneVJlc3VsdFRvRGF0YVJlc3VsdCIsImZldGNoZXJzVG9Mb2FkIiwiY3VycmVudE1hdGNoZXMiLCJsb2FkZXJSZXN1bHRzUHJvbWlzZSIsImZldGNoZXJSZXN1bHRzUHJvbWlzZSIsImFsbCIsInJlc29sdmVOYXZpZ2F0aW9uRGVmZXJyZWRSZXN1bHRzIiwicmVzb2x2ZUZldGNoZXJEZWZlcnJlZFJlc3VsdHMiLCJnZXRGZXRjaGVyIiwiZGVsZXRlRmV0Y2hlckFuZFVwZGF0ZVN0YXRlIiwiY291bnQiLCJtYXJrRmV0Y2hlcnNEb25lIiwiZG9uZUtleXMiLCJsYW5kZWRJZCIsInllZXRlZEtleXMiLCJnZXRCbG9ja2VyIiwiYmxvY2tlciIsIm5ld0Jsb2NrZXIiLCJfcmVmNCIsImJsb2NrZXJGdW5jdGlvbiIsInByZWRpY2F0ZSIsImNhbmNlbGxlZFJvdXRlSWRzIiwiZGZkIiwiZW5hYmxlU2Nyb2xsUmVzdG9yYXRpb24iLCJwb3NpdGlvbnMiLCJnZXRQb3NpdGlvbiIsImdldEtleSIsInkiLCJnZXRTY3JvbGxLZXkiLCJmb2dNYXRjaGVzIiwiaXNOb25ITVIiLCJsb2FkTGF6eVJvdXRlQ2hpbGRyZW4iLCJuZXdNYXRjaGVzIiwiYWRkVG9GaWZvUXVldWUiLCJuZXdQYXJ0aWFsTWF0Y2hlcyIsInF1ZXVlIiwidmFsdWVzIiwibmV4dCIsIl9pbnRlcm5hbFNldFJvdXRlcyIsIm5ld1JvdXRlcyIsInBhdGNoUm91dGVzIiwicGF0Y2hSb3V0ZXNJbXBsIiwiX2ludGVybmFsRmV0Y2hDb250cm9sbGVycyIsIl9pbnRlcm5hbEFjdGl2ZURlZmVycmVkcyIsIlN5bWJvbCIsInY3X3Rocm93QWJvcnRSZWFzb24iLCJxdWVyeSIsIl90ZW1wMyIsInJlcXVlc3RDb250ZXh0Iiwic2tpcExvYWRlckVycm9yQnViYmxpbmciLCJpc1ZhbGlkTWV0aG9kIiwibWV0aG9kTm90QWxsb3dlZE1hdGNoZXMiLCJzdGF0dXNDb2RlIiwibG9hZGVySGVhZGVycyIsImFjdGlvbkhlYWRlcnMiLCJxdWVyeUltcGwiLCJpc1Jlc3BvbnNlIiwicXVlcnlSb3V0ZSIsIl90ZW1wNCIsImZpbmQiLCJfcmVzdWx0JGFjdGl2ZURlZmVycmUiLCJyb3V0ZU1hdGNoIiwicmVzdWx0MiIsInN1Ym1pdCIsImxvYWRSb3V0ZURhdGEiLCJpc0RhdGFTdHJhdGVneVJlc3VsdCIsImlzUmVkaXJlY3RSZXNwb25zZSIsImlzUm91dGVSZXF1ZXN0IiwidGhyb3dTdGF0aWNIYW5kbGVyQWJvcnRlZEVycm9yIiwiTG9jYXRpb24iLCJsb2FkZXJSZXF1ZXN0IiwiUmVxdWVzdCIsImNvbnRleHQyIiwiY29udGV4dCIsImdldExvYWRlck1hdGNoZXNVbnRpbEJvdW5kYXJ5IiwicHJvY2Vzc1JvdXRlTG9hZGVyRGF0YSIsImV4ZWN1dGVkTG9hZGVycyIsImZyb21FbnRyaWVzIiwibmV3Q29udGV4dCIsIl9kZWVwZXN0UmVuZGVyZWRCb3VuZGFyeUlkIiwicmVhc29uIiwiaXNTdWJtaXNzaW9uTmF2aWdhdGlvbiIsImJvZHkiLCJwcmVwZW5kQmFzZW5hbWUiLCJjb250ZXh0dWFsTWF0Y2hlcyIsImFjdGl2ZVJvdXRlTWF0Y2giLCJoYXNOYWtlZEluZGV4UXVlcnkiLCJub3JtYWxpemVGb3JtTWV0aG9kIiwiaXNGZXRjaGVyIiwiZ2V0SW52YWxpZEJvZHlFcnJvciIsInJhd0Zvcm1NZXRob2QiLCJ0b1VwcGVyQ2FzZSIsInN0cmlwSGFzaEZyb21QYXRoIiwiRm9ybURhdGEiLCJVUkxTZWFyY2hQYXJhbXMiLCJfcmVmNSIsImpzb24zIiwicGFyc2UiLCJzZWFyY2hQYXJhbXMiLCJjb252ZXJ0Rm9ybURhdGFUb1NlYXJjaFBhcmFtcyIsImNvbnZlcnRTZWFyY2hQYXJhbXNUb0Zvcm1EYXRhIiwiYXBwZW5kIiwiYm91bmRhcnlNYXRjaGVzIiwiaXNJbml0aWFsTG9hZCIsInNraXBBY3Rpb25FcnJvclJldmFsaWRhdGlvbiIsImN1cnJlbnRVcmwiLCJuZXh0VXJsIiwiYWN0aW9uU3RhdHVzIiwic2hvdWxkU2tpcFJldmFsaWRhdGlvbiIsIm5hdmlnYXRpb25NYXRjaGVzIiwiaXNOZXdMb2FkZXIiLCJjdXJyZW50Um91dGVNYXRjaCIsIm5leHRSb3V0ZU1hdGNoIiwic2hvdWxkUmV2YWxpZGF0ZUxvYWRlciIsImN1cnJlbnRQYXJhbXMiLCJuZXh0UGFyYW1zIiwiZGVmYXVsdFNob3VsZFJldmFsaWRhdGUiLCJpc05ld1JvdXRlSW5zdGFuY2UiLCJmZXRjaGVyTWF0Y2hlcyIsImZldGNoZXJNYXRjaCIsInNob3VsZFJldmFsaWRhdGUiLCJjdXJyZW50TG9hZGVyRGF0YSIsImN1cnJlbnRNYXRjaCIsImlzTmV3IiwiaXNNaXNzaW5nRGF0YSIsImN1cnJlbnRQYXRoIiwibG9hZGVyTWF0Y2giLCJhcmciLCJyb3V0ZUNob2ljZSIsInBlbmRpbmdSb3V0ZUNoaWxkcmVuIiwicGVuZGluZyIsInBhdGNoIiwiaXNQcm9taXNlIiwiX3JvdXRlJGNoaWxkcmVuIiwiZGF0YUNoaWxkcmVuIiwibG9hZExhenlSb3V0ZU1vZHVsZSIsImxhenlSb3V0ZSIsInJvdXRlVG9VcGRhdGUiLCJyb3V0ZVVwZGF0ZXMiLCJsYXp5Um91dGVQcm9wZXJ0eSIsInN0YXRpY1JvdXRlVmFsdWUiLCJpc1Byb3BlcnR5U3RhdGljYWxseURlZmluZWQiLCJfcmVmNiIsInNob3VsZExvYWQiLCJsb2FkUm91dGVEZWZpbml0aW9uc1Byb21pc2VzIiwiZHNNYXRjaGVzIiwibG9hZFJvdXRlUHJvbWlzZSIsImhhbmRsZXJPdmVycmlkZSIsImNhbGxMb2FkZXJPckFjdGlvbiIsInN0YXRpY0NvbnRleHQiLCJvblJlamVjdCIsInJ1bkhhbmRsZXIiLCJoYW5kbGVyIiwiYWN0dWFsSGFuZGxlciIsImN0eCIsImhhbmRsZXJQcm9taXNlIiwidmFsIiwiaGFuZGxlckVycm9yIiwiZGF0YVN0cmF0ZWd5UmVzdWx0IiwiY29udGVudFR5cGUiLCJfcmVzdWx0JGluaXQyIiwiX3Jlc3VsdCRpbml0IiwiX3Jlc3VsdCRpbml0MyIsIl9yZXN1bHQkaW5pdDQiLCJkZWZlcnJlZCIsIl9yZXN1bHQkaW5pdDUiLCJfcmVzdWx0JGluaXQ2IiwidHJpbW1lZE1hdGNoZXMiLCJub3JtYWxpemVkTG9jYXRpb24iLCJwcm90b2NvbCIsImlzU2FtZUJhc2VuYW1lIiwiZm91bmRFcnJvciIsIm5ld0xvYWRlckRhdGEiLCJtZXJnZWRMb2FkZXJEYXRhIiwiaGFzT3duUHJvcGVydHkiLCJlbGlnaWJsZU1hdGNoZXMiLCJyZXZlcnNlIiwiX3RlbXA1IiwiZXJyb3JNZXNzYWdlIiwiaXNSZXZhbGlkYXRpbmdMb2FkZXIiLCJ1bndyYXAiLCJnZXRBbGwiLCJfd2luZG93IiwidHJhbnNpdGlvbnMiLCJzZXNzaW9uUG9zaXRpb25zIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEscUJBQUE7QUFBQUMsUUFBQSxDQUFBRCxxQkFBQTtFQUFBRSxvQkFBQSxFQUFBQSxDQUFBLEtBQUFBLG9CQUFBO0VBQUFDLE1BQUEsRUFBQUEsQ0FBQSxLQUFBQSxNQUFBO0VBQUFDLFlBQUEsRUFBQUEsQ0FBQSxLQUFBQSxZQUFBO0VBQUFDLFlBQUEsRUFBQUEsQ0FBQSxLQUFBQSxZQUFBO0VBQUFDLGVBQUEsRUFBQUEsQ0FBQSxLQUFBQSxlQUFBO0VBQUFDLHNCQUFBLEVBQUFBLENBQUEsS0FBQUEsc0JBQUE7RUFBQUMsbUJBQUEsRUFB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QUEsQ0FBV3JjLElBQUE7SUFDakIwVSxJQUFBLEVBQU0ySCxVQUFBLENBQVczSCxJQUFBO0lBQ2pCOVQsSUFBQSxFQUFNNGdCLGVBQUEsR0FBa0JBLGVBQUEsQ0FBZ0I1Z0IsSUFBQSxHQUFPOztFQUVqRCxPQUFPbWEsT0FBQTtBQUNUO0FBRUEsU0FBU2dILGVBQWVoUyxLQUFBLEVBQXFCO0VBQzNDLElBQUlnTCxPQUFBLEdBQWlDO0lBQ25DcFosS0FBQSxFQUFPO0lBQ1AyUyxVQUFBLEVBQVk7SUFDWkMsVUFBQSxFQUFZO0lBQ1pDLFdBQUEsRUFBYTtJQUNiQyxRQUFBLEVBQVU7SUFDVnpVLElBQUEsRUFBTTtJQUNOMFUsSUFBQSxFQUFNO0lBQ045VCxJQUFBLEVBQUFtUDs7RUFFRixPQUFPZ0wsT0FBQTtBQUNUO0FBRUEsU0FBU1osMEJBQ1BxVSxPQUFBLEVBQ0FDLFdBQUEsRUFBcUM7RUFFckMsSUFBSTtJQUNGLElBQUlDLGdCQUFBLEdBQW1CRixPQUFBLENBQVFHLGNBQUEsQ0FBZUMsT0FBQSxDQUM1QzNaLHVCQUF1QjtJQUV6QixJQUFJeVosZ0JBQUEsRUFBa0I7TUFDcEIsSUFBSXhGLEtBQUEsR0FBT3JtQixJQUFBLENBQUtzbUIsS0FBQSxDQUFNdUYsZ0JBQWdCO01BQ3RDLFNBQVMsQ0FBQzViLENBQUEsRUFBRy9FLENBQUMsS0FBS3RCLE1BQUEsQ0FBT25MLE9BQUEsQ0FBUTRuQixLQUFBLElBQVEsRUFBRSxHQUFHO1FBQzdDLElBQUluYixDQUFBLElBQUsrQyxLQUFBLENBQU1DLE9BQUEsQ0FBUWhELENBQUMsR0FBRztVQUN6QjBnQixXQUFBLENBQVluZSxHQUFBLENBQUl3QyxDQUFBLEVBQUcsSUFBSXBMLEdBQUEsQ0FBSXFHLENBQUEsSUFBSyxFQUFFLENBQUM7UUFDcEM7TUFDRjtJQUNGO1dBQ01wSSxDQUFBLEVBQVAsQ0FDQTtBQUVKO0FBRUEsU0FBUzBVLDBCQUNQbVUsT0FBQSxFQUNBQyxXQUFBLEVBQXFDO0VBRXJDLElBQUlBLFdBQUEsQ0FBWXZiLElBQUEsR0FBTyxHQUFHO0lBQ3hCLElBQUlnVyxLQUFBLEdBQWlDO0lBQ3JDLFNBQVMsQ0FBQ3BXLENBQUEsRUFBRy9FLENBQUMsS0FBSzBnQixXQUFBLEVBQWE7TUFDOUJ2RixLQUFBLENBQUtwVyxDQUFBLElBQUssQ0FBQyxHQUFHL0UsQ0FBQztJQUNoQjtJQUNELElBQUk7TUFDRnlnQixPQUFBLENBQVFHLGNBQUEsQ0FBZUUsT0FBQSxDQUNyQjVaLHVCQUFBLEVBQ0FwUyxJQUFBLENBQUtDLFNBQUEsQ0FBVW9tQixLQUFJLENBQUM7YUFFZm5pQixLQUFBLEVBQVA7TUFDQTlILE9BQUEsQ0FDRSxPQUM4RCxnRUFBQThILEtBQUEsR0FBSyxJQUFJO0lBRTFFO0VBQ0Y7QUFDSCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiL2NsaWVudC9vdXQifQ==