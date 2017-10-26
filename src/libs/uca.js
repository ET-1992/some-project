const storage = require('./storage');
const envi = require('./envi');
const version = require('./version');
const util = require('./util');

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


export default Uca;
