/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 通用模块： lib.cookie
const win = window;
const doc = document;

function set(key, val, time) {
  const date = new Date();
  const expiresDays = time;
  const url = win.location.href;
  let cookieStr;

  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);

  if (url.indexOf('cricuc.com') > -1) {
    cookieStr = ';domain=.cricuc.com;path=/;';
  } else if (url.indexOf('ucweb.com') > -1) {
    cookieStr = ';domain=.ucweb.com;path=/;';
  } else if (url.indexOf('uc.cn') > -1) {
    cookieStr = ';domain=.uc.cn;path=/;';
  }
  doc.cookie = `${key}=${val};expires=${date.toGMTString()}${cookieStr}`;
}

function get(key) {
  const cookie = doc.cookie.replace(/[ ]/g, '');
  const arrCookie = cookie.split(';');
  let tips;
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (key === arr[0]) {
      tips = arr[1];
      break;
    }
  }
  return tips;
}

// exports api
/* harmony default export */ __webpack_exports__["a"] = ({
  set,
  get
});


/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cookie__ = __webpack_require__(0);


const win = window;
const doc = document;

const util = {
  $(selector, ctx = doc) {
    return ctx.querySelector(selector);
  },
  $$(selector, ctx = doc) {
    return ctx.querySelectorAll(selector);
  },
  bindEvent(selector, evt, cb) {
    this.$(selector).addEventListener(evt, cb, false);
  },
  createElement({ html, id = '', className = '' }) {
    const div = doc.createElement('div');
    if (id) div.id = id;
    if (className) div.classList.add(className);
    div.innerHTML = html;
    return div;
  },
  uuid() {
    /*eslint-disable*/
    function s4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(10).substring(1);
    }

    return s4() + s4() + s4() + s4() + s4();
    /*eslint-enable */
  },
  getSn() {
    let sn = localStorage.getItem('user_sn') || __WEBPACK_IMPORTED_MODULE_0__cookie__["a" /* default */].get('sn');
    if (!sn) {
      sn = util.uuid();
      localStorage.setItem('user_sn', sn);
    }
    return sn;
  },
  /**
 * [读取localstorage的值]
 * @param  {string} key [localstorage的key]
 * @return {*}     [返回localstorage的value]
 */
  getLocalStorageItem(key) {
    let val = null;
    let cacheData = win.localStorage.getItem(key);
    if (cacheData) {
      cacheData = JSON.parse(cacheData);
      if (cacheData.expireTime) {
        if (Date.now() < cacheData.expireTime) {
          val = cacheData.data;
        }
      } else {
        val = cacheData.data;
      }
    }
    // console.log(key, '--->');
    // console.log(val);
    return val;
  },

  /**
 * [设置localstorage的值]
 * @param {string} key          [localstorage的key]
 * @param {*} data         [localstorage的value]
 * @param {number} expireMimute [多少分钟后过期]
 */
  setLocalStorageItem(key, data, expireMimute) {
    const nowTime = Date.now();
    const expireTime = expireMimute ? nowTime + expireMimute * 60000 : '';
    const value = {
      updateTime: nowTime,
      data
    };
    if (expireTime) value.expireTime = expireTime;
    win.localStorage.setItem(key, JSON.stringify(value));
  },
  getQueryString(name) {
    const reg = new RegExp(`(\\?|^|&|#)${name}=([^&|^#]*)(&|$|#)`, 'i');
    const r = window.location.href.match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return '';
  },
  setQueryString(url, params) {
    const utag = url.indexOf('?') !== -1 ? '&' : '?';
    return `${url}${utag}${Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')}`;
  },
  antiJsValid(str) {
    // &apos;----单引号
    // &quot;-----双引号
    // &lt;  -----<
    // &gt;  ----->
    // &     -----&amp;
    let newstr = str;
    /*eslint-disable*/
    newstr = newstr.replace(/\&/g, '&amp;');
    newstr = newstr.replace(/\'/g, '&apos;');
    newstr = newstr.replace(/\"/g, '&quot;');
    newstr = newstr.replace(/\</g, '&lt;');
    newstr = newstr.replace(/\>/g, '&gt;');
    newstr = newstr.replace(/\&lt;br\/\&gt;/g, '<br/>');
    /*eslint-enable*/
    return newstr;
  },
  /**
   * 时间戳 ==> xx 天/小时/分钟 前
   *
   * @param timestamp
   * @returns
   */
  dateFormat(timestamp) {
    const today = new Date(); // 今天
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const oneday = 1000 * 60 * 60 * 24;
    const yesterday = new Date(today - oneday);
    const beforeyesterday = new Date(yesterday - oneday);
    const date = new Date(timestamp - 0);
    const now = new Date();
    const time = (now.valueOf() - date.valueOf()) / 1000;
    const text = '';
    if (date.valueOf() <= beforeyesterday.valueOf()) {
      return date.format('MM-dd hh:mm');
    } // 超过两天
    if (yesterday.valueOf() >= date.valueOf() && date.valueOf() >= beforeyesterday.valueOf()) {
      return date.format('MM-dd hh:mm');
    } // 前天
    if (today.valueOf() >= date.valueOf() && date.valueOf() >= yesterday.valueOf()) {
      return date.format('MM-dd hh:mm');
    } // 昨天
    if (time >= 3600 && date.valueOf() >= today.valueOf()) {
      return `${Math.round(time / 60 / 60)}小时前`;
    } // 到今天前
    if (time >= 60 && time < 3600) {
      return `${Math.round(time / 60)}分钟前`;
    }
    if (time < 60) {
      return '刚刚';
    }

    return text;
  },
  dateTranslate(date, format) {
    /*eslint-disable*/
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
      }
    }
    /*eslint-enable*/
    return format;
  },
  getSearchString(params) {
    return Object.keys(params)
      .map(k => `${k}=${encodeURIComponent(params[k])}`)
      .join('&');
  },
  addCommonUrlParam(option) {
    const sn = util.getSn('sn');
    let paramArray = {
      app: util.getQueryString('app') || 'uc-iflow',
      zzd_from: util.getQueryString('zzd_from') || 'uc-iflow',
      uc_param_str: util.getQueryString('uc_param_str') || 'dndsfrvesvntnwpfgibicp',
      sn
    };
    paramArray = Object.assign({}, paramArray, option);
    return Object.keys(paramArray)
      .map(key => `${key}=${paramArray[key]}`)
      .join('&');
  },
  setDeviceWidth() {
    const deviceWidth = util.clientWidth * win.devicePixelRatio;
    switch (true) {
      case deviceWidth > 640:
        return 720;
      case deviceWidth <= 640 && deviceWidth > 540:
        return 640;
      case deviceWidth <= 540 && deviceWidth > 480:
        return 540;
      case deviceWidth <= 480 && deviceWidth > 360:
        return 480;
      case deviceWidth <= 360:
        return 360;
      default:
        return 720;
    }
  },
  setImgUrlWithWidth(url, picWidth, forceAddWidth) {
    const imgUrl = url.replace(/(&)?width=\d+/, '');
    const uTag = `${imgUrl.indexOf('?') !== -1 ? '&' : '?'}width=`;
    if (forceAddWidth) {
      return imgUrl + uTag + picWidth;
    } else if (!forceAddWidth && imgUrl.indexOf('gif') > -1) {
      return imgUrl;
    }
    return imgUrl + uTag + picWidth;
  },
  getClientWidth() {
    const width = doc.documentElement.clientWidth;
    return width !== 0 ? width : win.screen.width;
  },

  /**
 * 获取url参数后转化为对象
 * @param  {String} url 目标URL，不传则是当前页面的url
 * @return {Object}     url参数对象
 */
  getUrlParams(url) {
    const result = {};
    const href = (url || win.location.href).split('#')[0];
    const params = (href.split('?')[1] || '').split('&');
    params.forEach(param => {
      const arr = param.replace('=', '&').split('&');
      if (arr[0]) result[arr[0]] = arr[1] || '';
    });
    return result;
  },
  /**
   * 删除url中指定的参数
   */
  deleteUrlParam(url, ...names) {
    const urlParams = util.getUrlParams(url);
    const newUrlParams = Object.keys(urlParams)
      .filter(name => names.indexOf(name) === -1)
      .map(name => `${name}=${urlParams[name]}`);
    return `${url.split('?')[0]}?${newUrlParams.join('&')}`;
  },
  /**
   * 提取html Node节点中的文本
   */
  htmlToText(html) {
    let div = doc.createElement('div');
    div.innerHTML = html;
    const txt = div.innerText;
    div = null;
    return txt;
  },
  /**
   * 获取指定元素相对于可视窗口顶部的高度
   */
  getOffsetTop(element) {
    const { top } = element.getBoundingClientRect();
    return top + util.getScrollTop();
  },
  /**
  * 获取窗口滚动条高度
  */
  getScrollTop() {
    const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
    return scrollTop;
  },
  /**
   * 设置滚动到Y轴的位置
   */
  setScrollTop(position) {
  // document.documentElement.scrollTop = document.body.scrollTop = position;
    win.scrollTo(0, position);
  }
};

