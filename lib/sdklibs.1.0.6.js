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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cookie__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);



const location = window.location;
const envi = {};
const isCachePage = window.isHasCachePage || location.href.indexOf('#') >= 0;
let ucParam = __WEBPACK_IMPORTED_MODULE_0__cookie__["a" /* default */].get('_uc_pramas') || {};
let _os = {};
let _browser = {};
let _screen = {
  width: 0,
  height: 0
};


if (typeof ucParam === 'string') {
  ucParam = JSON.parse(decodeURIComponent(ucParam));
}

function getAll() {
  if (isCachePage) {
    const _ucPramas = __WEBPACK_IMPORTED_MODULE_0__cookie__["a" /* default */].get('_uc_pramas');
    if (typeof ucParam === 'string') {
      ucParam = JSON.parse(decodeURIComponent(ucParam));
    }

    ucParam = Object.assign(ucParam, _ucPramas);
  }

  return ucParam;
}

function get(key) {
  if (isCachePage) {
    const _ucPramas = __WEBPACK_IMPORTED_MODULE_0__cookie__["a" /* default */].get('_uc_pramas');
    if (typeof ucParam === 'string') {
      ucParam = JSON.parse(decodeURIComponent(ucParam));
    }

    ucParam = Object.assign(ucParam, _ucPramas);
  }

  switch (key) {
    // 平台   字符串，如： android、 sis、 ppc、 meego 等等。
    case 'fr':
      return ucParam.fr || _os.name;

    // 安装系列号 用'-'连接的字符串, 如1387061424-8f006c5d dn指的是客户端安装序列号
    // 服务器端无法 返回dn， 伪造一个uuid代替dn
    case 'dn':
      return ucParam.dn;

    // 设备标识
    case 'pr':
      return ucParam.pr;

    // 获取地域信息（isp:电信;prov:广东;city:广州;na:中国;cc:CN;ac:）
    case 'cp':
      return ucParam.cp;

    // net_type联网类型 (cmwap,cmnet,wifi,未知):'0',net:'1',wifi:'2',其它默认'99'
    case 'nt':
      return ucParam.nt;

    // 版本号  x.x.x.x,  如： 8.0.4.105  用于表示客户端对应的版本，详细见《版本管理参数》
    case 've':
      return ucParam.ve || getUCBrowserVersion();

    // 设备语言参数。按照国际惯例标准，语言_地区，其中语言全部小写，地区全部大写。
    case 'la':
      return ucParam.la;

    // LBS数据    mcc:mccvalue;mnc:mncvalue;lac:lacvalue;cid:cidvalue
    case 'li':
      return ucParam.li;

    // GPS数据 lat:latvalue;lon:lonvalue
    case 'gi':
      return ucParam.gi;

    // IMEI
    case 'si':
      return ucParam.si;

    // IMEI
    case 'ei':
      return ucParam.ei;

    // 手机说明信息   字符串。不同手机手机型号是不一样的。如：HTC Legend
    case 'mi':
      return ucParam.mi;

    // 操作系统版本   如：ppc03对应ppc2003、ce5对应wince5
    case 'os':
      return ucParam.os;

    // 设备逻辑分辨率   字符串。采用宽度x高度的方式 widthxheight，例如320x240
    case 'ss':
      return ucParam.ss;

    // wifi数据   上传格式：mac,signal;……mac,signal
    case 'wi':
      return ucParam.wi;

    // 设备像素分辨率  '字符串。采用宽度x高度的方式 widthxheight，
    case 'pi':
      return ucParam.pi;

    // 设备操作系统是否越狱。
    // 参数取值：0：不确定；1：越狱版；2：未越狱默认为0，Android，Java，Sis平台都统一默认处理
    case 'jb':
      return ucParam.jb;

    // 设备网络制式   '字符串：参数取值：2G，2.5G，2.75G，3G，4G，0无法判断网络制式取值为：0'
    case 'nw':
      return ucParam.nw;

    // 设备CPU信息  '字符串：参数取值：获取系统值，客户端不对值进行处理。无法获取参数值则填空'
    case 'cu':
      return ucParam.cu;

    // sn,安装系列号 用'-'连接3个字符串。如：1110-2910457331-b4b08318
    case 'ni':
      return ucParam.ni;

    // 专版ID int型参数。如Android=145，sis=50 等等
    case 'pf':
      return ucParam.pf;

    // 品牌ID  int型参数。ucmobile目前都是写 999
    case 'bi':
      return ucParam.bi;

    // 品牌GD  int型参数。淘宝消息推送
    case 'gd':
      return ucParam.gd;

    // 自版本号
    case 'sv':
      return ucParam.sv;

    // 设备高度
    case 'sHeight':
      return _screen.height || window.screen.availHeight;

    // 设备宽度
    case 'sWidth':
      return _screen.width || window.screen.availWidth;

    // 可视高度
    case 'cHeight':
      return document.documentElement.clientHeight;

    // 可视宽度
    case 'cWidth':
      return document.documentElement.clientWidth;
    default:
      return undefined;
  }
}

