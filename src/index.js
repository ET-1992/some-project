import 'whatwg-fetch';
import cookie from './libs/cookie';
import domReady from './libs/domReady';
import envi from './libs/envi';
import lazyload from './libs/lazyload';
import storage from './libs/storage';
import stat from './libs/stat';
import uca from './libs/uca';
import util from './libs/util';
import version from './libs/version';
import md5 from './libs/md5';

const libs = {
  cookie, domReady, envi, lazyload, md5, stat, storage, uca, util, version
};

window.__SDKLIB__ = libs;
export default libs;
