// import './css/rest.css';
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
import CustomEvent from './libs/Event';
import _uca_ from './libs/_uca_';
import sendSdkLoadError from './libs/sendSdkLoadError';

const libs = {
  cookie, domReady, envi, lazyload, md5, stat, storage, uca, util, version, CustomEvent, _uca_, sendSdkLoadError
};

window.__SDKLIB__ = libs;
export default libs;
