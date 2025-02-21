import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import nodeCrypto from 'node:crypto';
import { promises, existsSync } from 'node:fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'node:path';
import getURL from 'requrl';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults$1 = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults$1, ...options };
  } else {
    options = defaults$1;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

const subtle = nodeCrypto.webcrypto?.subtle || {};
const randomUUID = () => {
  return nodeCrypto.randomUUID();
};
const getRandomValues = (array) => {
  return nodeCrypto.webcrypto.getRandomValues(array);
};
const _crypto = {
  randomUUID,
  getRandomValues,
  subtle
};

// src/utils.ts
var alphabetByEncoding = {};
var alphabetByValue = Array.from({ length: 64 });
for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  alphabetByEncoding[char] = i;
  alphabetByValue[i] = char;
}
for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  const index = i + 26;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
for (let i = 0; i < 10; i++) {
  alphabetByEncoding[i.toString(10)] = i + 52;
  const char = i.toString(10);
  const index = i + 52;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
alphabetByEncoding["-"] = 62;
alphabetByValue[62] = "-";
alphabetByEncoding["_"] = 63;
alphabetByValue[63] = "_";
var bitsPerLetter = 6;
var bitsPerByte = 8;
var maxLetterValue = 63;
var stringToBuffer = (value) => {
  return new TextEncoder().encode(value);
};
var bufferToString = (value) => {
  return new TextDecoder().decode(value);
};
var base64urlDecode = (_input) => {
  const input = _input + "=".repeat((4 - _input.length % 4) % 4);
  let totalByteLength = input.length / 4 * 3;
  if (input.endsWith("==")) {
    totalByteLength -= 2;
  } else if (input.endsWith("=")) {
    totalByteLength--;
  }
  const out = new ArrayBuffer(totalByteLength);
  const dataView = new DataView(out);
  for (let i = 0; i < input.length; i += 4) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = i + 3; j <= limit; j++) {
      if (input[j] === "=") {
        bits >>= bitsPerLetter;
      } else {
        if (!(input[j] in alphabetByEncoding)) {
          throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
        }
        bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;
        bitLength += bitsPerLetter;
      }
    }
    const chunkOffset = i / 4 * 3;
    bits >>= bitLength % bitsPerByte;
    const byteLength = Math.floor(bitLength / bitsPerByte);
    for (let k = 0; k < byteLength; k++) {
      const offset = (byteLength - k - 1) * bitsPerByte;
      dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);
    }
  }
  return new Uint8Array(out);
};
var base64urlEncode = (_input) => {
  const input = typeof _input === "string" ? stringToBuffer(_input) : _input;
  let str = "";
  for (let i = 0; i < input.length; i += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
      bits |= input[j] << (limit - j - 1) * bitsPerByte;
      bitLength += bitsPerByte;
    }
    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k = 1; k <= bitClusterCount; k++) {
      const offset = (bitClusterCount - k) * bitsPerLetter;
      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
    }
  }
  return str;
};

// src/index.ts
var defaults = {
  encryption: { saltBits: 256, algorithm: "aes-256-cbc", iterations: 1, minPasswordlength: 32 },
  integrity: { saltBits: 256, algorithm: "sha256", iterations: 1, minPasswordlength: 32 },
  ttl: 0,
  timestampSkewSec: 60,
  localtimeOffsetMsec: 0
};
var clone = (options) => ({
  ...options,
  encryption: { ...options.encryption },
  integrity: { ...options.integrity }
});
var algorithms = {
  "aes-128-ctr": { keyBits: 128, ivBits: 128, name: "AES-CTR" },
  "aes-256-cbc": { keyBits: 256, ivBits: 128, name: "AES-CBC" },
  sha256: { keyBits: 256, name: "SHA-256" }
};
var macPrefix = "Fe26.2";
var randomBytes = (_crypto, size) => {
  const bytes = new Uint8Array(size);
  _crypto.getRandomValues(bytes);
  return bytes;
};
var randomBits = (_crypto, bits) => {
  if (bits < 1)
    throw new Error("Invalid random bits count");
  const bytes = Math.ceil(bits / 8);
  return randomBytes(_crypto, bytes);
};
var pbkdf2 = async (_crypto, password, salt, iterations, keyLength, hash) => {
  const passwordBuffer = stringToBuffer(password);
  const importedKey = await _crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const saltBuffer = stringToBuffer(salt);
  const params = { name: "PBKDF2", hash, salt: saltBuffer, iterations };
  const derivation = await _crypto.subtle.deriveBits(params, importedKey, keyLength * 8);
  return derivation;
};
var generateKey = async (_crypto, password, options) => {
  var _a;
  if (!(password == null ? void 0 : password.length))
    throw new Error("Empty password");
  if (options == null || typeof options !== "object")
    throw new Error("Bad options");
  if (!(options.algorithm in algorithms))
    throw new Error(`Unknown algorithm: ${options.algorithm}`);
  const algorithm = algorithms[options.algorithm];
  const result = {};
  const hmac = (_a = options.hmac) != null ? _a : false;
  const id = hmac ? { name: "HMAC", hash: algorithm.name } : { name: algorithm.name };
  const usage = hmac ? ["sign", "verify"] : ["encrypt", "decrypt"];
  if (typeof password === "string") {
    if (password.length < options.minPasswordlength)
      throw new Error(
        `Password string too short (min ${options.minPasswordlength} characters required)`
      );
    let { salt = "" } = options;
    if (!salt) {
      const { saltBits = 0 } = options;
      if (!saltBits)
        throw new Error("Missing salt and saltBits options");
      const randomSalt = randomBits(_crypto, saltBits);
      salt = [...new Uint8Array(randomSalt)].map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    const derivedKey = await pbkdf2(
      _crypto,
      password,
      salt,
      options.iterations,
      algorithm.keyBits / 8,
      "SHA-1"
    );
    const importedEncryptionKey = await _crypto.subtle.importKey(
      "raw",
      derivedKey,
      id,
      false,
      usage
    );
    result.key = importedEncryptionKey;
    result.salt = salt;
  } else {
    if (password.length < algorithm.keyBits / 8)
      throw new Error("Key buffer (password) too small");
    result.key = await _crypto.subtle.importKey("raw", password, id, false, usage);
    result.salt = "";
  }
  if (options.iv)
    result.iv = options.iv;
  else if ("ivBits" in algorithm)
    result.iv = randomBits(_crypto, algorithm.ivBits);
  return result;
};
var getEncryptParams = (algorithm, key, data) => {
  return [
    algorithm === "aes-128-ctr" ? { name: "AES-CTR", counter: key.iv, length: 128 } : { name: "AES-CBC", iv: key.iv },
    key.key,
    typeof data === "string" ? stringToBuffer(data) : data
  ];
};
var encrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const encrypted = await _crypto.subtle.encrypt(...getEncryptParams(options.algorithm, key, data));
  return { encrypted: new Uint8Array(encrypted), key };
};
var decrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const decrypted = await _crypto.subtle.decrypt(...getEncryptParams(options.algorithm, key, data));
  return bufferToString(new Uint8Array(decrypted));
};
var hmacWithPassword = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, { ...options, hmac: true });
  const textBuffer = stringToBuffer(data);
  const signed = await _crypto.subtle.sign({ name: "HMAC" }, key.key, textBuffer);
  const digest = base64urlEncode(new Uint8Array(signed));
  return { digest, salt: key.salt };
};
var normalizePassword = (password) => {
  if (typeof password === "string" || password instanceof Uint8Array)
    return { encryption: password, integrity: password };
  if ("secret" in password)
    return { id: password.id, encryption: password.secret, integrity: password.secret };
  return { id: password.id, encryption: password.encryption, integrity: password.integrity };
};
var seal = async (_crypto, object, password, options) => {
  if (!password)
    throw new Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const objectString = JSON.stringify(object);
  const pass = normalizePassword(password);
  const { id = "", encryption, integrity } = pass;
  if (id && !/^\w+$/.test(id))
    throw new Error("Invalid password id");
  const { encrypted, key } = await encrypt(_crypto, encryption, opts.encryption, objectString);
  const encryptedB64 = base64urlEncode(new Uint8Array(encrypted));
  const iv = base64urlEncode(key.iv);
  const expiration = opts.ttl ? now + opts.ttl : "";
  const macBaseString = `${macPrefix}*${id}*${key.salt}*${iv}*${encryptedB64}*${expiration}`;
  const mac = await hmacWithPassword(_crypto, integrity, opts.integrity, macBaseString);
  const sealed = `${macBaseString}*${mac.salt}*${mac.digest}`;
  return sealed;
};
var fixedTimeComparison = (a, b) => {
  let mismatch = a.length === b.length ? 0 : 1;
  if (mismatch)
    b = a;
  for (let i = 0; i < a.length; i += 1)
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
};
var unseal = async (_crypto, sealed, password, options) => {
  if (!password)
    throw new Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const parts = sealed.split("*");
  if (parts.length !== 8)
    throw new Error("Incorrect number of sealed components");
  const prefix = parts[0];
  let passwordId = parts[1];
  const encryptionSalt = parts[2];
  const encryptionIv = parts[3];
  const encryptedB64 = parts[4];
  const expiration = parts[5];
  const hmacSalt = parts[6];
  const hmac = parts[7];
  const macBaseString = `${prefix}*${passwordId}*${encryptionSalt}*${encryptionIv}*${encryptedB64}*${expiration}`;
  if (macPrefix !== prefix)
    throw new Error("Wrong mac prefix");
  if (expiration) {
    if (!/^\d+$/.test(expiration))
      throw new Error("Invalid expiration");
    const exp = Number.parseInt(expiration, 10);
    if (exp <= now - opts.timestampSkewSec * 1e3)
      throw new Error("Expired seal");
  }
  let pass = "";
  passwordId = passwordId || "default";
  if (typeof password === "string" || password instanceof Uint8Array)
    pass = password;
  else if (passwordId in password) {
    pass = password[passwordId];
  } else {
    throw new Error(`Cannot find password: ${passwordId}`);
  }
  pass = normalizePassword(pass);
  const macOptions = opts.integrity;
  macOptions.salt = hmacSalt;
  const mac = await hmacWithPassword(_crypto, pass.integrity, macOptions, macBaseString);
  if (!fixedTimeComparison(mac.digest, hmac))
    throw new Error("Bad hmac value");
  const encrypted = base64urlDecode(encryptedB64);
  const decryptOptions = opts.encryption;
  decryptOptions.salt = encryptionSalt;
  decryptOptions.iv = base64urlDecode(encryptionIv);
  const decrypted = await decrypt(_crypto, pass.encryption, decryptOptions, encrypted);
  if (decrypted)
    return JSON.parse(decrypted);
  return null;
};

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== undefined) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== undefined) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== undefined) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, undefined, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
const getHeaders = getRequestHeaders;
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(undefined);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return undefined;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== undefined) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
const appendHeader = appendResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => undefined);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== undefined) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