// 解析UA中浏览器的版本
function getUCBrowserVersion() {
  let regexp;
  const ua = navigator.userAgent;

  if (ua.indexOf('UCBrowser') > -1) {
    regexp = /UCBrowser\/+(.*?\s)/;
  } else if (ua.indexOf('UCNewsApp') > -1) {
    regexp = /UCNewsApp\/+(.*?\s)/;
  }

  let ret;
  if (regexp) {
    ua.match(regexp);
    ret = RegExp.$1;
  }
  return ret;
}

// 解析公参中的分辨率字符串

function getScreenSize(ssStr) {
  const ssStrFrag = (ssStr || '').toLowerCase().split('x');

  _screen.width = ssStrFrag[0];
  _screen.height = ssStrFrag[1];

  return _screen;
}

// 现只支持 ios ，android的系统信息识别
function getOSInfo(frStr) {
  const osNames = {
    iphone: 'iOS',
    ipad: 'iOS',
    apad: 'Android',
    aphone: 'Android',
    androidtv: 'Android'
  };
  const ua = navigator.userAgent;

  const android = ua.match(/(Android)\s+([\d.]+)/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const ucBrowser = ua.match(/(UCBrowser)/g);
  const ucNewsApp = ua.match(/(UCNewsApp)/g);
  const ucBrowserKernel = ua.match(/(Chrome)/g) && ua.match(/(UCBrowser)/g);

  _os.android = false;
  _os.ios = false;
  _os.iphone = false;
  _os.ipad = false;
  _os.aphone = false;
  _os.apad = false;

  if (frStr) {
    // 非android或ios时，直接使用平台名当做OS名
    _os.name = osNames[frStr] || frStr;

    // 获取公参中平台标识
    Object.keys(osNames).forEach(key => {
      _os[key] = (ucParam.fr === key);
    });
  } else {
    // 从UA中获取OS名
    if (android) {
      _os.name = 'android';
    }
    if (ipad || iphone) {
      _os.name = 'iOS';
    }
    // 获取UA中的平台标识，UC暂时无法获知apad还是aphone还是androidtv
    if (ipad) {
      _os.ipad = true;
    }

    if (iphone) {
      _os.name = 'iphone';
      _os.iphone = true;
    }
  }

  if (ucBrowser && !ucNewsApp) {
    _os.ucBrowser = true;
  }

  if (ucNewsApp) {
    _os.ucNewsApp = true;
  }

  if (ucBrowserKernel) {
    _os.ucBrowserKernel = true;
  }
  // 系统版本只能从UA拿了
  if (android) {
    _os.version = android[2] || '';
  }

  // 获取到的ios的版本号以'_'分割，转换为以'.'分割
  if (ipad) {
    _os.version = ipad[2] ? ipad[2].replace(/_/g, '.') : '';
  }
  if (iphone) {
    _os.version = iphone[2] ? iphone[2].replace(/_/g, '.') : '';
  }

  _os.android = _os.name && _os.name.toLowerCase() === 'android';
  // _os.ios = _os.name && _os.name.toLowerCase() === 'ios';
  _os.ios = _os.name && (_os.name.toLowerCase() === 'ios' || _os.name.toLowerCase() === 'iphone');

  if (!_os.name) {
    _os.name = '';
  }

  return _os;
}

// 除了UC浏览器的版本号，其他的浏览器信息基本为从UA中获取
function getBrowserInfo(veStr) {
  const ua = navigator.userAgent;
  const webkit = ua.match(/WebKit\/([\d.]+)/);
  const uc = ua.match(/UC[a-zA-Z]*?/);
  const ucversion = ua.match(/UC[a-zA-Z]*?\/([\d.]+)/);

  _browser.version = null;
  _browser.uc = false;
  _browser.ucNews = false;
  _browser.safari = false;
  _browser.webkit = false;
  _browser.wechat = false;
  _browser.qq = false;
  _browser.weibo = false;

  if (veStr) {
    _browser.version = veStr;
  } else if (uc && ucversion) {
    _browser.version = ucversion[1];
  }

  _browser.ucNews = !!/UCNewsApp/gi.test(ua);
  _browser.uc = !!uc && !_browser.ucNews;
  _browser.webkit = !!webkit;
  // 发现UA带iPhone或iPad字段，默认为safari浏览器
  _browser.safari = !!(ua.match(/(iPhone|iPad)/) && ua.match(/AppleWebKit/) && /safari\//gi.test(ua));
  _browser.wechat = !!/MicroMessenger/gi.test(ua);
  _browser.qq = !!/MQQBrowser/gi.test(ua);
  _browser.weibo = !!/weibo/gi.test(ua);
  _browser.huawei = /huawei/gi.test(ua);

  return _browser;
}

/**
 *   获取URL上的参数
 **/

function urlQueries() {
  return __WEBPACK_IMPORTED_MODULE_1__util__["default"].getUrlParams(location.href);
}

/**
 *  更新一次环境模块的所有属性变量
 **/

function detect() {
  ucParam = ucParam || {};

  // 继承url上的参数
  ucParam = Object.assign(ucParam, urlQueries());
  // 从公参中获取屏幕分辨率
  _screen = getScreenSize(ucParam.ss);
  // 从公参和UA中获取系统信息
  _os = getOSInfo(ucParam.fr);
  _browser = getBrowserInfo(ucParam.ve);
}

// 获取信息
detect();

envi.get = get;
envi.getAll = getAll;
envi.detect = detect;
envi.os = _os;
envi.browser = _browser;

/* harmony default export */ __webpack_exports__["default"] = (envi);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function Storage(win, lib) {
  let hasLocalStorage;
  const _storage = {};

  try {
    hasLocalStorage = ('localStorage' in win) && localStorage !== null;
  } catch (e) {
    hasLocalStorage = false;
  }

  lib.storage = Object.assign({}, {
    hasLocalStorage,
    get(key) {
      let obj;

      if (this.hasLocalStorage) {
        const value = localStorage.getItem(key);
        try {
          obj = JSON.parse(value);
        } catch (e) {
          obj = value;
        }
      } else {
        obj = _storage[key];
      }

      if (obj && obj.data) {
        if (!('expire' in obj) || obj.expire > Date.now()) {
          return obj.data;
        }
        this.remove(key);
      }
      return null;
    },
    set(key, value, expire) {
      const obj = {
        data: value
      };
      if (expire > 0) {
        obj.expire = Date.now() + expire * 1000;
      }

      if (this.hasLocalStorage) {
        localStorage.setItem(key, JSON.stringify(obj));
      } else {
        _storage[key] = obj;
      }
      return value;
    },
    remove(key) {
      if (this.hasLocalStorage) {
        localStorage.removeItem(key);
      } else {
        delete _storage[key];
      }
    },
    removeExpired() {
      Object.keys(localStorage).forEach((key) => {
        this.get(key);
      }, lib.storage);
    }
  });

  if (hasLocalStorage) {
    lib.storage.removeExpired();
  }
}(window, window.__UCLIB__ || (window.__UCLIB__ = {})));


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* eslint-disable */
// 版本判断
const rules = {
  range: /^\s*([\d.]+)~([\d.]+)\s*$/,
  min: /^\s*([\d.]+)~\s*$/,
  max: /^\s*~([\d.]+)\s*$/
};

/**
 * [版本判断]
 * @param  {string} tarVer  [需要判断的版本号]
 * @param  {string} verRule [判定规则]
 * @example
 *    a) "9.5~" 版本号大于等于9.5
 *    b) "9.5~9.7" 版本号大于等于9.5小于9.7
 *    b) "~9.5" 版本号小于9.5
 * @return {boolen}         [ture or false]
 */
const match = (tarVer, verRule) => {
  // 缺省版本位权值
  let bitValue = 100;
  let ruleMatches;
  let minVer;
  let maxVer;
  let tar;
  let min;
  let max;
  let ret;
  if (verRule.match(rules.range)) {
    ruleMatches = verRule.match(rules.range);
    minVer = ruleMatches[1];
    maxVer = ruleMatches[2];
    bitValue = getMaxBitLength([tarVer, minVer, maxVer]);
    tar = calcVersionValue(tarVer, bitValue);
    min = calcVersionValue(minVer, bitValue);
    max = calcVersionValue(maxVer, bitValue);
    ret = tar >= min && tar < max;
  } else if (verRule.match(rules.min)) {
    ruleMatches = verRule.match(rules.min);
    minVer = ruleMatches[1];
    bitValue = getMaxBitLength([tarVer, minVer]);
    tar = calcVersionValue(tarVer, bitValue);
    min = calcVersionValue(minVer, bitValue);
    ret = tar >= min;
  } else if (verRule.match(rules.max)) {
    ruleMatches = verRule.match(rules.max);
    maxVer = ruleMatches[1];
    bitValue = getMaxBitLength([tarVer, maxVer]);
    tar = calcVersionValue(tarVer, bitValue);
    max = calcVersionValue(maxVer, bitValue);
    ret = tar < max;
  } else {
    // 规则匹配失败
    ret = '';
  }
  return ret;
};

/**
 * [将版本号转化为可比较运算的number]
 * @param  {string} verStr [版本号]
 * @param  {string} bitVal [缺省版本位权值]
 * @return {number}        [版本数]
 */
function calcVersionValue(verStr, bitVal) {
  if (!/\./.test(verStr)) {
    return 0;
  }
  const bits = verStr.split('.');
  const baseBitValue = bitVal ** 3;
  let value = 0;
  bits.forEach((bit, index) => {
    value += bit * baseBitValue * (bitVal ** (0 - index));
  });
  return value;
}

/**
 * 获取版本号中最长位
 * @param  {String} versions [description]
 * @return {Number}          [description]
 */
function getMaxBitLength(_versions) {
  let maxLen = 1;
  let versions = _versions;
  if (typeof versions === 'string') {
    versions = [versions];
  }

  versions.forEach(ver => {
    if (/\./.test(ver)) {
      ver.split('.').forEach(verBit => {
        if (verBit.length > maxLen) {
          maxLen = verBit.length;
        }
      });
    }
  });
  return (10 ** maxLen);
}

/**
 * [判断-javascript对象类型]
 * @param  {String}  type [Array|Boolean|Date|Math|Number|String|RegExp .....]
 * @param  {Object}  obj  [对象类型名称]
 * @return {Boolean}      [true or false]
 */
// function isObjectType(type, obj) {
//   return Object.prototype.toString.call(obj).indexOf('[object ' + type) === 0;
// }

/* harmony default export */ __webpack_exports__["default"] = ({
  match
});

/** **  testing  ****/
// console.log('9.6', '9.6~', match('9.6', '9.6~'));
// console.log('9.6', '9.6~9.7.12', match('9.6', '9.6~9.7.12'));
// console.log('9.6', '~9.4.999', match('9.6', '~9.4.999'));


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_rest_css__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_rest_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_rest_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_cookie__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_domReady__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_envi__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_lazyload__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libs_storage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libs_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__libs_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libs_stat__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libs_stat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__libs_stat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__libs_uca__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__libs_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__libs_version__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__libs_md5__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__libs_Event__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__libs_Event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__libs_Event__);













