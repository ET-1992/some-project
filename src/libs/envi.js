import cookie from './cookie';
import util from './util';

const location = window.location;
const envi = {};
const isCachePage = window.isHasCachePage || location.href.indexOf('#') >= 0;
let ucParam = cookie.get('_uc_pramas') || {};
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
    const _ucPramas = cookie.get('_uc_pramas');
    if (typeof ucParam === 'string') {
      ucParam = JSON.parse(decodeURIComponent(ucParam));
    }

    ucParam = Object.assign(ucParam, _ucPramas);
  }

  return ucParam;
}

function get(key) {
  if (isCachePage) {
    const _ucPramas = cookie.get('_uc_pramas');
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
  return util.getUrlParams(location.href);
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

export default envi;
