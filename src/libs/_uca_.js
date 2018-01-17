// 喜刷刷页端统一打点，目前统一了分享，点赞，举报，推荐，标签
// 涉及范围只在 定制页和转码页 没有分享页  打点接口统一走info
/*eslint-disable*/

function setUrlParams(parmas) {
  return Object.keys(parmas).reduce((sum, value) => {
    return `${sum}&${value}=${parmas[value]}`;
  }, '');
}

function getQueryString(name) {
    const reg = new RegExp(`(\\?|^|&|#)${name}=([^&|^#]*)(&|$|#)`, 'i');
    const r = window.location.href.match(reg);
    if (r != null) {return decodeURIComponent(r[2]);}
    return '';
  }

function getPage(_browser) {
  var page;
  var pathName = window.location.pathname;
  if (pathName.indexOf('/webview/video') > -1) {
    page = 'video'
  } else {
    page = 'article'
  }
  return page;
}

function getPageFrom() {
  // 判断喜刷刷 定制页 自媒体
  var pageFrom,
    host = window.location.host;

    if (host.indexOf('uczzd.cn') > -1) {
      pageFrom = 'xiss'
    } else if (host.indexOf('mp.uc.cn') > -1) {
      pageFrom = 'zmt'
    } else {
      pageFrom = 'customize'
    }

    return pageFrom;
}

var _browser = (function getBrowserInfo() {
  var _browser = {},
    ua = navigator.userAgent,
    webkit = ua.match(/WebKit\/([\d.]+)/),
    uc = ua.match(/UC[a-zA-Z]*?/),
    ucversion = ua.match(/UC[a-zA-Z]*?\/([\d.]+)/),
    android = ua.match(/(Android)\s+([\d.]+)/),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

  _browser.version = null;
  _browser.uc = false;
  _browser.ucNews = false;
  _browser.safari = false;
  _browser.webkit = false;
  _browser.wechat = false;
  _browser.qq = false;
  _browser.weibo = false;
  _browser.android = false;
  _browser.ipad = false;
  _browser.iphone = false;


  _browser.ucNews = !!/UCNewsApp/gi.test(ua);
  _browser.uc = !!uc && !_browser.ucNews;
  _browser.webkit = !!webkit;
  // 发现UA带iPhone或iPad字段，默认为safari浏览器
  _browser.safari = !!(ua.match(/(iPhone|iPad)/) && ua.match(/AppleWebKit/) && /safari\//gi.test(ua));
  _browser.wechat = !!/MicroMessenger/gi.test(ua);
  _browser.qq = !!/MQQBrowser/gi.test(ua);
  _browser.weibo = !!/weibo/gi.test(ua);
  _browser.huawei = /huawei/gi.test(ua);
  _browser.android = !!android;
  _browser.ipad = !!ipad;
  _browser.iphone = !!iphone;
  _browser.os = (ipad || iphone) ? 'ios' : 'android';

  return _browser;
})();


export default function _uca_(_params = {}) {
  var data = window.xissJsonData || {};
  var initParams = {
    title: data.title,
    item_type: data.item_type,
    ch_id: getQueryString('cid') || data.cid,
    reco_id: getQueryString('recoid') || data.recoid,
    item_id: getQueryString('aid') || data.id,
    app: getQueryString('app'),
    uc: _browser.uc ? 1 : 0,
    fr: _browser.os,
    page: getPage(_browser),
    _: +new Date(),
    et: 'iflow-article',
    content: JSON.stringify([{aid: data.id}]),
    uc_param_str: 'dnnivebichfrmintnwcpgieiwidsudpf',
    page_form: getPageFrom(),
    host: window.location.host
  };

  var params = Object.assign({}, initParams, _params);
  var src = `//m.uczzd.cn/log/api/v1/client/info?${setUrlParams(params).slice(1)}`;

  if (_browser.os === 'android' && window.navigator.sendBeacon) {
    src += '&is_beacon=1';
    window.navigator.sendBeacon(src, '');
  } else {
    var image = new window.Image();
    image.src = src;
  }
}

// // pv统计
// _uca_({
//   action: 'visit',
//   region: 'view'
// })

// 兼容Object.assign
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

// 兼容Object.keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
