const win = window;
const ua = win.navigator.userAgent;
const isuc = ua.match(/(UCBrowser)/g) || ua.match(/(UCNewsApp)/g);
function setUrlParams(parmas) {
  const arr = [];
  /*eslint-disable*/
  for (var key in parmas) {
    arr.push(`${key}=${parmas[key]}`);
  }
  /*eslint-enable*/
  return arr.join('&');
}

export default function sendSdkLoadError({
  page_name,
  sdk_name,
  error_info
}) {
  const aid = win.getQueryString('app') || '';
  const params = {
    app: win.getQueryString('app') || '',
    zzd_from: win.getQueryString('zzd_from') || win.getQueryString('app') || '',
    uc: isuc ? 1 : 0,
    page_name,
    sdk_name,
    error_info,
    _: +new Date(),
    content: [JSON.stringify({ aid })],
    et: 'sdk-load-error',
    uc_param_str: 'dnnivebichfrmintnwcpgieiwidsudpf'
  };
  let src = `//m.uczzd.cn/log/api/v1/client/info?${setUrlParams(params)}`;
  if (isuc && win.navigator.sendBeacon) {
    src += '&is_beacon=1';
    win.navigator.sendBeacon(src, '');
  } else {
    const image = new window.Image();
    image.src = src;
  }
}

window.sendSdkLoadError = sendSdkLoadError;
