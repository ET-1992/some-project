import util from './libs/util';

const data = {
  builtins: {
    Promise: 'promise',
    fetch: 'fetch',
    Map: 'map',
    Set: 'set',
    WeakMap: 'weak-map',
    WeakSet: 'weak-set',
    Observable: 'observable',
    Symbol: 'symbol',
    setImmediate: 'set-immediate',
    clearImmediate: 'clear-immediate',
    asap: 'asap'
    //parseFloat: "parse-float", // temporary disabled
    //parseInt: "parse-int" // temporary disabled
  },

  methods: {
    Array: {
      copyWithin: 'array/copy-within',
      entries: 'array/entries',
      every: 'array/every',
      fill: 'array/fill',
      filter: 'array/filter',
      findIndex: 'array/find-index',
      find: 'array/find',
      forEach: 'array/for-each',
      from: 'array/from',
      includes: 'array/includes',
      indexOf: 'array/index-of',
      isArray: 'array/is-array', // temporary disabled
      join: 'array/join',
      keys: 'array/keys',
      lastIndexOf: 'array/last-index-of',
      map: 'array/map',
      of: 'array/of',
      reduceRight: 'array/reduce-right',
      reduce: 'array/reduce',
      some: 'array/some',
      sort: 'array/sort',
      splice: 'array/splice',
      values: 'array/values'
    },

    Object: {
      assign: 'object/assign',
      create: 'object/create',
      defineProperties: 'object/define-properties',
      defineProperty: 'object/define-property',
      entries: 'object/entries',
      freeze: 'object/freeze',
      getOwnPropertyDescriptor: 'object/get-own-property-descriptor',
      getOwnPropertyDescriptors: 'object/get-own-property-descriptors',
      getOwnPropertyNames: 'object/get-own-property-names',
      getOwnPropertySymbols: 'object/get-own-property-symbols',
      getPrototypeOf: 'object/get-prototype-of',
      isExtensible: 'object/is-extensible',
      isFrozen: 'object/is-frozen',
      isSealed: 'object/is-sealed',
      is: 'object/is',
      keys: 'object/keys',
      preventExtensions: 'object/prevent-extensions',
      seal: 'object/seal',
      setPrototypeOf: 'object/set-prototype-of',
      values: 'object/values'
    },

    Math: {
      acosh: 'math/acosh',
      asinh: 'math/asinh',
      atanh: 'math/atanh',
      cbrt: 'math/cbrt',
      clz32: 'math/clz32',
      cosh: 'math/cosh',
      expm1: 'math/expm1',
      fround: 'math/fround',
      hypot: 'math/hypot',
      imul: 'math/imul',
      log10: 'math/log10',
      log1p: 'math/log1p',
      log2: 'math/log2',
      sign: 'math/sign',
      sinh: 'math/sinh',
      tanh: 'math/tanh',
      trunc: 'math/trunc',
      iaddh: 'math/iaddh',
      isubh: 'math/isubh',
      imulh: 'math/imulh',
      umulh: 'math/umulh'
    },

    Symbol: {
      for: 'symbol/for',
      hasInstance: 'symbol/has-instance',
      isConcatSpreadable: 'symbol/is-concat-spreadable',
      iterator: 'symbol/iterator',
      keyFor: 'symbol/key-for',
      match: 'symbol/match',
      replace: 'symbol/replace',
      search: 'symbol/search',
      species: 'symbol/species',
      split: 'symbol/split',
      toPrimitive: 'symbol/to-primitive',
      toStringTag: 'symbol/to-string-tag',
      unscopables: 'symbol/unscopables'
    },

    String: {
      at: 'string/at',
      codePointAt: 'string/code-point-at',
      endsWith: 'string/ends-with',
      fromCodePoint: 'string/from-code-point',
      includes: 'string/includes',
      matchAll: 'string/match-all',
      padStart: 'string/pad-start',
      padEnd: 'string/pad-end',
      raw: 'string/raw',
      repeat: 'string/repeat',
      startsWith: 'string/starts-with',
      trim: 'string/trim',
      trimLeft: 'string/trim-left',
      trimRight: 'string/trim-right',
      trimStart: 'string/trim-start',
      trimEnd: 'string/trim-end'
    },

    Number: {
      EPSILON: 'number/epsilon',
      isFinite: 'number/is-finite',
      isInteger: 'number/is-integer',
      isNaN: 'number/is-nan',
      isSafeInteger: 'number/is-safe-integer',
      MAX_SAFE_INTEGER: 'number/max-safe-integer',
      MIN_SAFE_INTEGER: 'number/min-safe-integer',
      parseFloat: 'number/parse-float',
      parseInt: 'number/parse-int'
    },

    Reflect: {
      apply: 'reflect/apply',
      construct: 'reflect/construct',
      defineProperty: 'reflect/define-property',
      deleteProperty: 'reflect/delete-property',
      getOwnPropertyDescriptor: 'reflect/get-own-property-descriptor',
      getPrototypeOf: 'reflect/get-prototype-of',
      get: 'reflect/get',
      has: 'reflect/has',
      isExtensible: 'reflect/is-extensible',
      ownKeys: 'reflect/own-keys',
      preventExtensions: 'reflect/prevent-extensions',
      setPrototypeOf: 'reflect/set-prototype-of',
      set: 'reflect/set',
      defineMetadata: 'reflect/define-metadata',
      deleteMetadata: 'reflect/delete-metadata',
      getMetadata: 'reflect/get-metadata',
      getMetadataKeys: 'reflect/get-metadata-keys',
      getOwnMetadata: 'reflect/get-own-metadata',
      getOwnMetadataKeys: 'reflect/get-own-metadata-keys',
      hasMetadata: 'reflect/has-metadata',
      hasOwnMetadata: 'reflect/has-own-metadata',
      metadata: 'reflect/metadata'
    },

    System: {
      global: 'system/global'
    },

    JSON: {
      stringify: 'json/stringify'
    },

    Date: {
      now: 'date/now' // temporary disabled
    }
    // Function: {
    //   Warning: /virtual/ method - prototype, not static, version
    //   bind: "function/virtual/bind" // temporary disabled
    // }
  }
};

