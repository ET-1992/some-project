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
export default {
  set,
  get
};