const getSessionPromise = Symbol("getSession");
const DEFAULT_NAME = "h3";
const DEFAULT_COOKIE = {
  path: "/",
  secure: true,
  httpOnly: true
};
async function useSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  await getSession(event, config);
  const sessionManager = {
    get id() {
      return event.context.sessions?.[sessionName]?.id;
    },
    get data() {
      return event.context.sessions?.[sessionName]?.data || {};
    },
    update: async (update) => {
      if (!isEvent(event)) {
        throw new Error("[h3] Cannot update read-only session.");
      }
      await updateSession(event, config, update);
      return sessionManager;
    },
    clear: () => {
      if (!isEvent(event)) {
        throw new Error("[h3] Cannot clear read-only session.");
      }
      clearSession(event, config);
      return Promise.resolve(sessionManager);
    }
  };
  return sessionManager;
}
async function getSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (!event.context.sessions) {
    event.context.sessions = /* @__PURE__ */ Object.create(null);
  }
  const existingSession = event.context.sessions[sessionName];
  if (existingSession) {
    return existingSession[getSessionPromise] || existingSession;
  }
  const session = {
    id: "",
    createdAt: 0,
    data: /* @__PURE__ */ Object.create(null)
  };
  event.context.sessions[sessionName] = session;
  let sealedSession;
  if (config.sessionHeader !== false) {
    const headerName = typeof config.sessionHeader === "string" ? config.sessionHeader.toLowerCase() : `x-${sessionName.toLowerCase()}-session`;
    const headerValue = _getReqHeader(event, headerName);
    if (typeof headerValue === "string") {
      sealedSession = headerValue;
    }
  }
  if (!sealedSession) {
    const cookieHeader = _getReqHeader(event, "cookie");
    if (cookieHeader) {
      sealedSession = parse(cookieHeader + "")[sessionName];
    }
  }
  if (sealedSession) {
    const promise = unsealSession(event, config, sealedSession).catch(() => {
    }).then((unsealed) => {
      Object.assign(session, unsealed);
      delete event.context.sessions[sessionName][getSessionPromise];
      return session;
    });
    event.context.sessions[sessionName][getSessionPromise] = promise;
    await promise;
  }
  if (!session.id) {
    if (!isEvent(event)) {
      throw new Error(
        "Cannot initialize a new session. Make sure using `useSession(event)` in main handler."
      );
    }
    session.id = config.generateId?.() ?? (config.crypto || _crypto).randomUUID();
    session.createdAt = Date.now();
    await updateSession(event, config);
  }
  return session;
}
function _getReqHeader(event, name) {
  if (event.node) {
    return event.node?.req.headers[name];
  }
  if (event.request) {
    return event.request.headers?.get(name);
  }
  if (event.headers) {
    return event.headers.get(name);
  }
}
async function updateSession(event, config, update) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession(event, config);
  if (typeof update === "function") {
    update = update(session.data);
  }
  if (update) {
    Object.assign(session.data, update);
  }
  if (config.cookie !== false) {
    const sealed = await sealSession(event, config);
    setCookie(event, sessionName, sealed, {
      ...DEFAULT_COOKIE,
      expires: config.maxAge ? new Date(session.createdAt + config.maxAge * 1e3) : undefined,
      ...config.cookie
    });
  }
  return session;
}
async function sealSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession(event, config);
  const sealed = await seal(config.crypto || _crypto, session, config.password, {
    ...defaults,
    ttl: config.maxAge ? config.maxAge * 1e3 : 0,
    ...config.seal
  });
  return sealed;
}
async function unsealSession(_event, config, sealed) {
  const unsealed = await unseal(
    config.crypto || _crypto,
    sealed,
    config.password,
    {
      ...defaults,
      ttl: config.maxAge ? config.maxAge * 1e3 : 0,
      ...config.seal
    }
  );
  if (config.maxAge) {
    const age = Date.now() - (unsealed.createdAt || Number.NEGATIVE_INFINITY);
    if (age > config.maxAge * 1e3) {
      throw new Error("Session expired!");
    }
  }
  return unsealed;
}
function clearSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (event.context.sessions?.[sessionName]) {
    delete event.context.sessions[sessionName];
  }
  setCookie(event, sessionName, "", {
    ...DEFAULT_COOKIE,
    ...config.cookie
  });
  return Promise.resolve();
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : undefined;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : undefined;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === undefined ? undefined : await val;
      if (_body !== undefined) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, undefined);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, undefined);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, undefined)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, undefined, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, undefined, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, undefined, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === undefined && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function pascalCase(str, opts) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(p.toLowerCase() )).join("") : "";
}
function camelCase(str, opts) {
  return lowerFirst(pascalCase(str || ""));
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {},
  "__swiper": {
    "bundled": true
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "05cd848f-4fb0-47e8-a5a0-fd92ebc6aa22",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "auth": {
      "computed": {
        "origin": "",
        "pathname": "/api/auth",
        "fullBaseUrl": "/api/auth"
      },
      "isEnabled": true,
      "disableServerSideAuth": false,
      "originEnvKey": "AUTH_ORIGIN",
      "sessionRefresh": {
        "enablePeriodically": 60000,
        "enableOnWindowFocus": true,
        "handler": ""
      },
      "globalAppMiddleware": false,
      "baseURL": "/api/auth",
      "provider": {
        "type": "authjs",
        "trustHost": false,
        "defaultProvider": "",
        "addDefaultCallbackUrl": true
      }
    },
    "fileStorage": {
      "mount": "/Users/janakshrestha/Documents/2024/09 September/himalayan_beads/public/uploads"
    },
    "mdi": {
      "defaultSize": "1rem"
    },
    "persistedState": {
      "storage": "cookies",
      "debug": false,
      "cookieOptions": {}
    }
  },
  "storage": "",
  "yourOrigin": "",
  "baseUrl": "",
  "authSecret": "",
  "session": {
    "name": "nuxt-session",
    "password": "9a60eec8f0aa44de9f7c2a45cc3abf8b",
    "cookie": {
      "sameSite": "lax"
    }
  },
  "hash": {
    "scrypt": {}
  },
  "webauthn": {
    "register": {},
    "authenticate": {}
  },
  "oauth": {
    "gitea": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": ""
    },
    "github": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "gitlab": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": "https://gitlab.com"
    },
    "spotify": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "google": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "twitch": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "auth0": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "audience": "",
      "redirectURL": ""
    },
    "workos": {
      "clientId": "",
      "clientSecret": "",
      "connectionId": "",
      "screenHint": "",
      "redirectURL": ""
    },
    "microsoft": {
      "clientId": "",
      "clientSecret": "",
      "tenant": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": "",
      "redirectURL": ""
    },
    "discord": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "battledotnet": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "bluesky": {
      "clientMetadataFilename": "",
      "clientName": "",
      "clientUri": "",
      "logoUri": "",
      "policyUri": "",
      "tosUri": "",
      "scope": [
        "atproto"
      ],
      "grantTypes": [
        "authorization_code"
      ],
      "responseTypes": [
        "code"
      ],
      "applicationType": "web",
      "redirectUris": [],
      "dpopBoundAccessTokens": true,
      "tokenEndpointAuthMethod": "none"
    },
    "keycloak": {
      "clientId": "",
      "clientSecret": "",
      "serverUrl": "",
      "serverUrlInternal": "",
      "realm": "",
      "redirectURL": ""
    },
    "linear": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "linkedin": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "cognito": {
      "clientId": "",
      "clientSecret": "",
      "region": "",
      "userPoolId": "",
      "redirectURL": ""
    },
    "facebook": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "instagram": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "paypal": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "steam": {
      "apiKey": "",
      "redirectURL": ""
    },
    "x": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "xsuaa": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "vk": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "yandex": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "tiktok": {
      "clientKey": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "dropbox": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "polar": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "zitadel": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "authentik": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "seznam": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "strava": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "hubspot": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "line": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "atlassian": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "apple": {
      "teamId": "",
      "keyId": "",
      "privateKey": "",
      "redirectURL": "",
      "clientId": ""
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === "undefined") {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/janakshrestha/Documents/2024/09 September/himalayan_beads/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const ERROR_MESSAGES = {
  NO_SECRET: "AUTH_NO_SECRET: No `secret` - this is an error in production, see https://sidebase.io/nuxt-auth/resources/errors. You can ignore this during development",
  NO_ORIGIN: "AUTH_NO_ORIGIN: No `origin` - this is an error in production, see https://sidebase.io/nuxt-auth/resources/errors. You can ignore this during development"
};

const isProduction = "production" === "production";
function useTypedBackendConfig(runtimeConfig, type) {
  const provider = runtimeConfig.public.auth.provider;
  if (provider.type === type) {
    return provider;
  }
  throw new Error("RuntimeError: Type must match at this point");
}

function defineNitroPlugin$1(def) {
  return def;
}

const sessionHooks = createHooks();
async function getUserSession(event) {
  const session = await _useSession(event);
  return {
    id: session.id,
    ...session.data
  };
}
async function clearUserSession(event, config) {
  const session = await _useSession(event, config);
  await sessionHooks.callHookParallel("clear", session.data, event);
  await session.clear();
  return true;
}
let sessionConfig;
function _useSession(event, config = {}) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(isEvent(event) ? event : void 0);
    const envSessionPassword = `${runtimeConfig.nitro?.envPrefix || "NUXT_"}SESSION_PASSWORD`;
    sessionConfig = defu({ password: process.env[envSessionPassword] }, runtimeConfig.session);
  }
  const finalConfig = defu(config, sessionConfig);
  return useSession(event, finalConfig);
}

function getServerOrigin(event) {
  const config = useRuntimeConfig();
  const envOriginKey = config.public.auth.originEnvKey;
  const envFromRuntimeConfig = extractFromRuntimeConfig(config, envOriginKey);
  const envOrigin = envFromRuntimeConfig ?? process.env[envOriginKey];
  if (envOrigin) {
    return envOrigin;
  }
  const runtimeConfigOrigin = config.public.auth.computed.origin;
  if (runtimeConfigOrigin) {
    return runtimeConfigOrigin;
  }
  if (event && !isProduction) {
    return getURL(event.node.req, false);
  }
  throw new Error(ERROR_MESSAGES.NO_ORIGIN);
}
function extractFromRuntimeConfig(config, envVariableName) {
  let normalized = envVariableName.startsWith("NUXT_") ? envVariableName.slice(5) : envVariableName;
  normalized = camelCase(normalized);
  const extracted = config[normalized];
  return typeof extracted === "string" ? extracted : void 0;
}

function defineNitroPlugin(def) {
  return def;
}
const _QDfO70MFGW = defineNitroPlugin(() => {
  try {
    getServerOrigin();
  } catch (error) {
    {
      throw error;
    }
  }
});

const _NHnVFzKRrS = defineNitroPlugin$1((nitroApp) => {
  if (process.env.NUXT_OAUTH_FACEBOOK_CLIENT_ID && process.env.NUXT_OAUTH_FACEBOOK_CLIENT_SECRET || process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_ID && process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_SECRET) {
    nitroApp.hooks.hook("render:html", (html) => {
      html.head.unshift(`
      <script>
        if (window.location.hash === "#_=_"){
          history.replaceState
              ? history.replaceState(null, null, window.location.href.split("#")[0])
              : window.location.hash = "";
        }
      <\/script>
    `);
    });
  }
});

