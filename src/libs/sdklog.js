export default function ucsdkloaderLog(param) {
  try {
    const url = `${window.location.protocol}//bench.uc.cn/c?uc_param_str=ntnwcpfr`;
    let log = {};
    log.app_id = param.appid || 5564;
    log.d_model = param.logname || 'ucsdkloader';
    log.sdkname = param.sdkname || '';
    log.sdkurl = param.sdkurl || '';
    log.path = param.path || window.location.href;
    if (log.path && log.path.length > 253) {
      log.path = log.path.substring(0, 253);
    }
    log = JSON.stringify(log);
    if (!(navigator.sendBeacon && navigator.sendBeacon(url, log))) {
      const xhr = new XMLHttpRequest();
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(log);
    }
  } catch (e) {
    //console.log('ucsdkloaderLog error');
  }
}
window.ucsdkloaderLog = window.ucsdkloaderLog || ucsdkloaderLog;