const libs = {
  cookie: __WEBPACK_IMPORTED_MODULE_1__libs_cookie__["a" /* default */], domReady: __WEBPACK_IMPORTED_MODULE_2__libs_domReady__["a" /* default */], envi: __WEBPACK_IMPORTED_MODULE_3__libs_envi__["default"], lazyload: __WEBPACK_IMPORTED_MODULE_4__libs_lazyload__["a" /* default */], md5: __WEBPACK_IMPORTED_MODULE_10__libs_md5__["a" /* default */], stat: __WEBPACK_IMPORTED_MODULE_6__libs_stat__["default"], storage: __WEBPACK_IMPORTED_MODULE_5__libs_storage___default.a, uca: __WEBPACK_IMPORTED_MODULE_7__libs_uca__["a" /* default */], util: __WEBPACK_IMPORTED_MODULE_8__libs_util__["default"], version: __WEBPACK_IMPORTED_MODULE_9__libs_version__["default"], CustomEvent: __WEBPACK_IMPORTED_MODULE_11__libs_Event__["default"]
};

window.__SDKLIB__ = libs;
/* harmony default export */ __webpack_exports__["default"] = (libs);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./rest.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./rest.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "/**\n * 这是一个全局css\n * 不要修改此文件，增加全局的css样式可能会影响到其他项目\n * 每个项目请遵照css module的规则书写样式\n */\n\nhtml, body {\n  font-family: sans-serif;\n  overflow-x: hidden;\n}\n\nbody {\n  /* font-size: 16px; */\n  color: #333;\n  -webkit-text-size-adjust: none;\n  text-size-adjust: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\nhtml, body, span, div, p, a, table, tbody, td, h1, h2, h3, img, form, font, strong, b, i, dl, dt, dd, ol, ul, li, dl, dd, dt, iframe, label, blockquote, input, em, dfn, button {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  font-style: normal;\n}\n\nimg {\n  vertical-align: middle;\n  border: none;\n}\n\nnav, footer, section, article, aside {\n  display: block;\n}\n\nbutton, input, select, textarea {\n  font-size: 100%;\n  font-family: inherit;\n}\n\n\na:link {\n  text-decoration: none;\n}\na:visited {\n  color: #666;\n}\n\n/* 清理浮动 */\n.clear {\n  zoom: 1;\n}\n.clear:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \"\";\n  clear: both;\n  height: 0;\n}\n\n/* 全局的隐藏 */\n\n.hide,\n.fn-hide {\n  display: none !important;\n}\n\n/**\n * 不要修改此文件，增加全局的css样式可能会影响到其他项目\n */\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable*/
var domReady = window.domReady = (function() {
  var fns = [], listener
    , doc = typeof document === 'object' && document
    , hack = doc && doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = doc && (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)

  if (!loaded && doc)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }
})();

