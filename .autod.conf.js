'use strict';

module.exports = {
  write: true,
  prefix: '~',
  devprefix: '^',
  exclude: [
    './dist',
    './.builder',
    './static'
    // 'theme.config.js'
  ],
  dep: [
    'core-js',
    'whatwg-fetch'
  ],
  devdep: [
    'babel-eslint',
    'babel-loader',
    'babel-plugin-transform-runtime',
    'babel-plugin-transform-async-to-generator',
    'babel-plugin-transform-decorators-legacy',
    'babel-plugin-transform-es2015-destructuring',
    'babel-plugin-transform-es2015-for-of',
    'babel-plugin-transform-es2015-modules-commonjs',
    'babel-plugin-transform-es2015-parameters',
    'babel-plugin-transform-es2015-spread',
    'babel-plugin-transform-es2015-arrow-functions',
    'babel-plugin-transform-object-rest-spread',
    'babel-preset-es2015',
    'babel-preset-stage-0',
    'babel-register',
    'chalk',
    'cross-env',
    'eslint',
    'eslint-loader',
    'eslint-config-airbnb-base',
    'eslint-plugin-import',
    'webpack',
    'webpack-dev-server',
    'rimraf'
  ],
  semver: [
  ]
};