const plugins = [
  _QDfO70MFGW,
_NHnVFzKRrS
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-4fa2U47oy9ZtR/T1VtrDIZ1+Xz8\"",
    "mtime": "2025-02-21T01:38:38.518Z",
    "size": 8196,
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2025-02-21T01:38:38.518Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1-rcg7GeeTSRscbqD9i0bNnzLlkvw\"",
    "mtime": "2025-02-21T01:38:38.519Z",
    "size": 1,
    "path": "../public/robots.txt"
  },
  "/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6f5-QZcwxBblCNCNZFXJ+GUjX8GE0d0\"",
    "mtime": "2025-02-21T01:38:38.519Z",
    "size": 1781,
    "path": "../public/style.css"
  },
  "/images/flag-us.png": {
    "type": "image/png",
    "etag": "\"14d-5yRyOfRzaHlN7H12SmHeKEOh2Jc\"",
    "mtime": "2025-02-21T01:38:38.426Z",
    "size": 333,
    "path": "../public/images/flag-us.png"
  },
  "/images/img01.png": {
    "type": "image/png",
    "etag": "\"d1241-hSb98UNFOtnofCYvbI5vEwmuGDk\"",
    "mtime": "2025-02-21T01:38:38.430Z",
    "size": 856641,
    "path": "../public/images/img01.png"
  },
  "/images/img02.png": {
    "type": "image/png",
    "etag": "\"6515d-Q8uYRvLPLVWy7V/JhgCl3Lg3l/w\"",
    "mtime": "2025-02-21T01:38:38.428Z",
    "size": 414045,
    "path": "../public/images/img02.png"
  },
  "/images/img03.png": {
    "type": "image/png",
    "etag": "\"2693d-KRUUsns8kn10aOINXALY4Lzwoak\"",
    "mtime": "2025-02-21T01:38:38.427Z",
    "size": 158013,
    "path": "../public/images/img03.png"
  },
  "/images/img04.png": {
    "type": "image/png",
    "etag": "\"2a323-SJc919V6aC+EhY5vojoHgjgrAlY\"",
    "mtime": "2025-02-21T01:38:38.516Z",
    "size": 172835,
    "path": "../public/images/img04.png"
  },
  "/images/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"10d5-CxSyiVtkO34BU1saGoi45VaAnSg\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 4309,
    "path": "../public/images/logo.svg"
  },
  "/images/logo01.png": {
    "type": "image/png",
    "etag": "\"12d0-nq2hLiLn9mD2OFq8fkJwO8duBZk\"",
    "mtime": "2025-02-21T01:38:38.430Z",
    "size": 4816,
    "path": "../public/images/logo01.png"
  },
  "/images/product01.png": {
    "type": "image/png",
    "etag": "\"94e7-4dCFu8RDllMeU9Ch8HW92HWGPRY\"",
    "mtime": "2025-02-21T01:38:38.427Z",
    "size": 38119,
    "path": "../public/images/product01.png"
  },
  "/images/product02.png": {
    "type": "image/png",
    "etag": "\"a1fa-Q+CWEOm9IYnF93p2N03OYCwZAD4\"",
    "mtime": "2025-02-21T01:38:38.428Z",
    "size": 41466,
    "path": "../public/images/product02.png"
  },
  "/images/product03.png": {
    "type": "image/png",
    "etag": "\"7e36-sg0WNGxCs7s3Fkij50ASf6damk4\"",
    "mtime": "2025-02-21T01:38:38.430Z",
    "size": 32310,
    "path": "../public/images/product03.png"
  },
  "/images/product04.png": {
    "type": "image/png",
    "etag": "\"2bc19-Hz8lJ8h0DUhewsexzFD9wQobTj0\"",
    "mtime": "2025-02-21T01:38:38.436Z",
    "size": 179225,
    "path": "../public/images/product04.png"
  },
  "/images/product05.png": {
    "type": "image/png",
    "etag": "\"2eeff-TFsDfG9lGSlxFGSsJg09tgnbijc\"",
    "mtime": "2025-02-21T01:38:38.430Z",
    "size": 192255,
    "path": "../public/images/product05.png"
  },
  "/images/product06.png": {
    "type": "image/png",
    "etag": "\"2072a-0nUNOAPo3jD4RUw5AaXTGEAuq8k\"",
    "mtime": "2025-02-21T01:38:38.430Z",
    "size": 132906,
    "path": "../public/images/product06.png"
  },
  "/fonts/ekmukta-bold.woff": {
    "type": "font/woff",
    "etag": "\"77f0-MrW9VZ3FKzcT9659+/nhegUoTXM\"",
    "mtime": "2025-02-21T01:38:38.426Z",
    "size": 30704,
    "path": "../public/fonts/ekmukta-bold.woff"
  },
  "/fonts/ekmukta-bold.woff2": {
    "type": "font/woff2",
    "etag": "\"5c8c-wlFsIim6PwHbj4OSr2+RNhyvQkQ\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 23692,
    "path": "../public/fonts/ekmukta-bold.woff2"
  },
  "/fonts/ekmukta-extrabold.woff": {
    "type": "font/woff",
    "etag": "\"7594-bYvgm5TaOGadZyRJ0Ff7qP9QlJk\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 30100,
    "path": "../public/fonts/ekmukta-extrabold.woff"
  },
  "/fonts/ekmukta-extrabold.woff2": {
    "type": "font/woff2",
    "etag": "\"5a38-/T0gebjANE8jD6cQ4TThLZ2XdoA\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 23096,
    "path": "../public/fonts/ekmukta-extrabold.woff2"
  },
  "/fonts/ekmukta-extralight.woff": {
    "type": "font/woff",
    "etag": "\"7628-7Z71vlpjOWcYXaOYf3Ar9Fgrxfw\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 30248,
    "path": "../public/fonts/ekmukta-extralight.woff"
  },
  "/fonts/ekmukta-extralight.woff2": {
    "type": "font/woff2",
    "etag": "\"5ba4-5ZUb96DDNCABRCJj+o4K/rLLevE\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 23460,
    "path": "../public/fonts/ekmukta-extralight.woff2"
  },
  "/fonts/ekmukta-light.woff": {
    "type": "font/woff",
    "etag": "\"785c-giS80sNaZtEND6y+FJbnw/zSk0g\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 30812,
    "path": "../public/fonts/ekmukta-light.woff"
  },
  "/fonts/ekmukta-light.woff2": {
    "type": "font/woff2",
    "etag": "\"5d20-tOOIwMTTTS+O5Rzf2qHoMBKsTxE\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 23840,
    "path": "../public/fonts/ekmukta-light.woff2"
  },
  "/fonts/ekmukta-medium.woff": {
    "type": "font/woff",
    "etag": "\"76b0-pt8iO5Degizb5bpbEQniFcffQgA\"",
    "mtime": "2025-02-21T01:38:38.431Z",
    "size": 30384,
    "path": "../public/fonts/ekmukta-medium.woff"
  },
  "/fonts/ekmukta-medium.woff2": {
    "type": "font/woff2",
    "etag": "\"5bc0-QlORWmq2youCx3+rd1GjInddnlc\"",
    "mtime": "2025-02-21T01:38:38.432Z",
    "size": 23488,
    "path": "../public/fonts/ekmukta-medium.woff2"
  },
  "/fonts/ekmukta-regular.woff": {
    "type": "font/woff",
    "etag": "\"781c-74wce1VQPqkXvI44Fx/GWWSJXmI\"",
    "mtime": "2025-02-21T01:38:38.436Z",
    "size": 30748,
    "path": "../public/fonts/ekmukta-regular.woff"
  },
  "/fonts/ekmukta-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5c50-jLrtYL+NATlQERgRHrw/IJkFSPE\"",
    "mtime": "2025-02-21T01:38:38.436Z",
    "size": 23632,
    "path": "../public/fonts/ekmukta-regular.woff2"
  },
  "/fonts/ekmukta-semibold-demo.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"c7c5-cff0g3OQ/IgwZinXCKhzJO+MtDE\"",
    "mtime": "2025-02-21T01:38:38.435Z",
    "size": 51141,
    "path": "../public/fonts/ekmukta-semibold-demo.html"
  },
  "/fonts/ekmukta-semibold.woff": {
    "type": "font/woff",
    "etag": "\"7754-DV5zsXVR8FwKPmc75GUi5uVaowg\"",
    "mtime": "2025-02-21T01:38:38.435Z",
    "size": 30548,
    "path": "../public/fonts/ekmukta-semibold.woff"
  },
  "/fonts/ekmukta-semibold.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-KQD/CHXCIOK5HAFpDuOrmLssi2I\"",
    "mtime": "2025-02-21T01:38:38.432Z",
    "size": 23516,
    "path": "../public/fonts/ekmukta-semibold.woff2"
  },
  "/fonts/icomoon.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"141c-KojSi/bjF/borFGGqyrCvZ4Aw+Y\"",
    "mtime": "2025-02-21T01:38:38.432Z",
    "size": 5148,
    "path": "../public/fonts/icomoon.eot"
  },
  "/fonts/icomoon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3f85-agdOpoS6Q53/J5OSPsNO0FoAU1I\"",
    "mtime": "2025-02-21T01:38:38.435Z",
    "size": 16261,
    "path": "../public/fonts/icomoon.svg"
  },
  "/fonts/icomoon.ttf": {
    "type": "font/ttf",
    "etag": "\"1378-BpSlMY3ywAZOiFxCYZW/L0cFA6s\"",
    "mtime": "2025-02-21T01:38:38.436Z",
    "size": 4984,
    "path": "../public/fonts/icomoon.ttf"
  },
  "/fonts/icomoon.woff": {
    "type": "font/woff",
    "etag": "\"13c4-dQplrtkdk4LsTgVsDlCM613Uwuk\"",
    "mtime": "2025-02-21T01:38:38.436Z",
    "size": 5060,
    "path": "../public/fonts/icomoon.woff"
  },
  "/uploads/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-Tipy0GuAF21+u0wX9VcDrQP7Hh0\"",
    "mtime": "2025-02-21T01:38:38.426Z",
    "size": 6148,
    "path": "../public/uploads/.DS_Store"
  },
  "/uploads/3tVJzNCQ.jpg": {
    "type": "image/jpeg",
    "etag": "\"287103-kiKVm0U7yN14SNxo+X1Xgjyzsdk\"",
    "mtime": "2025-02-21T01:38:38.504Z",
    "size": 2650371,
    "path": "../public/uploads/3tVJzNCQ.jpg"
  },
  "/uploads/6GjHTc3O.jpg": {
    "type": "image/jpeg",
    "etag": "\"234e56-KFWJVs/z/hklTGOBqSBT/V4vzuA\"",
    "mtime": "2025-02-21T01:38:38.465Z",
    "size": 2313814,
    "path": "../public/uploads/6GjHTc3O.jpg"
  },
  "/uploads/9taiRA1b.jpg": {
    "type": "image/jpeg",
    "etag": "\"24572a-9El/UXGkor4JsnxbFmfQ3g8L354\"",
    "mtime": "2025-02-21T01:38:38.473Z",
    "size": 2381610,
    "path": "../public/uploads/9taiRA1b.jpg"
  },
  "/uploads/EmGaYDCh.jpg": {
    "type": "image/jpeg",
    "etag": "\"22a3d3-qQyzONWDXVwmCDy+s6OrefYZPOA\"",
    "mtime": "2025-02-21T01:38:38.498Z",
    "size": 2270163,
    "path": "../public/uploads/EmGaYDCh.jpg"
  },
  "/uploads/KReHC2H6.jpg": {
    "type": "image/jpeg",
    "etag": "\"22cff7-9EnNfhDiexesuCYTUKT+1PrdbBA\"",
    "mtime": "2025-02-21T01:38:38.466Z",
    "size": 2281463,
    "path": "../public/uploads/KReHC2H6.jpg"
  },
  "/uploads/TMCbR1Xi.png": {
    "type": "image/png",
    "etag": "\"118f9-V0hVEdZVJr8/jwnjPnDDrmzYbFM\"",
    "mtime": "2025-02-21T01:38:38.476Z",
    "size": 71929,
    "path": "../public/uploads/TMCbR1Xi.png"
  },
  "/uploads/Wn4q9Vls.jpg": {
    "type": "image/jpeg",
    "etag": "\"22b47c-g5ODD3OfIyHVhZObA0cc7DhF0lQ\"",
    "mtime": "2025-02-21T01:38:38.515Z",
    "size": 2274428,
    "path": "../public/uploads/Wn4q9Vls.jpg"
  },
  "/uploads/a4hDQpA6.jpg": {
    "type": "image/jpeg",
    "etag": "\"210a22-mBAHjOAqusMMbP5XmIMcL480da8\"",
    "mtime": "2025-02-21T01:38:38.470Z",
    "size": 2165282,
    "path": "../public/uploads/a4hDQpA6.jpg"
  },
  "/uploads/a9l3eW7f.jpg": {
    "type": "image/jpeg",
    "etag": "\"20d1a6-jJPL1Fud5wyKEXmu0cppewBUZKE\"",
    "mtime": "2025-02-21T01:38:38.498Z",
    "size": 2150822,
    "path": "../public/uploads/a9l3eW7f.jpg"
  },
  "/uploads/iRrWWpRw.jpg": {
    "type": "image/jpeg",
    "etag": "\"227c72-EC28SWqDFtRrNmYa0HNJyqBxJwQ\"",
    "mtime": "2025-02-21T01:38:38.524Z",
    "size": 2260082,
    "path": "../public/uploads/iRrWWpRw.jpg"
  },
  "/uploads/jBdceiXt.jpg": {
    "type": "image/jpeg",
    "etag": "\"23b67a-NotEsvnaYqa0jpQRjOBXXw/QNPM\"",
    "mtime": "2025-02-21T01:38:38.505Z",
    "size": 2340474,
    "path": "../public/uploads/jBdceiXt.jpg"
  },
  "/uploads/rf7UxqjH.jpg": {
    "type": "image/jpeg",
    "etag": "\"23cf06-mSFaUHraeltrlb0e6UXYFZGiYGk\"",
    "mtime": "2025-02-21T01:38:38.523Z",
    "size": 2346758,
    "path": "../public/uploads/rf7UxqjH.jpg"
  },
  "/uploads/uoynfTiE.jpg": {
    "type": "image/jpeg",
    "etag": "\"23340b-S9MdLcAnUcPPAG7dsyq1yrQrroc\"",
    "mtime": "2025-02-21T01:38:38.513Z",
    "size": 2307083,
    "path": "../public/uploads/uoynfTiE.jpg"
  },
  "/uploads/z6ORcaJm.jpg": {
    "type": "image/jpeg",
    "etag": "\"41c1e-A7kCT/y74ZLuP/fo3XksuMJ7PlI\"",
    "mtime": "2025-02-21T01:38:38.510Z",
    "size": 269342,
    "path": "../public/uploads/z6ORcaJm.jpg"
  },
  "/_nuxt/9wfqB8ne.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54f-jo9y58OyPa7CKV5ElKIHXnMV4vA\"",
    "mtime": "2025-02-21T01:38:38.366Z",
    "size": 1359,
    "path": "../public/_nuxt/9wfqB8ne.js"
  },
  "/_nuxt/9wfqB8ne.js.map": {
    "type": "application/json",
    "etag": "\"bec-EKL6+mrTaikL0JNFFGa9zE0W2+s\"",
    "mtime": "2025-02-21T01:38:38.345Z",
    "size": 3052,
    "path": "../public/_nuxt/9wfqB8ne.js.map"
  },
  "/_nuxt/B3HNixBX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"176-+acyHCYonuHtUV4QejlCaaZG9Qk\"",
    "mtime": "2025-02-21T01:38:38.298Z",
    "size": 374,
    "path": "../public/_nuxt/B3HNixBX.js"
  },
  "/_nuxt/B3HNixBX.js.map": {
    "type": "application/json",
    "etag": "\"215-33OrsrvXZsE36ulg3Btu9ZRFzI0\"",
    "mtime": "2025-02-21T01:38:38.298Z",
    "size": 533,
    "path": "../public/_nuxt/B3HNixBX.js.map"
  },
  "/_nuxt/BD13MmOs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1eb-0A8G8otb5UC/HJ3p1R54IgDqZRA\"",
    "mtime": "2025-02-21T01:38:38.298Z",
    "size": 491,
    "path": "../public/_nuxt/BD13MmOs.js"
  },
  "/_nuxt/BD13MmOs.js.map": {
    "type": "application/json",
    "etag": "\"70f-J8qJXzwE5GdgbEMejIItKrHFf1w\"",
    "mtime": "2025-02-21T01:38:38.298Z",
    "size": 1807,
    "path": "../public/_nuxt/BD13MmOs.js.map"
  },
  "/_nuxt/BGCt0VFZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d3-3d9PhxoI6OI/oidRX7NANRRls+c\"",
    "mtime": "2025-02-21T01:38:38.299Z",
    "size": 979,
    "path": "../public/_nuxt/BGCt0VFZ.js"
  },
  "/_nuxt/BGCt0VFZ.js.map": {
    "type": "application/json",
    "etag": "\"54a-fEkGZ2yGSz836vtkXLQHubwnKEI\"",
    "mtime": "2025-02-21T01:38:38.298Z",
    "size": 1354,
    "path": "../public/_nuxt/BGCt0VFZ.js.map"
  },
  "/_nuxt/BHYUjHuD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"130-Y1yu0ABKosV4uqQCToeBtwli/cg\"",
    "mtime": "2025-02-21T01:38:38.298Z",
    "size": 304,
    "path": "../public/_nuxt/BHYUjHuD.js"
  },
  "/_nuxt/BHYUjHuD.js.map": {
    "type": "application/json",
    "etag": "\"32a-bcBCMIwNri8akIPLFf9hqHwJtQo\"",
    "mtime": "2025-02-21T01:38:38.299Z",
    "size": 810,
    "path": "../public/_nuxt/BHYUjHuD.js.map"
  },
  "/_nuxt/BIFzPT6V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"462-am/CO9+RqSlfhD+4spV0tMYJRlM\"",
    "mtime": "2025-02-21T01:38:38.299Z",
    "size": 1122,
    "path": "../public/_nuxt/BIFzPT6V.js"
  },
  "/_nuxt/BIFzPT6V.js.map": {
    "type": "application/json",
    "etag": "\"d3c-20IEXkhJgXbUd2wfOtQQSZErSdk\"",
    "mtime": "2025-02-21T01:38:38.299Z",
    "size": 3388,
    "path": "../public/_nuxt/BIFzPT6V.js.map"
  },
  "/_nuxt/BQ5IGA6n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"44746-GwXuRpAWkaw//flLruMtPhjGx0s\"",
    "mtime": "2025-02-21T01:38:38.301Z",
    "size": 280390,
    "path": "../public/_nuxt/BQ5IGA6n.js"
  },
  "/_nuxt/BQ5IGA6n.js.map": {
    "type": "application/json",
    "etag": "\"1305bf-8CWdNN4gxXNfrclKln9hUm2/EW4\"",
    "mtime": "2025-02-21T01:38:38.325Z",
    "size": 1246655,
    "path": "../public/_nuxt/BQ5IGA6n.js.map"
  },
  "/_nuxt/BW2D_40Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-6VuhBW/MCg2stAimWRqx80w3qOM\"",
    "mtime": "2025-02-21T01:38:38.311Z",
    "size": 181,
    "path": "../public/_nuxt/BW2D_40Z.js"
  },
  "/_nuxt/BW2D_40Z.js.map": {
    "type": "application/json",
    "etag": "\"5c-9DqlNtvwmTWdfg5pcsN/AwxWpSU\"",
    "mtime": "2025-02-21T01:38:38.299Z",
    "size": 92,
    "path": "../public/_nuxt/BW2D_40Z.js.map"
  },
  "/_nuxt/Bb-AKHPj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e1-GI0qYVlox9H/qemTpOvj+lCWvjU\"",
    "mtime": "2025-02-21T01:38:38.300Z",
    "size": 225,
    "path": "../public/_nuxt/Bb-AKHPj.js"
  },
  "/_nuxt/Bb-AKHPj.js.map": {
    "type": "application/json",
    "etag": "\"5c-g6iMt39VRcm8VxbJ7UBPyuS+yeE\"",
    "mtime": "2025-02-21T01:38:38.301Z",
    "size": 92,
    "path": "../public/_nuxt/Bb-AKHPj.js.map"
  },
  "/_nuxt/Bb3kp5CJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"211-0LaBZYjwQAfbRnpn4P9EED7p1C8\"",
    "mtime": "2025-02-21T01:38:38.300Z",
    "size": 529,
    "path": "../public/_nuxt/Bb3kp5CJ.js"
  },
  "/_nuxt/Bb3kp5CJ.js.map": {
    "type": "application/json",
    "etag": "\"428-YhnsnQM81t/cVB2MMnDO7Q0RGmE\"",
    "mtime": "2025-02-21T01:38:38.303Z",
    "size": 1064,
    "path": "../public/_nuxt/Bb3kp5CJ.js.map"
  },
  "/_nuxt/Bb5ziO1M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"212-W5gcauuxe0WNS+CG7rSOqAB7irk\"",
    "mtime": "2025-02-21T01:38:38.301Z",
    "size": 530,
    "path": "../public/_nuxt/Bb5ziO1M.js"
  },
  "/_nuxt/Bb5ziO1M.js.map": {
    "type": "application/json",
    "etag": "\"2da-2EuBfnZllOZ2DlYhp5u8fSYIpXg\"",
    "mtime": "2025-02-21T01:38:38.301Z",
    "size": 730,
    "path": "../public/_nuxt/Bb5ziO1M.js.map"
  },
  "/_nuxt/BdzyVLdp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22ce-BqDQOYZv207XFuIxW5IiRVzkRM4\"",
    "mtime": "2025-02-21T01:38:38.303Z",
    "size": 8910,
    "path": "../public/_nuxt/BdzyVLdp.js"
  },
  "/_nuxt/BdzyVLdp.js.map": {
    "type": "application/json",
    "etag": "\"40ac-wt3cLvwIxONlD9fUsvDPA9ZVdGE\"",
    "mtime": "2025-02-21T01:38:38.303Z",
    "size": 16556,
    "path": "../public/_nuxt/BdzyVLdp.js.map"
  },
  "/_nuxt/BfkJtwqz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"40d-oGgJOGb4Hq1PRpUZSRQ5VUdfH1Q\"",
    "mtime": "2025-02-21T01:38:38.320Z",
    "size": 1037,
    "path": "../public/_nuxt/BfkJtwqz.js"
  },
  "/_nuxt/BfkJtwqz.js.map": {
    "type": "application/json",
    "etag": "\"4e5-15pw8YcGtrjh5UpqDZucmHrWqgM\"",
    "mtime": "2025-02-21T01:38:38.322Z",
    "size": 1253,
    "path": "../public/_nuxt/BfkJtwqz.js.map"
  },
  "/_nuxt/BhXQ01be.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"58a-RkNBxK5WNboqR0YA8McUc2RrsbE\"",
    "mtime": "2025-02-21T01:38:38.322Z",
    "size": 1418,
    "path": "../public/_nuxt/BhXQ01be.js"
  },
  "/_nuxt/BhXQ01be.js.map": {
    "type": "application/json",
    "etag": "\"ba9-5Hr2HxMoq2Okj5dDcWgc0pKcxk8\"",
    "mtime": "2025-02-21T01:38:38.322Z",
    "size": 2985,
    "path": "../public/_nuxt/BhXQ01be.js.map"
  },
  "/_nuxt/BmQZzf7k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6c5-JsENlg2qjWsIlVfd+0jnUMsMRw0\"",
    "mtime": "2025-02-21T01:38:38.322Z",
    "size": 1733,
    "path": "../public/_nuxt/BmQZzf7k.js"
  },
  "/_nuxt/BmQZzf7k.js.map": {
    "type": "application/json",
    "etag": "\"c72-YrPultcG4waQDcGtKMYyEPvZnQk\"",
    "mtime": "2025-02-21T01:38:38.324Z",
    "size": 3186,
    "path": "../public/_nuxt/BmQZzf7k.js.map"
  },
  "/_nuxt/Bm_wC_HY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"842-UqX5WWgYYU5ewFnHidqx9XAxvEE\"",
    "mtime": "2025-02-21T01:38:38.322Z",
    "size": 2114,
    "path": "../public/_nuxt/Bm_wC_HY.js"
  },
  "/_nuxt/Bm_wC_HY.js.map": {
    "type": "application/json",
    "etag": "\"1542-315MstNzO3W9+Wx5rru7jTAS7qY\"",
    "mtime": "2025-02-21T01:38:38.325Z",
    "size": 5442,
    "path": "../public/_nuxt/Bm_wC_HY.js.map"
  },
  "/_nuxt/BnQORxw-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"68d-MR0MAcbrtX5W2pJDnJp4kUemT4M\"",
    "mtime": "2025-02-21T01:38:38.322Z",
    "size": 1677,
    "path": "../public/_nuxt/BnQORxw-.js"
  },
  "/_nuxt/BnQORxw-.js.map": {
    "type": "application/json",
    "etag": "\"9f5-B22c6qpXqcjAPimoFy93m5XLUm0\"",
    "mtime": "2025-02-21T01:38:38.326Z",
    "size": 2549,
    "path": "../public/_nuxt/BnQORxw-.js.map"
  },
  "/_nuxt/BwAo1XSB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b7-3fzrgfznoli5Pebx1hNYxDIgU6A\"",
    "mtime": "2025-02-21T01:38:38.323Z",
    "size": 695,
    "path": "../public/_nuxt/BwAo1XSB.js"
  },
  "/_nuxt/BwAo1XSB.js.map": {
    "type": "application/json",
    "etag": "\"227f-jYXGc01olBdOggD6QyS60f7OqO8\"",
    "mtime": "2025-02-21T01:38:38.336Z",
    "size": 8831,
    "path": "../public/_nuxt/BwAo1XSB.js.map"
  },
  "/_nuxt/C5W7ff5U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1-QvnSSJxVDtypOHQ6FSbZbhksZ/0\"",
    "mtime": "2025-02-21T01:38:38.323Z",
    "size": 177,
    "path": "../public/_nuxt/C5W7ff5U.js"
  },
  "/_nuxt/C5W7ff5U.js.map": {
    "type": "application/json",
    "etag": "\"108-aoRxQ4klYO7m03+ZcQYzL7z9rwc\"",
    "mtime": "2025-02-21T01:38:38.323Z",
    "size": 264,
    "path": "../public/_nuxt/C5W7ff5U.js.map"
  },
  "/_nuxt/CDYcAvy7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b9-F4aavSOETdI55YVtb1B907BZq+A\"",
    "mtime": "2025-02-21T01:38:38.326Z",
    "size": 1721,
    "path": "../public/_nuxt/CDYcAvy7.js"
  },
  "/_nuxt/CDYcAvy7.js.map": {
    "type": "application/json",
    "etag": "\"be8-Q7PGtDOx5YfFkZI1r9a9OFERARQ\"",
    "mtime": "2025-02-21T01:38:38.324Z",
    "size": 3048,
    "path": "../public/_nuxt/CDYcAvy7.js.map"
  },
  "/_nuxt/CEgM03n0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f-yG7sgXVCwIxp3uQSL+94+N5T6As\"",
    "mtime": "2025-02-21T01:38:38.326Z",
    "size": 159,
    "path": "../public/_nuxt/CEgM03n0.js"
  },
  "/_nuxt/CEgM03n0.js.map": {
    "type": "application/json",
    "etag": "\"5c-8wZPXQnVzIpCmz6H/cyjTPV576c\"",
    "mtime": "2025-02-21T01:38:38.326Z",
    "size": 92,
    "path": "../public/_nuxt/CEgM03n0.js.map"
  },
  "/_nuxt/CF1Kr5sz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57e-yGYIGTPu81HyyPBmUgjQf/Ni+/o\"",
    "mtime": "2025-02-21T01:38:38.326Z",
    "size": 1406,
    "path": "../public/_nuxt/CF1Kr5sz.js"
  },
  "/_nuxt/CF1Kr5sz.js.map": {
    "type": "application/json",
    "etag": "\"603-41NxTV91fjKKYRWwNeNyXJAPB8M\"",
    "mtime": "2025-02-21T01:38:38.327Z",
    "size": 1539,
    "path": "../public/_nuxt/CF1Kr5sz.js.map"
  },
  "/_nuxt/CHFHbDis.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"625-aG0qRNpF1e2ymJy5wXy/+06bV9o\"",
    "mtime": "2025-02-21T01:38:38.326Z",
    "size": 1573,
    "path": "../public/_nuxt/CHFHbDis.js"
  },
  "/_nuxt/CHFHbDis.js.map": {
    "type": "application/json",
    "etag": "\"e04-g+AhF45gckX2pRMoaK7W88SfsnQ\"",
    "mtime": "2025-02-21T01:38:38.328Z",
    "size": 3588,
    "path": "../public/_nuxt/CHFHbDis.js.map"
  },
  "/_nuxt/CPOHgPYd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8c6-q6yBFUZfTYJRHm4eG382KdcuU4A\"",
    "mtime": "2025-02-21T01:38:38.329Z",
    "size": 2246,
    "path": "../public/_nuxt/CPOHgPYd.js"
  },
  "/_nuxt/CPOHgPYd.js.map": {
    "type": "application/json",
    "etag": "\"1113-+cQz9Pad6cZMuoy9MMtIv2LKQII\"",
    "mtime": "2025-02-21T01:38:38.327Z",
    "size": 4371,
    "path": "../public/_nuxt/CPOHgPYd.js.map"
  },
  "/_nuxt/CQlRTOUq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"640-XgPXGBoANsRhSs0QM2QKzHqoNnA\"",
    "mtime": "2025-02-21T01:38:38.327Z",
    "size": 1600,
    "path": "../public/_nuxt/CQlRTOUq.js"
  },
  "/_nuxt/CQlRTOUq.js.map": {
    "type": "application/json",
    "etag": "\"884-xzSFDqOFBGR8cJt+/5KK8DIInMk\"",
    "mtime": "2025-02-21T01:38:38.326Z",
    "size": 2180,
    "path": "../public/_nuxt/CQlRTOUq.js.map"
  },
  "/_nuxt/CY4lbI9A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"986-ckDiNGZQIbzXZGCYaKUCUojuDUc\"",
    "mtime": "2025-02-21T01:38:38.328Z",
    "size": 2438,
    "path": "../public/_nuxt/CY4lbI9A.js"
  },
  "/_nuxt/CY4lbI9A.js.map": {
    "type": "application/json",
    "etag": "\"e41-90dHnkJY4/GUWYxNj87P46dQdRo\"",
    "mtime": "2025-02-21T01:38:38.329Z",
    "size": 3649,
    "path": "../public/_nuxt/CY4lbI9A.js.map"
  },
  "/_nuxt/CYYFNqaw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"123-kDH+DFuNfqs6iUWVlhXn3aBoFFI\"",
    "mtime": "2025-02-21T01:38:38.328Z",
    "size": 291,
    "path": "../public/_nuxt/CYYFNqaw.js"
  },
  "/_nuxt/CYYFNqaw.js.map": {
    "type": "application/json",
    "etag": "\"5c-8VeW9L9T8zq6ShL5Xy+kxV8dk0I\"",
    "mtime": "2025-02-21T01:38:38.330Z",
    "size": 92,
    "path": "../public/_nuxt/CYYFNqaw.js.map"
  },
  "/_nuxt/CYzTwnk_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2abdf0-okrwEtz1f/bCv3KR5hX2X0yVezE\"",
    "mtime": "2025-02-21T01:38:38.367Z",
    "size": 2801136,
    "path": "../public/_nuxt/CYzTwnk_.js"
  },
  "/_nuxt/CYzTwnk_.js.map": {
    "type": "application/json",
    "etag": "\"2f54f1-INCGYoEW2IEQAYRIBi7klRaP42A\"",
    "mtime": "2025-02-21T01:38:38.377Z",
    "size": 3101937,
    "path": "../public/_nuxt/CYzTwnk_.js.map"
  },
  "/_nuxt/CZ762_mh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e1-cWMT48/m+xkoI+mUuyMmaoPtxN4\"",
    "mtime": "2025-02-21T01:38:38.330Z",
    "size": 225,
    "path": "../public/_nuxt/CZ762_mh.js"
  },
  "/_nuxt/CZ762_mh.js.map": {
    "type": "application/json",
    "etag": "\"5c-9rPzm5wQNfxDmCFzEwAuWnGo2+Q\"",
    "mtime": "2025-02-21T01:38:38.329Z",
    "size": 92,
    "path": "../public/_nuxt/CZ762_mh.js.map"
  },
  "/_nuxt/CZhyT7zx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6ea-5DZcPmr/W7zIQpSb9DLbMDCTf9g\"",
    "mtime": "2025-02-21T01:38:38.338Z",
    "size": 1770,
    "path": "../public/_nuxt/CZhyT7zx.js"
  },
  "/_nuxt/CZhyT7zx.js.map": {
    "type": "application/json",
    "etag": "\"9a7-G2jPfPGToBc/9Zq7nHeXI9Azxlo\"",
    "mtime": "2025-02-21T01:38:38.331Z",
    "size": 2471,
    "path": "../public/_nuxt/CZhyT7zx.js.map"
  },
  "/_nuxt/CcCuDGKx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19a-a0pEWRie1C1/Mo97EYI7jaZps9o\"",
    "mtime": "2025-02-21T01:38:38.330Z",
    "size": 410,
    "path": "../public/_nuxt/CcCuDGKx.js"
  },
  "/_nuxt/CcCuDGKx.js.map": {
    "type": "application/json",
    "etag": "\"3f5-skEjW0AtDH3KLyUnk/AlJLSt40Q\"",
    "mtime": "2025-02-21T01:38:38.332Z",
    "size": 1013,
    "path": "../public/_nuxt/CcCuDGKx.js.map"
  },
  "/_nuxt/CfQIW0-U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"235-m58INUauKdDTtxlYbX2sf8XngX0\"",
    "mtime": "2025-02-21T01:38:38.332Z",
    "size": 565,
    "path": "../public/_nuxt/CfQIW0-U.js"
  },
  "/_nuxt/CfQIW0-U.js.map": {
    "type": "application/json",
    "etag": "\"3be-viwDwDGx6Wl7tuzf4RO7iJ+Py48\"",
    "mtime": "2025-02-21T01:38:38.337Z",
    "size": 958,
    "path": "../public/_nuxt/CfQIW0-U.js.map"
  },
  "/_nuxt/CfwLjDUh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7d-1i3kH9LNGpREBxd6gSuTUPI5uqY\"",
    "mtime": "2025-02-21T01:38:38.338Z",
    "size": 125,
    "path": "../public/_nuxt/CfwLjDUh.js"
  },
  "/_nuxt/CfwLjDUh.js.map": {
    "type": "application/json",
    "etag": "\"1dd-KKkjv4bYM+x7AmZx6E/KskIx0vk\"",
    "mtime": "2025-02-21T01:38:38.338Z",
    "size": 477,
    "path": "../public/_nuxt/CfwLjDUh.js.map"
  },
  "/_nuxt/Cg7dsiSK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e1-jm48iTArJHIS1CnYKQgUoTx/bGg\"",
    "mtime": "2025-02-21T01:38:38.333Z",
    "size": 481,
    "path": "../public/_nuxt/Cg7dsiSK.js"
  },
  "/_nuxt/Cg7dsiSK.js.map": {
    "type": "application/json",
    "etag": "\"570-kR4dcNBxVbZiFyt3iCA25nHcG7M\"",
    "mtime": "2025-02-21T01:38:38.342Z",
    "size": 1392,
    "path": "../public/_nuxt/Cg7dsiSK.js.map"
  },
  "/_nuxt/Ci9EJULD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cb-GrNk4yKYj19aqNgQ9XbIB6fC9es\"",
    "mtime": "2025-02-21T01:38:38.339Z",
    "size": 203,
    "path": "../public/_nuxt/Ci9EJULD.js"
  },
  "/_nuxt/Ci9EJULD.js.map": {
    "type": "application/json",
    "etag": "\"5c-VMgaseJjr2KLAXnFJF0E/CAEtuk\"",
    "mtime": "2025-02-21T01:38:38.347Z",
    "size": 92,
    "path": "../public/_nuxt/Ci9EJULD.js.map"
  },
  "/_nuxt/Cj9RZvcl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3e-NnV8JNCTTnTLw1UyaJhBFQVjHCY\"",
    "mtime": "2025-02-21T01:38:38.339Z",
    "size": 3134,
    "path": "../public/_nuxt/Cj9RZvcl.js"
  },
  "/_nuxt/Cj9RZvcl.js.map": {
    "type": "application/json",
    "etag": "\"1784-muC8z9Cbb4MtbA0QtXujb104kBs\"",
    "mtime": "2025-02-21T01:38:38.339Z",
    "size": 6020,
    "path": "../public/_nuxt/Cj9RZvcl.js.map"
  },
  "/_nuxt/CpYWBUaW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2aeb-okngi2BePMFYylt5tD9EBMIEAsc\"",
    "mtime": "2025-02-21T01:38:38.341Z",
    "size": 10987,
    "path": "../public/_nuxt/CpYWBUaW.js"
  },
  "/_nuxt/CpYWBUaW.js.map": {
    "type": "application/json",
    "etag": "\"5153-3Y88+ZxXiclDJX0sXlu/xbZc9bA\"",
    "mtime": "2025-02-21T01:38:38.343Z",
    "size": 20819,
    "path": "../public/_nuxt/CpYWBUaW.js.map"
  },
  "/_nuxt/Cq5adTpe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"239-UCZ+vzATOaDoY5Wvbq9aEFc8GK4\"",
    "mtime": "2025-02-21T01:38:38.343Z",
    "size": 569,
    "path": "../public/_nuxt/Cq5adTpe.js"
  },
  "/_nuxt/Cq5adTpe.js.map": {
    "type": "application/json",
    "etag": "\"2a1-JuOYNOAFaM0H7YBBb4N4EmKdUqo\"",
    "mtime": "2025-02-21T01:38:38.343Z",
    "size": 673,
    "path": "../public/_nuxt/Cq5adTpe.js.map"
  },
  "/_nuxt/CsM-79Ut.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"474-8sTZtgCIp/ZhOaqyVehB/Ioj1ow\"",
    "mtime": "2025-02-21T01:38:38.355Z",
    "size": 1140,
    "path": "../public/_nuxt/CsM-79Ut.js"
  },
  "/_nuxt/CsM-79Ut.js.map": {
    "type": "application/json",
    "etag": "\"68a-jvb6a+RYKvf2zc9WywZ1DpjffXU\"",
    "mtime": "2025-02-21T01:38:38.362Z",
    "size": 1674,
    "path": "../public/_nuxt/CsM-79Ut.js.map"
  },
  "/_nuxt/Csgg6aYR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"559-Rt7hhPWJ9Mu4AKJZkuWGyc8a39c\"",
    "mtime": "2025-02-21T01:38:38.345Z",
    "size": 1369,
    "path": "../public/_nuxt/Csgg6aYR.js"
  },
  "/_nuxt/Csgg6aYR.js.map": {
    "type": "application/json",
    "etag": "\"f62-CmJKIKP+Bb11by6xc0pFAO92oBM\"",
    "mtime": "2025-02-21T01:38:38.366Z",
    "size": 3938,
    "path": "../public/_nuxt/Csgg6aYR.js.map"
  },
  "/_nuxt/CtHExTBD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1-Gz8fuC1xWx09ABGRV6At5JpmvTA\"",
    "mtime": "2025-02-21T01:38:38.346Z",
    "size": 177,
    "path": "../public/_nuxt/CtHExTBD.js"
  },
  "/_nuxt/CtHExTBD.js.map": {
    "type": "application/json",
    "etag": "\"f0-e+H4EcDMbv2DrXTheI8JIuEC/jM\"",
    "mtime": "2025-02-21T01:38:38.359Z",
    "size": 240,
    "path": "../public/_nuxt/CtHExTBD.js.map"
  },
  "/_nuxt/CwqKM_Li.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-RpomW2n6fxFGH+5R5ecbEzSAJpw\"",
    "mtime": "2025-02-21T01:38:38.346Z",
    "size": 181,
    "path": "../public/_nuxt/CwqKM_Li.js"
  },
  "/_nuxt/CwqKM_Li.js.map": {
    "type": "application/json",
    "etag": "\"5c-wbug8Wb5jsVhe2jbXk80bBmLnlY\"",
    "mtime": "2025-02-21T01:38:38.348Z",
    "size": 92,
    "path": "../public/_nuxt/CwqKM_Li.js.map"
  },
  "/_nuxt/CxZrXy87.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12898-eKFbLJov3jjNt2ULwQ7lFWrNZcw\"",
    "mtime": "2025-02-21T01:38:38.358Z",
    "size": 75928,
    "path": "../public/_nuxt/CxZrXy87.js"
  },
  "/_nuxt/CxZrXy87.js.map": {
    "type": "application/json",
    "etag": "\"3fdf2-g1AhghUTJd8YgQRZ/OHkAzGfx3E\"",
    "mtime": "2025-02-21T01:38:38.377Z",
    "size": 261618,
    "path": "../public/_nuxt/CxZrXy87.js.map"
  },
  "/_nuxt/CzDph0a3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f8-0QhATHemZ9Ecjf0o4U05mHn9764\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 1016,
    "path": "../public/_nuxt/CzDph0a3.js"
  },
  "/_nuxt/CzDph0a3.js.map": {
    "type": "application/json",
    "etag": "\"797-aDm++FgtsDkHQnbSfg1ViAlum2c\"",
    "mtime": "2025-02-21T01:38:38.366Z",
    "size": 1943,
    "path": "../public/_nuxt/CzDph0a3.js.map"
  },
  "/_nuxt/D2D9KHN_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19c10-LHjV0YyIMgwsBSEGcv0AHA29fcE\"",
    "mtime": "2025-02-21T01:38:38.366Z",
    "size": 105488,
    "path": "../public/_nuxt/D2D9KHN_.js"
  },
  "/_nuxt/D2D9KHN_.js.map": {
    "type": "application/json",
    "etag": "\"531fb-9WpqvPzZApQEGzhBEvqXlSaSpZA\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 340475,
    "path": "../public/_nuxt/D2D9KHN_.js.map"
  },
  "/_nuxt/D2hDXtRd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20d-vX067FR1nYA2EId4+tNO98BHpXs\"",
    "mtime": "2025-02-21T01:38:38.362Z",
    "size": 525,
    "path": "../public/_nuxt/D2hDXtRd.js"
  },
  "/_nuxt/D2hDXtRd.js.map": {
    "type": "application/json",
    "etag": "\"812-IVcSPYn0r4RivU56ZNLBi126x9Y\"",
    "mtime": "2025-02-21T01:38:38.381Z",
    "size": 2066,
    "path": "../public/_nuxt/D2hDXtRd.js.map"
  },
  "/_nuxt/D43ibuD7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24c-ZfMifTrXLjg2lkj2AKNIF3gxiiM\"",
    "mtime": "2025-02-21T01:38:38.370Z",
    "size": 588,
    "path": "../public/_nuxt/D43ibuD7.js"
  },
  "/_nuxt/D43ibuD7.js.map": {
    "type": "application/json",
    "etag": "\"568-R/WWtP7LDcQxDJMMv6N9zVUkvqE\"",
    "mtime": "2025-02-21T01:38:38.379Z",
    "size": 1384,
    "path": "../public/_nuxt/D43ibuD7.js.map"
  },
  "/_nuxt/D7GgLMdG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c6-wS8uemq1x4t4XEexgxquGeXgVxw\"",
    "mtime": "2025-02-21T01:38:38.373Z",
    "size": 710,
    "path": "../public/_nuxt/D7GgLMdG.js"
  },
  "/_nuxt/D7GgLMdG.js.map": {
    "type": "application/json",
    "etag": "\"9a7-IF2xJ7gKRutR9X93ObzYsPUyHZw\"",
    "mtime": "2025-02-21T01:38:38.368Z",
    "size": 2471,
    "path": "../public/_nuxt/D7GgLMdG.js.map"
  },
  "/_nuxt/DBu17FS0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a7c-qfhTSnNt0epgDdQIo/gnCtcsIJI\"",
    "mtime": "2025-02-21T01:38:38.383Z",
    "size": 2684,
    "path": "../public/_nuxt/DBu17FS0.js"
  },
  "/_nuxt/DBu17FS0.js.map": {
    "type": "application/json",
    "etag": "\"16a0-OXHMSpec89G/pJ40tXiJwZz8J1I\"",
    "mtime": "2025-02-21T01:38:38.372Z",
    "size": 5792,
    "path": "../public/_nuxt/DBu17FS0.js.map"
  },
  "/_nuxt/DC6bxWo6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-YTx7UXspYxKrHDB37l+gViJedlI\"",
    "mtime": "2025-02-21T01:38:38.377Z",
    "size": 181,
    "path": "../public/_nuxt/DC6bxWo6.js"
  },
  "/_nuxt/DC6bxWo6.js.map": {
    "type": "application/json",
    "etag": "\"5c-QlNBctk0sm1D4Rd4GNkDVMLoJdo\"",
    "mtime": "2025-02-21T01:38:38.378Z",
    "size": 92,
    "path": "../public/_nuxt/DC6bxWo6.js.map"
  },
  "/_nuxt/DGLGZj_q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b8-7gjM/ZhSeroBDU+JWWlpMiw+VEM\"",
    "mtime": "2025-02-21T01:38:38.377Z",
    "size": 952,
    "path": "../public/_nuxt/DGLGZj_q.js"
  },
  "/_nuxt/DGLGZj_q.js.map": {
    "type": "application/json",
    "etag": "\"795-2FFnrvDasWl0lv8sHJpZSW2+ZxY\"",
    "mtime": "2025-02-21T01:38:38.379Z",
    "size": 1941,
    "path": "../public/_nuxt/DGLGZj_q.js.map"
  },
  "/_nuxt/DGsS_dL1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"509-8M35eXuMfyHjRNdyMt6Z7MkS8E0\"",
    "mtime": "2025-02-21T01:38:38.381Z",
    "size": 1289,
    "path": "../public/_nuxt/DGsS_dL1.js"
  },
  "/_nuxt/DGsS_dL1.js.map": {
    "type": "application/json",
    "etag": "\"1147-G4TzXIwK5k4Kwj1oBtXykqbhDB0\"",
    "mtime": "2025-02-21T01:38:38.381Z",
    "size": 4423,
    "path": "../public/_nuxt/DGsS_dL1.js.map"
  },
  "/_nuxt/DJHyhzEY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ca-x+j/iX1xRYJQDO9lCWMK12AVw/s\"",
    "mtime": "2025-02-21T01:38:38.383Z",
    "size": 458,
    "path": "../public/_nuxt/DJHyhzEY.js"
  },
  "/_nuxt/DJHyhzEY.js.map": {
    "type": "application/json",
    "etag": "\"267-tSVVOdZ7glTf7OX0HHPtbvqZMfA\"",
    "mtime": "2025-02-21T01:38:38.385Z",
    "size": 615,
    "path": "../public/_nuxt/DJHyhzEY.js.map"
  },
  "/_nuxt/DNfxmwht.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1761-bJS+t5YzjRzSuhlnePUanItSFUY\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 5985,
    "path": "../public/_nuxt/DNfxmwht.js"
  },
  "/_nuxt/DNfxmwht.js.map": {
    "type": "application/json",
    "etag": "\"2674-5qioU4/1oJEuuv1CqkJX9AQ1Aj8\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 9844,
    "path": "../public/_nuxt/DNfxmwht.js.map"
  },
  "/_nuxt/DO-SjxWD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c9-wY+h2r69DNlfune/nDXiG9cMj60\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 1225,
    "path": "../public/_nuxt/DO-SjxWD.js"
  },
  "/_nuxt/DO-SjxWD.js.map": {
    "type": "application/json",
    "etag": "\"65c-vqkQj1QOfDSvAVKn/04828itXFI\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 1628,
    "path": "../public/_nuxt/DO-SjxWD.js.map"
  },
  "/_nuxt/DS798s9t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e3c-JNNKZbjootoLAJDI90b40uPmeQM\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 3644,
    "path": "../public/_nuxt/DS798s9t.js"
  },
  "/_nuxt/DS798s9t.js.map": {
    "type": "application/json",
    "etag": "\"1d4d-N3MdkCaxB/dU8EFill5fPqbI90k\"",
    "mtime": "2025-02-21T01:38:38.386Z",
    "size": 7501,
    "path": "../public/_nuxt/DS798s9t.js.map"
  },
  "/_nuxt/DTpOuUXr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e1-vPSIku4jX1GnJdywZglplaejS+c\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 225,
    "path": "../public/_nuxt/DTpOuUXr.js"
  },
  "/_nuxt/DTpOuUXr.js.map": {
    "type": "application/json",
    "etag": "\"5c-6qDBPS7MR9RoULNdmw9aKkI0zHs\"",
    "mtime": "2025-02-21T01:38:38.384Z",
    "size": 92,
    "path": "../public/_nuxt/DTpOuUXr.js.map"
  },
  "/_nuxt/DV_H7qAF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"975-NQkLJGARGDdzV6kTwBXc9PF+43M\"",
    "mtime": "2025-02-21T01:38:38.382Z",
    "size": 2421,
    "path": "../public/_nuxt/DV_H7qAF.js"
  },
  "/_nuxt/DV_H7qAF.js.map": {
    "type": "application/json",
    "etag": "\"1261-UT0p8hAnqM9HZ2t3afU994wARmA\"",
    "mtime": "2025-02-21T01:38:38.386Z",
    "size": 4705,
    "path": "../public/_nuxt/DV_H7qAF.js.map"
  },
  "/_nuxt/DXMCFHUu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"109-syPhYDuvX8hvN9Jj7xPehlh6hd0\"",
    "mtime": "2025-02-21T01:38:38.383Z",
    "size": 265,
    "path": "../public/_nuxt/DXMCFHUu.js"
  },
  "/_nuxt/DXMCFHUu.js.map": {
    "type": "application/json",
    "etag": "\"3b6-hed7Mblx+r4oOJ8+lzn2WXHDfvk\"",
    "mtime": "2025-02-21T01:38:38.385Z",
    "size": 950,
    "path": "../public/_nuxt/DXMCFHUu.js.map"
  },
  "/_nuxt/DYYBa1ra.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32c0a-FT+NYxk/tPJWez0CXp6hyaoCUGo\"",
    "mtime": "2025-02-21T01:38:38.386Z",
    "size": 207882,
    "path": "../public/_nuxt/DYYBa1ra.js"
  },
  "/_nuxt/DYYBa1ra.js.map": {
    "type": "application/json",
    "etag": "\"14eddc-EnjRnsrbE9zNR1hkFs71cz3tBKk\"",
    "mtime": "2025-02-21T01:38:38.401Z",
    "size": 1371612,
    "path": "../public/_nuxt/DYYBa1ra.js.map"
  },
  "/_nuxt/DcmCBJ_k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b10-10kAJ43Lau0qMzdP2pOb/HgjQko\"",
    "mtime": "2025-02-21T01:38:38.385Z",
    "size": 2832,
    "path": "../public/_nuxt/DcmCBJ_k.js"
  },
  "/_nuxt/DcmCBJ_k.js.map": {
    "type": "application/json",
    "etag": "\"ba4-pJQTmLLjPMoNlt9fWOUqL8YeeLI\"",
    "mtime": "2025-02-21T01:38:38.386Z",
    "size": 2980,
    "path": "../public/_nuxt/DcmCBJ_k.js.map"
  },
  "/_nuxt/Dg8VEt95.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ede4-fd45L3Wylstc8U13lqeJVaSiYBQ\"",
    "mtime": "2025-02-21T01:38:38.386Z",
    "size": 60900,
    "path": "../public/_nuxt/Dg8VEt95.js"
  },
  "/_nuxt/Dg8VEt95.js.map": {
    "type": "application/json",
    "etag": "\"3f6ed-C3TYhZQR387xqv7HJ9i1Dsd6iMM\"",
    "mtime": "2025-02-21T01:38:38.395Z",
    "size": 259821,
    "path": "../public/_nuxt/Dg8VEt95.js.map"
  },
  "/_nuxt/Dj64QUAb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"278-BiMEAsPqin8sYsDwUD0MjAwAcw4\"",
    "mtime": "2025-02-21T01:38:38.387Z",
    "size": 632,
    "path": "../public/_nuxt/Dj64QUAb.js"
  },
  "/_nuxt/Dj64QUAb.js.map": {
    "type": "application/json",
    "etag": "\"2ae-sQWzYhVqZmWjbyLQiR1R659r4rU\"",
    "mtime": "2025-02-21T01:38:38.388Z",
    "size": 686,
    "path": "../public/_nuxt/Dj64QUAb.js.map"
  },
  "/_nuxt/Dkq_FrYJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d77-B1CbFPsPZEPgUGz9tyUbJj/ugwM\"",
    "mtime": "2025-02-21T01:38:38.387Z",
    "size": 3447,
    "path": "../public/_nuxt/Dkq_FrYJ.js"
  },
  "/_nuxt/Dkq_FrYJ.js.map": {
    "type": "application/json",
    "etag": "\"148d-AjMVAdxQgnJ0E9agGtEULmKm3Ic\"",
    "mtime": "2025-02-21T01:38:38.388Z",
    "size": 5261,
    "path": "../public/_nuxt/Dkq_FrYJ.js.map"
  },
  "/_nuxt/DmvDgjmA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f-x3k1Wau9+/9ZJ927Zg4x5fumh3Y\"",
    "mtime": "2025-02-21T01:38:38.387Z",
    "size": 159,
    "path": "../public/_nuxt/DmvDgjmA.js"
  },
  "/_nuxt/DmvDgjmA.js.map": {
    "type": "application/json",
    "etag": "\"5c-kkaDUS0JWWQJ7bUS7tU6W/XrgKM\"",
    "mtime": "2025-02-21T01:38:38.389Z",
    "size": 92,
    "path": "../public/_nuxt/DmvDgjmA.js.map"
  },
  "/_nuxt/DoPZCR_N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"83e-AyzKJ/pkjBYGu04QV8uDv6t2QIQ\"",
    "mtime": "2025-02-21T01:38:38.388Z",
    "size": 2110,
    "path": "../public/_nuxt/DoPZCR_N.js"
  },
  "/_nuxt/DoPZCR_N.js.map": {
    "type": "application/json",
    "etag": "\"e4d-TmgoBzy5ysd/N7rRkpA8+GbFYNI\"",
    "mtime": "2025-02-21T01:38:38.399Z",
    "size": 3661,
    "path": "../public/_nuxt/DoPZCR_N.js.map"
  },
  "/_nuxt/DpGXuI4f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f1-RfIJFdy5+2/l8HGaul9po87Sr1E\"",
    "mtime": "2025-02-21T01:38:38.388Z",
    "size": 241,
    "path": "../public/_nuxt/DpGXuI4f.js"
  },
  "/_nuxt/DpGXuI4f.js.map": {
    "type": "application/json",
    "etag": "\"175-A9aJYPWjuhYrQBKn/cBkt3GMaYk\"",
    "mtime": "2025-02-21T01:38:38.397Z",
    "size": 373,
    "path": "../public/_nuxt/DpGXuI4f.js.map"
  },
  "/_nuxt/Dqjv4D0F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ac-5Cw38Am9Zf9HIJr5ce0UFu2Cdho\"",
    "mtime": "2025-02-21T01:38:38.389Z",
    "size": 172,
    "path": "../public/_nuxt/Dqjv4D0F.js"
  },
  "/_nuxt/Dqjv4D0F.js.map": {
    "type": "application/json",
    "etag": "\"fa-3+9TbedoKI3Be0G+xx6cKvu9Hrc\"",
    "mtime": "2025-02-21T01:38:38.390Z",
    "size": 250,
    "path": "../public/_nuxt/Dqjv4D0F.js.map"
  },
  "/_nuxt/DyWVWhbP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a9-BYjtQuwx0tcpT0iKXrse1uRMzlY\"",
    "mtime": "2025-02-21T01:38:38.394Z",
    "size": 425,
    "path": "../public/_nuxt/DyWVWhbP.js"
  },
  "/_nuxt/DyWVWhbP.js.map": {
    "type": "application/json",
    "etag": "\"822-pp9ngiBkb9l8fWOcpvNZFpEkDZs\"",
    "mtime": "2025-02-21T01:38:38.390Z",
    "size": 2082,
    "path": "../public/_nuxt/DyWVWhbP.js.map"
  },
  "/_nuxt/DzOAwO7u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f-Frf30waEEtDQxQFk92CeWB+YiJM\"",
    "mtime": "2025-02-21T01:38:38.391Z",
    "size": 159,
    "path": "../public/_nuxt/DzOAwO7u.js"
  },
  "/_nuxt/DzOAwO7u.js.map": {
    "type": "application/json",
    "etag": "\"5c-dR+WJ+dcSRmLfzR/I5XJnCmyYm4\"",
    "mtime": "2025-02-21T01:38:38.394Z",
    "size": 92,
    "path": "../public/_nuxt/DzOAwO7u.js.map"
  },
  "/_nuxt/EnSD2S2e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15da-6FlwUnru4Yqq+ksHRG27EdCdZM4\"",
    "mtime": "2025-02-21T01:38:38.391Z",
    "size": 5594,
    "path": "../public/_nuxt/EnSD2S2e.js"
  },
  "/_nuxt/EnSD2S2e.js.map": {
    "type": "application/json",
    "etag": "\"5b1b-hfzUPsgCPwLOTrvruSfis28m7tM\"",
    "mtime": "2025-02-21T01:38:38.394Z",
    "size": 23323,
    "path": "../public/_nuxt/EnSD2S2e.js.map"
  },
  "/_nuxt/H9LLdzPJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"76-6C6E/E41ovzI637FrfDoQfAUBaw\"",
    "mtime": "2025-02-21T01:38:38.395Z",
    "size": 118,
    "path": "../public/_nuxt/H9LLdzPJ.js"
  },
  "/_nuxt/H9LLdzPJ.js.map": {
    "type": "application/json",
    "etag": "\"137-Kyzk7C4MI+sQzG4lTfxPb80oxZ4\"",
    "mtime": "2025-02-21T01:38:38.398Z",
    "size": 311,
    "path": "../public/_nuxt/H9LLdzPJ.js.map"
  },
  "/_nuxt/MdiIcon.CPGFRciM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"78-EkNB1ckEApFmG8JM48tGQPOZzq0\"",
    "mtime": "2025-02-21T01:38:38.395Z",
    "size": 120,
    "path": "../public/_nuxt/MdiIcon.CPGFRciM.css"
  },
  "/_nuxt/Q5hlEJEC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"73-JekQlaG1nvP+3ZOKxUmyBMaaCUQ\"",
    "mtime": "2025-02-21T01:38:38.396Z",
    "size": 115,
    "path": "../public/_nuxt/Q5hlEJEC.js"
  },
  "/_nuxt/Q5hlEJEC.js.map": {
    "type": "application/json",
    "etag": "\"14c-gsKZnpLpmM/mc2YwVXqpnCY3/eo\"",
    "mtime": "2025-02-21T01:38:38.395Z",
    "size": 332,
    "path": "../public/_nuxt/Q5hlEJEC.js.map"
  },
  "/_nuxt/TKIaKC47.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11edf-VS1Efy36A0YZDi464nk3Jw/yDbM\"",
    "mtime": "2025-02-21T01:38:38.396Z",
    "size": 73439,
    "path": "../public/_nuxt/TKIaKC47.js"
  },
  "/_nuxt/TKIaKC47.js.map": {
    "type": "application/json",
    "etag": "\"52aa2-1Bgumup97jmSMNkLjgTx/JW2t+8\"",
    "mtime": "2025-02-21T01:38:38.401Z",
    "size": 338594,
    "path": "../public/_nuxt/TKIaKC47.js.map"
  },
  "/_nuxt/T_x2X1mV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d18-HwVCBpO+3JydYRDSmxz+AbXi0E0\"",
    "mtime": "2025-02-21T01:38:38.396Z",
    "size": 7448,
    "path": "../public/_nuxt/T_x2X1mV.js"
  },
  "/_nuxt/T_x2X1mV.js.map": {
    "type": "application/json",
    "etag": "\"33b5-LwtekSvOWupAY44ftvyj4ikXBn0\"",
    "mtime": "2025-02-21T01:38:38.397Z",
    "size": 13237,
    "path": "../public/_nuxt/T_x2X1mV.js.map"
  },
  "/_nuxt/VGv_iVU6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f7-zaR2maSMJvrmRxp0sP+t/aGSf9Q\"",
    "mtime": "2025-02-21T01:38:38.396Z",
    "size": 247,
    "path": "../public/_nuxt/VGv_iVU6.js"
  },
  "/_nuxt/VGv_iVU6.js.map": {
    "type": "application/json",
    "etag": "\"5c-RnJlW+Fe0h4CnZVgzg5nOdvs/BA\"",
    "mtime": "2025-02-21T01:38:38.397Z",
    "size": 92,
    "path": "../public/_nuxt/VGv_iVU6.js.map"
  },
  "/_nuxt/dkZT_yf8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15c-1YQhnBrgU6whUumnE4YKOpSdqQw\"",
    "mtime": "2025-02-21T01:38:38.401Z",
    "size": 348,
    "path": "../public/_nuxt/dkZT_yf8.js"
  },
  "/_nuxt/dkZT_yf8.js.map": {
    "type": "application/json",
    "etag": "\"3a3-h5XUWlMLlrjTGgJW5uhCrdnoK9U\"",
    "mtime": "2025-02-21T01:38:38.398Z",
    "size": 931,
    "path": "../public/_nuxt/dkZT_yf8.js.map"
  },
  "/_nuxt/ekmukta-bold.B8U-mfp-.woff": {
    "type": "font/woff",
    "etag": "\"77f0-MrW9VZ3FKzcT9659+/nhegUoTXM\"",
    "mtime": "2025-02-21T01:38:38.400Z",
    "size": 30704,
    "path": "../public/_nuxt/ekmukta-bold.B8U-mfp-.woff"
  },
  "/_nuxt/ekmukta-bold.Dxf0tKe-.woff2": {
    "type": "font/woff2",
    "etag": "\"5c8c-wlFsIim6PwHbj4OSr2+RNhyvQkQ\"",
    "mtime": "2025-02-21T01:38:38.401Z",
    "size": 23692,
    "path": "../public/_nuxt/ekmukta-bold.Dxf0tKe-.woff2"
  },
  "/_nuxt/ekmukta-extrabold.22YdhJQM.woff": {
    "type": "font/woff",
    "etag": "\"7594-bYvgm5TaOGadZyRJ0Ff7qP9QlJk\"",
    "mtime": "2025-02-21T01:38:38.400Z",
    "size": 30100,
    "path": "../public/_nuxt/ekmukta-extrabold.22YdhJQM.woff"
  },
  "/_nuxt/ekmukta-extrabold.BlyjFgYV.woff2": {
    "type": "font/woff2",
    "etag": "\"5a38-/T0gebjANE8jD6cQ4TThLZ2XdoA\"",
    "mtime": "2025-02-21T01:38:38.402Z",
    "size": 23096,
    "path": "../public/_nuxt/ekmukta-extrabold.BlyjFgYV.woff2"
  },
  "/_nuxt/ekmukta-extralight.07mr-HOX.woff": {
    "type": "font/woff",
    "etag": "\"7628-7Z71vlpjOWcYXaOYf3Ar9Fgrxfw\"",
    "mtime": "2025-02-21T01:38:38.403Z",
    "size": 30248,
    "path": "../public/_nuxt/ekmukta-extralight.07mr-HOX.woff"
  },
  "/_nuxt/ekmukta-extralight.uuJDXNj-.woff2": {
    "type": "font/woff2",
    "etag": "\"5ba4-5ZUb96DDNCABRCJj+o4K/rLLevE\"",
    "mtime": "2025-02-21T01:38:38.403Z",
    "size": 23460,
    "path": "../public/_nuxt/ekmukta-extralight.uuJDXNj-.woff2"
  },
  "/_nuxt/ekmukta-light.DLdlpPgt.woff2": {
    "type": "font/woff2",
    "etag": "\"5d20-tOOIwMTTTS+O5Rzf2qHoMBKsTxE\"",
    "mtime": "2025-02-21T01:38:38.403Z",
    "size": 23840,
    "path": "../public/_nuxt/ekmukta-light.DLdlpPgt.woff2"
  },
  "/_nuxt/ekmukta-light.Dd1Lz2wb.woff": {
    "type": "font/woff",
    "etag": "\"785c-giS80sNaZtEND6y+FJbnw/zSk0g\"",
    "mtime": "2025-02-21T01:38:38.403Z",
    "size": 30812,
    "path": "../public/_nuxt/ekmukta-light.Dd1Lz2wb.woff"
  },
  "/_nuxt/ekmukta-medium.BY6UoMxM.woff2": {
    "type": "font/woff2",
    "etag": "\"5bc0-QlORWmq2youCx3+rd1GjInddnlc\"",
    "mtime": "2025-02-21T01:38:38.403Z",
    "size": 23488,
    "path": "../public/_nuxt/ekmukta-medium.BY6UoMxM.woff2"
  },
  "/_nuxt/ekmukta-medium.DEC9-vHm.woff": {
    "type": "font/woff",
    "etag": "\"76b0-pt8iO5Degizb5bpbEQniFcffQgA\"",
    "mtime": "2025-02-21T01:38:38.403Z",
    "size": 30384,
    "path": "../public/_nuxt/ekmukta-medium.DEC9-vHm.woff"
  },
  "/_nuxt/ekmukta-regular.Ct82kyDT.woff": {
    "type": "font/woff",
    "etag": "\"781c-74wce1VQPqkXvI44Fx/GWWSJXmI\"",
    "mtime": "2025-02-21T01:38:38.410Z",
    "size": 30748,
    "path": "../public/_nuxt/ekmukta-regular.Ct82kyDT.woff"
  },
  "/_nuxt/ekmukta-regular.DhOzcA0s.woff2": {
    "type": "font/woff2",
    "etag": "\"5c50-jLrtYL+NATlQERgRHrw/IJkFSPE\"",
    "mtime": "2025-02-21T01:38:38.413Z",
    "size": 23632,
    "path": "../public/_nuxt/ekmukta-regular.DhOzcA0s.woff2"
  },
  "/_nuxt/ekmukta-semibold.BjVVp-hP.woff": {
    "type": "font/woff",
    "etag": "\"7754-DV5zsXVR8FwKPmc75GUi5uVaowg\"",
    "mtime": "2025-02-21T01:38:38.404Z",
    "size": 30548,
    "path": "../public/_nuxt/ekmukta-semibold.BjVVp-hP.woff"
  },
  "/_nuxt/ekmukta-semibold.DdMfaCQq.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-KQD/CHXCIOK5HAFpDuOrmLssi2I\"",
    "mtime": "2025-02-21T01:38:38.412Z",
    "size": 23516,
    "path": "../public/_nuxt/ekmukta-semibold.DdMfaCQq.woff2"
  },
  "/_nuxt/error-404.ygbHJO5Q.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-4evKWTXkUTbWWn6byp5XsW9Tgo8\"",
    "mtime": "2025-02-21T01:38:38.404Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.ygbHJO5Q.css"
  },
  "/_nuxt/error-500.B11Ibp8J.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-tP5N9FT3eOu7fn6vCvyZRfUcniY\"",
    "mtime": "2025-02-21T01:38:38.405Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.B11Ibp8J.css"
  },
  "/_nuxt/f7RSBFTs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"166-8FcVRcjpjttbqZr9Z+jiwtdVkLU\"",
    "mtime": "2025-02-21T01:38:38.403Z",
    "size": 358,
    "path": "../public/_nuxt/f7RSBFTs.js"
  },
  "/_nuxt/f7RSBFTs.js.map": {
    "type": "application/json",
    "etag": "\"228-XvcGyaoPEzDjFmus6WKX5VcRufg\"",
    "mtime": "2025-02-21T01:38:38.412Z",
    "size": 552,
    "path": "../public/_nuxt/f7RSBFTs.js.map"
  },
  "/_nuxt/fUtYZuEz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ee9-gvCBA+1NxQy1nSxDfmHcsy1eGFk\"",
    "mtime": "2025-02-21T01:38:38.404Z",
    "size": 3817,
    "path": "../public/_nuxt/fUtYZuEz.js"
  },
  "/_nuxt/fUtYZuEz.js.map": {
    "type": "application/json",
    "etag": "\"1b4a-/nacX77pSLkFvT1FArb+lnji8RQ\"",
    "mtime": "2025-02-21T01:38:38.405Z",
    "size": 6986,
    "path": "../public/_nuxt/fUtYZuEz.js.map"
  },
  "/_nuxt/fiU6i4M2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e-jfIapmUxnzYPuLPpT2qEsJxixik\"",
    "mtime": "2025-02-21T01:38:38.404Z",
    "size": 350,
    "path": "../public/_nuxt/fiU6i4M2.js"
  },
  "/_nuxt/fiU6i4M2.js.map": {
    "type": "application/json",
    "etag": "\"5c-JtLd8nBhYoMrb0LU6vic8dFc4F4\"",
    "mtime": "2025-02-21T01:38:38.406Z",
    "size": 92,
    "path": "../public/_nuxt/fiU6i4M2.js.map"
  },
  "/_nuxt/icomoon.BpVpslBF.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"141c-KojSi/bjF/borFGGqyrCvZ4Aw+Y\"",
    "mtime": "2025-02-21T01:38:38.405Z",
    "size": 5148,
    "path": "../public/_nuxt/icomoon.BpVpslBF.eot"
  },
  "/_nuxt/icomoon.CxzYJong.woff": {
    "type": "font/woff",
    "etag": "\"13c4-dQplrtkdk4LsTgVsDlCM613Uwuk\"",
    "mtime": "2025-02-21T01:38:38.409Z",
    "size": 5060,
    "path": "../public/_nuxt/icomoon.CxzYJong.woff"
  },
  "/_nuxt/icomoon.DA39t3RM.svg": {
    "type": "image/svg+xml",
    "etag": "\"3f85-agdOpoS6Q53/J5OSPsNO0FoAU1I\"",
    "mtime": "2025-02-21T01:38:38.410Z",
    "size": 16261,
    "path": "../public/_nuxt/icomoon.DA39t3RM.svg"
  },
  "/_nuxt/icomoon.DKOInV-N.ttf": {
    "type": "font/ttf",
    "etag": "\"1378-BpSlMY3ywAZOiFxCYZW/L0cFA6s\"",
    "mtime": "2025-02-21T01:38:38.407Z",
    "size": 4984,
    "path": "../public/_nuxt/icomoon.DKOInV-N.ttf"
  },
  "/_nuxt/imageBlock.DDLD3z86.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"34-MmxvApKFCjVa8D/Bjrh51NvlS/E\"",
    "mtime": "2025-02-21T01:38:38.413Z",
    "size": 52,
    "path": "../public/_nuxt/imageBlock.DDLD3z86.css"
  },
  "/_nuxt/kWZAsxyl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"374-ZOGI2sNM3zU0kfzg5jggP1BB9jA\"",
    "mtime": "2025-02-21T01:38:38.412Z",
    "size": 884,
    "path": "../public/_nuxt/kWZAsxyl.js"
  },
  "/_nuxt/kWZAsxyl.js.map": {
    "type": "application/json",
    "etag": "\"6a1-B33a/fXf9uzIykorBxsuoiqOUXw\"",
    "mtime": "2025-02-21T01:38:38.412Z",
    "size": 1697,
    "path": "../public/_nuxt/kWZAsxyl.js.map"
  },
  "/_nuxt/nwa1PKU6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1609-BBl69voXUHmPoSD/JPPNtcZtQzM\"",
    "mtime": "2025-02-21T01:38:38.412Z",
    "size": 5641,
    "path": "../public/_nuxt/nwa1PKU6.js"
  },
  "/_nuxt/nwa1PKU6.js.map": {
    "type": "application/json",
    "etag": "\"2ad1-2ZPILoSh7zwZwfDXUEULPaTejKg\"",
    "mtime": "2025-02-21T01:38:38.413Z",
    "size": 10961,
    "path": "../public/_nuxt/nwa1PKU6.js.map"
  },
  "/_nuxt/oVL_svhm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ca0-tOFAyGpJK/vycL6yfU9JQK8UqeI\"",
    "mtime": "2025-02-21T01:38:38.412Z",
    "size": 7328,
    "path": "../public/_nuxt/oVL_svhm.js"
  },
  "/_nuxt/oVL_svhm.js.map": {
    "type": "application/json",
    "etag": "\"3035-t6c7PfHYVGc/let3vk0t0kcfZdM\"",
    "mtime": "2025-02-21T01:38:38.413Z",
    "size": 12341,
    "path": "../public/_nuxt/oVL_svhm.js.map"
  },
  "/_nuxt/xR2zYE3x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9a-rjnvlsi+8huIxwqYskhOfGoq1AI\"",
    "mtime": "2025-02-21T01:38:38.412Z",
    "size": 154,
    "path": "../public/_nuxt/xR2zYE3x.js"
  },
  "/_nuxt/xR2zYE3x.js.map": {
    "type": "application/json",
    "etag": "\"5c-tq+Ok0tpu2uCV0AHC2BgFhEWvAw\"",
    "mtime": "2025-02-21T01:38:38.415Z",
    "size": 92,
    "path": "../public/_nuxt/xR2zYE3x.js.map"
  },
  "/_nuxt/zvxAKM43.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"82a-zerIQVt9/fu7+j6XVToHwBvXnrI\"",
    "mtime": "2025-02-21T01:38:38.413Z",
    "size": 2090,
    "path": "../public/_nuxt/zvxAKM43.js"
  },
  "/_nuxt/zvxAKM43.js.map": {
    "type": "application/json",
    "etag": "\"1433-QqMcdVv9JN6crHep+DA+P6Zeo34\"",
    "mtime": "2025-02-21T01:38:38.413Z",
    "size": 5171,
    "path": "../public/_nuxt/zvxAKM43.js.map"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-fTDFRSKLpCLzR31iO/oW3yCy0NQ\"",
    "mtime": "2025-02-21T01:38:38.235Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/05cd848f-4fb0-47e8-a5a0-fd92ebc6aa22.json": {
    "type": "application/json",
    "etag": "\"8b-Cr5aGRZf1cvosQH1njXkYIAu2xo\"",
    "mtime": "2025-02-21T01:38:38.228Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/05cd848f-4fb0-47e8-a5a0-fd92ebc6aa22.json"
  },
  "/_nuxt/builds/meta/dev.json": {
    "type": "application/json",
    "etag": "\"6a-QA31ZCKbkyoDaW2iEayn7jLHw/Y\"",
    "mtime": "2025-02-21T01:38:38.228Z",
    "size": 106,
    "path": "../public/_nuxt/builds/meta/dev.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _HFOWiR = eventHandler(async (event) => {
  await clearUserSession(event);
  return { loggedOut: true };
});