/* harmony default export */ __webpack_exports__["a"] = (domReady);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const win = window;

win.LazyLoad = (() => {
  const defaultSettings = {
    elements_selector: 'img',
    container: win,
    threshold: 300,
    throttle: 150,
    data_src: 'original',
    data_srcset: 'originalSet',
    class_loading: 'loading',
    class_loaded: 'loaded',
    class_error: 'error',
    class_initial: 'initial',
    skip_invisible: true,
    callback_load: null,
    callback_error: null,
    callback_set: null,
    callback_processed: null
  };

  const isBot = !('onscroll' in win) || /glebot/.test(navigator.userAgent);

  const callCallback = (callback, argument) => {
    if (callback) { callback(argument); }
  };

  const getTopOffset = (element) => element.getBoundingClientRect().top
    + (win.pageYOffset - element.ownerDocument.documentElement.clientTop);

  const isBelowViewport = (element, container, threshold) => {
    const fold = (container === win) ?
      win.innerHeight + win.pageYOffset :
      getTopOffset(container) + container.offsetHeight;
    return fold <= getTopOffset(element) - threshold;
  };

  const getLeftOffset = (element) => element.getBoundingClientRect().left
    + (win.pageXOffset - element.ownerDocument.documentElement.clientLeft);

  const isAtRightOfViewport = (element, container, threshold) => {
    const documentWidth = win.innerWidth;
    const fold = (container === win) ?
      documentWidth + win.pageXOffset :
      getLeftOffset(container) + documentWidth;
    return fold <= getLeftOffset(element) - threshold;
  };

  const isAboveViewport = (element, container, threshold) => {
    const fold = (container === win) ? win.pageYOffset : getTopOffset(container);
    return fold >= getTopOffset(element) + threshold + element.offsetHeight;
  };

  const isAtLeftOfViewport = (element, container, threshold) => {
    const fold = (container === win) ? win.pageXOffset : getLeftOffset(container);
    return fold >= getLeftOffset(element) + threshold + element.offsetWidth;
  };

  const isInsideViewport = (element, container, threshold) => !isBelowViewport(element, container, threshold) &&
    !isAboveViewport(element, container, threshold) &&
    !isAtRightOfViewport(element, container, threshold) &&
    !isAtLeftOfViewport(element, container, threshold);


  const setSourcesForPicture = (element, srcsetDataAttribute) => {
    const parent = element.parentElement;
    if (parent.tagName !== 'PICTURE') {
      return;
    }
    for (let i = 0; i < parent.children.length; i++) {
      const pictureChild = parent.children[i];
      if (pictureChild.tagName === 'SOURCE') {
        const sourceSrcset = pictureChild.dataset[srcsetDataAttribute];
        if (sourceSrcset) {
          pictureChild.setAttribute('srcset', sourceSrcset);
        }
      }
    }
  };

  const setSources = (element, srcsetDataAttribute, srcDataAttribute) => {
    const tagName = element.tagName;
    const elementSrc = element.dataset[srcDataAttribute];
    if (tagName === 'IMG') {
      setSourcesForPicture(element, srcsetDataAttribute);
      const imgSrcset = element.dataset[srcsetDataAttribute];
      if (imgSrcset) {
        element.setAttribute('srcset', imgSrcset);
      }
      if (elementSrc) {
        element.setAttribute('src', elementSrc);
      }
      return;
    }
    if (tagName === 'IFRAME') {
      if (elementSrc) {
        element.setAttribute('src', elementSrc);
      }
      return;
    }
    if (elementSrc) {
      element.style.backgroundImage = `url("${elementSrc}")`;
    }
  };

  class LazyLoad {
    constructor(instanceSettings) {
      this._settings = Object.assign({}, defaultSettings, instanceSettings);
      this._queryOriginNode = this._settings.container === win ? document : this._settings.container;

      this._previousLoopTime = 0;
      this._loopTimeout = null;
      this._boundHandleScroll = this.handleScroll.bind(this);

      this._isFirstLoop = true;
      win.addEventListener('resize', this._boundHandleScroll);
      this.update();
    }
    /*
   * Private methods
   */

    _reveal(element) {
      const settings = this._settings;

      function errorCallback() {
      /**
       * As this method is asynchronous, it must be protected against external destroy() calls
       */
        if (!settings) { return; }
        element.removeEventListener('load', loadCallback);
        element.removeEventListener('error', errorCallback);
        element.classList.remove(settings.class_loading);
        element.classList.add(settings.class_error);
        callCallback(settings.callback_error, element);
      }

      function loadCallback() {
      /* As this method is asynchronous, it must be protected against external destroy() calls */
        if (!settings) { return; }
        element.classList.remove(settings.class_loading);
        element.classList.add(settings.class_loaded);
        element.removeEventListener('load', loadCallback);
        element.removeEventListener('error', errorCallback);
        /* Calling LOAD callback */
        callCallback(settings.callback_load, element);
      }

      if (element.tagName === 'IMG' || element.tagName === 'IFRAME') {
        element.addEventListener('load', loadCallback);
        element.addEventListener('error', errorCallback);
        element.classList.add(settings.class_loading);
      }

      setSources(element, settings.data_srcset, settings.data_src);
      /* Calling SET callback */
      callCallback(settings.callback_set, element);
    }

    _loopThroughElements() {
      const settings = this._settings;
      const elements = this._elements;
      const elementsLength = (!elements) ? 0 : elements.length;
      const processedIndexes = [];
      const firstLoop = this._isFirstLoop;

      for (let i = 0; i < elementsLength; i++) {
        const element = elements[i];
        /* If must skip_invisible and element is invisible, skip it */
        if (settings.skip_invisible && (element.offsetParent === null)) {
          continue; // eslint-disable-line
        }

        if (isBot || isInsideViewport(element, settings.container, settings.threshold)) {
          if (firstLoop) {
            element.classList.add(settings.class_initial);
          }
          /* Start loading the image */
          this._reveal(element);
          /* Marking the element as processed. */
          processedIndexes.push(i);
          element.dataset.wasProcessed = true;
        }
      }
      /* Removing processed elements from this._elements. */
      while (processedIndexes.length) {
        elements.splice(processedIndexes.pop(), 1);
        /* Calling the end loop callback */
        callCallback(settings.callback_processed, elements.length);
      }
      /* Stop listening to scroll event when 0 elements remains */
      if (elementsLength === 0) {
        this._stopScrollHandler();
      }
      /* Sets isFirstLoop to false */
      if (firstLoop) {
        this._isFirstLoop = false;
      }
    }

    _purgeElements() {
      const elements = this._elements;
      const elementsLength = elements.length;
      const elementsToPurge = [];

      for (let i = 0; i < elementsLength; i++) {
        const element = elements[i];
        /* If the element has already been processed, skip it */
        if (element.dataset.wasProcessed) {
          elementsToPurge.push(i);
        }
      }
      /* Removing elements to purge from this._elements. */
      while (elementsToPurge.length > 0) {
        elements.splice(elementsToPurge.pop(), 1);
      }
    }

    _startScrollHandler() {
      if (!this._isHandlingScroll) {
        this._isHandlingScroll = true;
        this._settings.container.addEventListener('scroll', this._boundHandleScroll);
      }
    }

    _stopScrollHandler() {
      if (this._isHandlingScroll) {
        this._isHandlingScroll = false;
        this._settings.container.removeEventListener('scroll', this._boundHandleScroll);
      }
    }

    handleScroll() {
      const throttle = this._settings.throttle;

      if (throttle !== 0) {
        const now = Date.now();
        const remainingTime = throttle - (now - this._previousLoopTime);
        if (remainingTime <= 0 || remainingTime > throttle) {
          if (this._loopTimeout) {
            clearTimeout(this._loopTimeout);
            this._loopTimeout = null;
          }
          this._previousLoopTime = now;
          this._loopThroughElements();
        } else if (!this._loopTimeout) {
          this._loopTimeout = setTimeout(() => {
            this._previousLoopTime = Date.now();
            this._loopTimeout = null;
            this._loopThroughElements();
          }, remainingTime);
        }
      } else {
        this._loopThroughElements();
      }
    }

    update() {
      this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
      this._purgeElements();
      this._loopThroughElements();
      this._startScrollHandler();
    }

    destroy() {
      win.removeEventListener('resize', this._boundHandleScroll);
      if (this._loopTimeout) {
        clearTimeout(this._loopTimeout);
        this._loopTimeout = null;
      }
      this._stopScrollHandler();
      this._elements = null;
      this._queryOriginNode = null;
      this._settings = null;
    }
  }

  return LazyLoad;
})();


