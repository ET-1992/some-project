import envi from './envi';
import util from './util';
import version from './version';

const location = window.location;
const { getQueryString, getSearchString } = util;
const appid = '27106a4ec356';
const api = location.protocol.includes('https') ? 'https://track.uc.cn/collect' : 'http://track.uc.cn/collect';
const defaultOptions = {
  appid
};

const getPage = () => {
  let page;
  const ua = navigator.userAgent;
  const isuc = ua.match(/(UCBrowser)/g) || ua.match(/(UCNewsApp)/g);
  const url = location.href;
  const host = location.host;
  const imgPgType = getQueryString('img_pg_type');
  const isShare = getQueryString('rd_type') === 'share';
  const pagetype = getQueryString('pagetype');

  page = url.match(/\/?([^/]*)(\?|#)/ig);
  page = RegExp.$1;
  page = page.replace('.html', '');

  // 第三方域名则为定制页
  if (!(host.includes('uczzd.cn') ||
    host.includes('sm.cn') ||
    host.includes('uc.cn') ||
    host.includes(':'))) {
    if (imgPgType && isShare) {
      page = 'third_party_album';
    } else {
      page = 'third_party';
    }

    return page;
  }

  switch (page) {
    case 'news':
      if (!isuc &&
        pagetype === 'share') {
        page = 'share';
      } else {
        page = 'index';
      }
      break;
    case 'album':
      if (imgPgType === '1') {
        page = 'album-news';
      } else if (imgPgType === '2') {
        page = 'album-story';
      } else if (imgPgType === '3') {
        page = 'album-list';
      }

      if (isShare) {
        page = `${page}-share`;
      }
      break;

    default:
  }

  return page;
};

const sendStat = (options) => {
  let url = '';

  if (envi.get('fr') === 'android' &&
    version.match(envi.get('ve'), '10.10.0~') &&
    navigator.sendBeacon) {
    Object.assign(options, {
      is_beacon: 1
    });

    url = `${api}?${getSearchString(options)}`;

    navigator.sendBeacon(url, '');
  } else if (envi.get('fr') === 'iphone' &&
    version.match(envi.get('ve'), '10.9.16~') &&
    window.ucapi.base && window.ucapi.base.sendBeacon) {
    url = `${api}?${getSearchString(options)}`;

    window.ucapi.base.sendBeacon({
      url,
      data: {
        is_beacon: 1
      }
    });
  } else {
    const image = document.createElement('img');
    url = `${api}?${getSearchString(options)}`;
    image.src = url;
  }
};


const Stat = {
  init: (options) => {
    Object.assign(defaultOptions, {
      pg: getPage() || '',
      host: location.host,
      aid: getQueryString('aid') || getQueryString('sm_article_id'),
      from: getQueryString('app'),
      uc_param_str: getQueryString('uc_param_str'),
      ...options
    });
  },
  pageview: (options) => {
    const opt = Object.assign({
      lt: 'xiss-pageview',
      _t: +(new Date()),
      ...options
    }, defaultOptions);

    sendStat(opt);
  },
  event: (options) => {
    const opt = Object.assign({
      lt: 'xiss-event',
      _t: +(new Date()),
      ...options
    }, defaultOptions);

    sendStat(opt);
  },
  error: (options) => {
    const opt = Object.assign({
      lt: 'xiss-error',
      _t: +(new Date()),
      ...options
    }, defaultOptions);

    sendStat(opt);
  }
};


Stat.init();

export default Stat;