const _XUTtfc = eventHandler(async (event) => {
  const session = await getUserSession(event);
  if (Object.keys(session).length > 0) {
    await sessionHooks.callHookParallel("fetch", session, event);
  }
  const { secure, ...data } = session;
  return data;
});

const _lazy_LlXy5D = () => import('./routes/api/auth/_..._.mjs');
const _lazy_lngtzW = () => import('./routes/api/auth/me.mjs');
const _lazy_AO62cs = () => import('./routes/api/auth/register.post.mjs');
const _lazy_frRvY5 = () => import('./routes/api/cart/checkout.post.mjs');
const _lazy_dWab6c = () => import('./routes/api/category/_id_.delete.mjs');
const _lazy_k6BTOt = () => import('./routes/api/index.get.mjs');
const _lazy_35d0GX = () => import('./routes/api/index.post.mjs');
const _lazy_6OWS5Y = () => import('./routes/api/country.get.mjs');
const _lazy_YUnm6Z = () => import('./routes/api/dashboard.get.mjs');
const _lazy_QSzBLJ = () => import('./routes/api/file.mjs');
const _lazy_9PVYRy = () => import('./routes/api/image/_id_.delete.mjs');
const _lazy_XNw4zT = () => import('./routes/api/index.post2.mjs');
const _lazy_lfMcjx = () => import('./routes/api/order.get.mjs');
const _lazy_AgHf3X = () => import('./routes/api/index.get2.mjs');
const _lazy_ssBMCi = () => import('./routes/api/index.post3.mjs');
const _lazy_wB6kD8 = () => import('./routes/api/product/_id/images/_image_id_.delete.mjs');
const _lazy_HLrR5C = () => import('./routes/api/product/_id/images/_image_id_.put.mjs');
const _lazy_AWRRaa = () => import('./routes/api/product/_id/index.post.mjs');
const _lazy_5zk6gn = () => import('./routes/api/product/index.get.mjs');
const _lazy_o4cUj1 = () => import('./routes/api/product/_id/index.get.mjs');
const _lazy_7xAI67 = () => import('./routes/api/product/_id/index.post2.mjs');
const _lazy_4rJCcu = () => import('./routes/api/product/_id/update_description.put.mjs');
const _lazy_Fj79Ev = () => import('./routes/api/index.get3.mjs');
const _lazy_HP8rxC = () => import('./routes/api/index.post4.mjs');
const _lazy_8d2Lek = () => import('./routes/api/index.get4.mjs');
const _lazy_Pr8jjI = () => import('./routes/api/index.post5.mjs');
const _lazy_VzV0Yd = () => import('./routes/api/index.get5.mjs');
const _lazy_qtqj2O = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/**', handler: _lazy_LlXy5D, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/me', handler: _lazy_lngtzW, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/register', handler: _lazy_AO62cs, lazy: true, middleware: false, method: "post" },
  { route: '/api/cart/checkout', handler: _lazy_frRvY5, lazy: true, middleware: false, method: "post" },
  { route: '/api/category/:id', handler: _lazy_dWab6c, lazy: true, middleware: false, method: "delete" },
  { route: '/api/category', handler: _lazy_k6BTOt, lazy: true, middleware: false, method: "get" },
  { route: '/api/category', handler: _lazy_35d0GX, lazy: true, middleware: false, method: "post" },
  { route: '/api/country', handler: _lazy_6OWS5Y, lazy: true, middleware: false, method: "get" },
  { route: '/api/dashboard', handler: _lazy_YUnm6Z, lazy: true, middleware: false, method: "get" },
  { route: '/api/file', handler: _lazy_QSzBLJ, lazy: true, middleware: false, method: undefined },
  { route: '/api/image/:id', handler: _lazy_9PVYRy, lazy: true, middleware: false, method: "delete" },
  { route: '/api/image', handler: _lazy_XNw4zT, lazy: true, middleware: false, method: "post" },
  { route: '/api/order', handler: _lazy_lfMcjx, lazy: true, middleware: false, method: "get" },
  { route: '/api/permission', handler: _lazy_AgHf3X, lazy: true, middleware: false, method: "get" },
  { route: '/api/permission', handler: _lazy_ssBMCi, lazy: true, middleware: false, method: "post" },
  { route: '/api/product/:id/images/:image_id', handler: _lazy_wB6kD8, lazy: true, middleware: false, method: "delete" },
  { route: '/api/product/:id/images/:image_id', handler: _lazy_HLrR5C, lazy: true, middleware: false, method: "put" },
  { route: '/api/product/:id/images', handler: _lazy_AWRRaa, lazy: true, middleware: false, method: "post" },
  { route: '/api/product/:id', handler: _lazy_5zk6gn, lazy: true, middleware: false, method: "get" },
  { route: '/api/product/:id/rate', handler: _lazy_o4cUj1, lazy: true, middleware: false, method: "get" },
  { route: '/api/product/:id/rate', handler: _lazy_7xAI67, lazy: true, middleware: false, method: "post" },
  { route: '/api/product/:id/update_description', handler: _lazy_4rJCcu, lazy: true, middleware: false, method: "put" },
  { route: '/api/product', handler: _lazy_Fj79Ev, lazy: true, middleware: false, method: "get" },
  { route: '/api/product', handler: _lazy_HP8rxC, lazy: true, middleware: false, method: "post" },
  { route: '/api/role', handler: _lazy_8d2Lek, lazy: true, middleware: false, method: "get" },
  { route: '/api/role', handler: _lazy_Pr8jjI, lazy: true, middleware: false, method: "post" },
  { route: '/api/user', handler: _lazy_VzV0Yd, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_qtqj2O, lazy: true, middleware: false, method: undefined },
  { route: '/api/_auth/session', handler: _HFOWiR, lazy: false, middleware: false, method: "delete" },
  { route: '/api/_auth/session', handler: _XUTtfc, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_qtqj2O, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, getResponseStatusText as A, hasProtocol as B, isScriptProtocol as C, withQuery as D, ERROR_MESSAGES as E, sanitizeStatusCode as F, createHooks as G, klona as H, parse as I, getRequestHeader as J, appendHeader as K, destr as L, isEqual as M, getCookie as N, deleteCookie as O, getRequestHeaders as P, getHeader as Q, toRouteMatcher as R, createRouter$1 as S, withoutTrailingSlash as T, withoutBase as U, appendResponseHeader as V, parseQuery as W, withTrailingSlash as X, nodeServer as Y, useTypedBackendConfig as a, defu as b, createError$1 as c, defineEventHandler as d, eventHandler as e, sendRedirect as f, getHeaders as g, getQuery as h, isMethod as i, joinURL as j, getRequestHost as k, getRequestProtocol as l, getServerOrigin as m, getResponseHeader as n, setResponseHeader as o, parseCookies as p, setCookie as q, readBody as r, setResponseStatus as s, send as t, useRuntimeConfig as u, getResponseStatus as v, setResponseHeaders as w, useNitroApp as x, joinRelativeURL as y, getRouteRules as z };
//# sourceMappingURL=runtime.mjs.map