/* harmony default export */ __webpack_exports__["a"] = (win.LazyLoad);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (110:6)\nYou may need an appropriate loader to handle this file type.\n|       from: getQueryString('app'),\n|       uc_param_str: getQueryString('uc_param_str'),\n|       ...options\n|     });\n|   },");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const storage = __webpack_require__(3);
const envi = __webpack_require__(2);
const version = __webpack_require__(4);
const util = __webpack_require__(1);

const win = window;
const doc = document;
const location = win.location;
const domain = '//m.uczzd.cn';

function Uca(type, params) {
  params = params || {};
  const api = `${domain}/log/api/v1/element/{type}`;

  const urlMap = {
    click: api.replace('$type$', 'click-log'),
    event: api.replace('$type$', 'event-log'),
    scroll: api.replace('$type$', `pg_${params.index}`),
    info: `${domain}/log/api/v1/client/info`
  };

  if (!urlMap[type]) {
    if (type === 'pvLog') {
      urlMap[type] = win.conf.api.flow;
    } else {
      urlMap[type] = api.replace('$type$', type);
    }
  }

  let _uacUrl = `${urlMap[type]}?${util.addCommonUrlParam()}`;

  params.page = params.page || getPage();

  params._ = +new Date();

  // 是否为风险媒体
  params.xss_nrd = util.getQueryString('xss_nrd');
  params.rd_id = params.rd_id || storage.get('_read_id') || '';
  params.rc_id = params.rc_id || util.getQueryString('recoId') || '';

  params.content = params.content || '';
  params.et = params.et || '';

  _uacUrl += `&${util.getSearchString(params)}`;

  if (envi.get('fr') === 'android' &&
    version.match(envi.get('ve'), '10.10.0~') &&
    navigator.sendBeacon) {
    _uacUrl += '&is_beacon=1';

    navigator.sendBeacon(_uacUrl, '');
  } else {
    const image = doc.createElement('img');
    image.src = _uacUrl;
  }
}