const $main = document.getElementById('main');
if (util.clientWidth <= 480) {
  $main.classList.add('small');
} else if (util.clientWidth >= 1024) {
  $main.classList.add('big');
}
const tpl = {
  item(name, method = 'window') {
    const suport = isSuport(name, method);
    const clazz = suport ? 'green' : 'red';
    const nameText = method !== 'window' ? `${method}.${name}` : name;
    return `
      <li>
        <span>${nameText}: </span>
        <span style="color: ${clazz}">${suport}</span>
      </li>
    `;
  },
  itemWrap(dataArray) {
    return `<ul>${dataArray.join('')}</ul>`;
  },
  container(html, text) {
    return `
      <div class="container">
        <div class="hd">${text}</div>
        <div class="bd">${html}</div>
      </div>
    `;
  }
};
const getOwnPropertyNames = Object.getOwnPropertyNames;
function isSuport(api, method) {
  let prototypes = [];
  switch (method) {
    case 'window': {
      return window[api] !== undefined;
    }
    default: {
      if (window[method]) {
        prototypes = getOwnPropertyNames(window[method]);
        if (window[method] && window[method].prototype) {
          prototypes = prototypes.concat(getOwnPropertyNames(window[method].prototype));
        }
      }
      return prototypes.indexOf(api) !== -1;
    }
  }
}

function setSuportStatusToHtml(obj) {
  const htmlList = [];
  Object.keys(obj).forEach((key) => {
    htmlList.push(tpl.item(key));
  });
  return tpl.itemWrap(htmlList);
}

function renderBuiltins() {
  const builtinsHtml = setSuportStatusToHtml(data.builtins);
  return tpl.container(builtinsHtml, '内置函数支持：');
}

function renderMethods() {
  const htmlList = [];
  Object.keys(data.methods).forEach((method) => {
    const methodHtmlList = [];
    const methodApis = Object.keys(data.methods[method]);
    methodApis.forEach((api) => {
      methodHtmlList.push(tpl.item(api, method));
    });
    htmlList.push(tpl.container(tpl.itemWrap(methodHtmlList), `${method} API支持：`));
  });
  return htmlList.join('');
}

function render() {
  $main.innerHTML = `<div class="wrapper">${[renderBuiltins(), renderMethods()].join('')}</div>`;
}


render();