util.clientWidth = util.getClientWidth();

/*eslint-disable */
Date.prototype.format = function(format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    }
  }

  return format;
};
/*eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (util);


/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_util__ = __webpack_require__(1);


const data = {
  builtins: {
    Promise: 'promise',
    fetch: 'fetch',
    Map: 'map',
    Set: 'set',
    WeakMap: 'weak-map',
    WeakSet: 'weak-set',
    Observable: 'observable',
    Symbol: 'symbol',
    setImmediate: 'set-immediate',
    clearImmediate: 'clear-immediate',
    asap: 'asap'
    //parseFloat: "parse-float", // temporary disabled
    //parseInt: "parse-int" // temporary disabled
  },

  methods: {
    Array: {
      copyWithin: 'array/copy-within',
      entries: 'array/entries',
      every: 'array/every',
      fill: 'array/fill',
      filter: 'array/filter',
      findIndex: 'array/find-index',
      find: 'array/find',
      forEach: 'array/for-each',
      from: 'array/from',
      includes: 'array/includes',
      indexOf: 'array/index-of',
      isArray: 'array/is-array', // temporary disabled
      join: 'array/join',
      keys: 'array/keys',
      lastIndexOf: 'array/last-index-of',
      map: 'array/map',
      of: 'array/of',
      reduceRight: 'array/reduce-right',
      reduce: 'array/reduce',
      some: 'array/some',
      sort: 'array/sort',
      splice: 'array/splice',
      values: 'array/values'
    },

    Object: {
      assign: 'object/assign',
      create: 'object/create',
      defineProperties: 'object/define-properties',
      defineProperty: 'object/define-property',
      entries: 'object/entries',
      freeze: 'object/freeze',
      getOwnPropertyDescriptor: 'object/get-own-property-descriptor',
      getOwnPropertyDescriptors: 'object/get-own-property-descriptors',
      getOwnPropertyNames: 'object/get-own-property-names',
      getOwnPropertySymbols: 'object/get-own-property-symbols',
      getPrototypeOf: 'object/get-prototype-of',
      isExtensible: 'object/is-extensible',
      isFrozen: 'object/is-frozen',
      isSealed: 'object/is-sealed',
      is: 'object/is',
      keys: 'object/keys',
      preventExtensions: 'object/prevent-extensions',
      seal: 'object/seal',
      setPrototypeOf: 'object/set-prototype-of',
      values: 'object/values'
    },

    Math: {
      acosh: 'math/acosh',
      asinh: 'math/asinh',
      atanh: 'math/atanh',
      cbrt: 'math/cbrt',
      clz32: 'math/clz32',
      cosh: 'math/cosh',
      expm1: 'math/expm1',
      fround: 'math/fround',
      hypot: 'math/hypot',
      imul: 'math/imul',
      log10: 'math/log10',
      log1p: 'math/log1p',
      log2: 'math/log2',
      sign: 'math/sign',
      sinh: 'math/sinh',
      tanh: 'math/tanh',
      trunc: 'math/trunc',
      iaddh: 'math/iaddh',
      isubh: 'math/isubh',
      imulh: 'math/imulh',
      umulh: 'math/umulh'
    },

    Symbol: {
      for: 'symbol/for',
      hasInstance: 'symbol/has-instance',
      isConcatSpreadable: 'symbol/is-concat-spreadable',
      iterator: 'symbol/iterator',
      keyFor: 'symbol/key-for',
      match: 'symbol/match',
      replace: 'symbol/replace',
      search: 'symbol/search',
      species: 'symbol/species',
      split: 'symbol/split',
      toPrimitive: 'symbol/to-primitive',
      toStringTag: 'symbol/to-string-tag',
      unscopables: 'symbol/unscopables'
    },

    String: {
      at: 'string/at',
      codePointAt: 'string/code-point-at',
      endsWith: 'string/ends-with',
      fromCodePoint: 'string/from-code-point',
      includes: 'string/includes',
      matchAll: 'string/match-all',
      padStart: 'string/pad-start',
      padEnd: 'string/pad-end',
      raw: 'string/raw',
      repeat: 'string/repeat',
      startsWith: 'string/starts-with',
      trim: 'string/trim',
      trimLeft: 'string/trim-left',
      trimRight: 'string/trim-right',
      trimStart: 'string/trim-start',
      trimEnd: 'string/trim-end'
    },

    Number: {
      EPSILON: 'number/epsilon',
      isFinite: 'number/is-finite',
      isInteger: 'number/is-integer',
      isNaN: 'number/is-nan',
      isSafeInteger: 'number/is-safe-integer',
      MAX_SAFE_INTEGER: 'number/max-safe-integer',
      MIN_SAFE_INTEGER: 'number/min-safe-integer',
      parseFloat: 'number/parse-float',
      parseInt: 'number/parse-int'
    },

    Reflect: {
      apply: 'reflect/apply',
      construct: 'reflect/construct',
      defineProperty: 'reflect/define-property',
      deleteProperty: 'reflect/delete-property',
      getOwnPropertyDescriptor: 'reflect/get-own-property-descriptor',
      getPrototypeOf: 'reflect/get-prototype-of',
      get: 'reflect/get',
      has: 'reflect/has',
      isExtensible: 'reflect/is-extensible',
      ownKeys: 'reflect/own-keys',
      preventExtensions: 'reflect/prevent-extensions',
      setPrototypeOf: 'reflect/set-prototype-of',
      set: 'reflect/set',
      defineMetadata: 'reflect/define-metadata',
      deleteMetadata: 'reflect/delete-metadata',
      getMetadata: 'reflect/get-metadata',
      getMetadataKeys: 'reflect/get-metadata-keys',
      getOwnMetadata: 'reflect/get-own-metadata',
      getOwnMetadataKeys: 'reflect/get-own-metadata-keys',
      hasMetadata: 'reflect/has-metadata',
      hasOwnMetadata: 'reflect/has-own-metadata',
      metadata: 'reflect/metadata'
    },

    System: {
      global: 'system/global'
    },

    JSON: {
      stringify: 'json/stringify'
    },

    Date: {
      now: 'date/now' // temporary disabled
    }
    // Function: {
    //   Warning: /virtual/ method - prototype, not static, version
    //   bind: "function/virtual/bind" // temporary disabled
    // }
  }
};

const $main = document.getElementById('main');
if (__WEBPACK_IMPORTED_MODULE_0__libs_util__["default"].clientWidth <= 480) {
  $main.classList.add('small');
} else if (__WEBPACK_IMPORTED_MODULE_0__libs_util__["default"].clientWidth >= 1024) {
  $main.classList.add('big');
}
const tpl = {
  item(name, method = 'window') {
    const suport = isSuport(name, method);
    const clazz = suport ? 'green' : 'red';
    const nameText = method !== 'window' ? `${method}.${name}` : name;
    return `
      <li>
        <span>${nameText}: </span>
        <span style="color: ${clazz}">${suport}</span>
      </li>
    `;
  },
  itemWrap(dataArray) {
    return `<ul>${dataArray.join('')}</ul>`;
  },
  container(html, text) {
    return `
      <div class="container">
        <div class="hd">${text}</div>
        <div class="bd">${html}</div>
      </div>
    `;
  },
  header(curr = 'has') {
    const has = '<a class="on" href="./polyfill.html">has polyfill</a><a href="./nopolyfill.html">no polyfill</a>';
    const no = '<a href="./polyfill.html">has polyfill</a><a class="on" href="./nopolyfill.html">no polyfill</a>';
    return `
    <div class="header">
      <h1>ES6 Extend API Test</h1>
      <div class="nav">
        ${curr === 'has' ? has : no}
      </div>
    </div>
    `;
  }
};

const hasOwnProperty = Object.prototype.hasOwnProperty;
function isSuport(api, method) {
  let hasOwn = false;
  if (window[method]) {
    hasOwn = hasOwnProperty.call(window[method], api);
    if (!hasOwn && window[method] && window[method].prototype) {
      hasOwn = hasOwnProperty.call(window[method].prototype, api);
    }
  }
  return hasOwn;
}

function setSuportStatusToHtml(obj) {
  const htmlList = [];
  Object.keys(obj).forEach((key) => {
    htmlList.push(tpl.item(key));
  });
  return tpl.itemWrap(htmlList);
}

function renderBuiltins() {
  const builtinsHtml = setSuportStatusToHtml(data.builtins);
  return tpl.container(builtinsHtml, '内置函数支持：');
}

function renderMethods() {
  const htmlList = [];
  Object.keys(data.methods).forEach((method) => {
    const methodHtmlList = [];
    const methodApis = Object.keys(data.methods[method]);
    methodApis.forEach((api) => {
      methodHtmlList.push(tpl.item(api, method));
    });
    htmlList.push(tpl.container(tpl.itemWrap(methodHtmlList), `${method} API支持：`));
  });
  return htmlList.join('');
}

function render() {
  const pathname = window.location.pathname.split('/').pop();
  const header = pathname === 'polyfill.html' ? tpl.header('has') : tpl.header('no');
  $main.innerHTML = `${header}<div class="wrapper">${[renderBuiltins(), renderMethods()].join('')}</div>`;
}

render();


/***/ })

/******/ });