function getPage() {
  let page;
  const url = location.href;
  const host = location.host;

  page = url.match(/\/?([^/]*)(\?|#)/ig);
  page = RegExp.$1;
  page = page.replace('.html', '');

  // 第三方域名则为定制页
  if (!(host.indexOf('uczzd.cn') > -1 ||
    host.indexOf('sm.cn') > -1 ||
    host.indexOf('uc.cn') > -1 ||
    host.indexOf(':') > -1)) {
    page = 'third_party';
    return page;
  }
  /*eslint-disable*/
  switch (page) {
    case 'news':
      if (!envi.os.ucBrowser &&
        util.getQueryString('pagetype') === 'share') {
        page = 'share';
      } else {
        page = 'index';
      }
      break;
    case 'xissAllComments':
      page = 'comments';
      break;
    case 'comment-detail':
      page = 'detail';
      break;
    case 'my-comments':
      page = 'my_comments';
      break;
  }
  /*eslint-enable*/
  return page;
}

// pv统计
// _uca('info', {
//   et: 'pageview',
//   aid: util.getQueryString('aid'),
//   cid: util.getQueryString('cid'),
//   rd_type: util.getQueryString('rd_type'),
//   oppo: util.getOppoVal(),
//   // 须传空值
//   content: ''
// });


/* harmony default export */ __webpack_exports__["a"] = (Uca);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable*/
var hex_chr = "0123456789abcdef";

function rhex(num) {
  var str = "";
  for (var j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
    hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

function str2blks_MD5(str) {
  var nblk = ((str.length + 8) >> 6) + 1;
  var blks = new Array(nblk * 16);
  for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
  for (var i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

function add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t) {
  return add(rol(add(add(a, q), add(x, t)), s), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md5(str) {
  var x = str2blks_MD5(str);
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

/* harmony default export */ __webpack_exports__["a"] = (md5);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (9:8)\nYou may need an appropriate loader to handle this file type.\n| const removeEventListener = Symbol('removeEventListener');\n| class CustomEvent {\n|   events={};\n|   funProperty={};\n|   constructor({ obj, eventNames = [] }) {");

/***/ })
/******/ ]);