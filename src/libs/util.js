import cookie from './cookie';

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
    let sn = localStorage.getItem('user_sn') || cookie.get('sn');
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

export default util;
