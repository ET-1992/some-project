const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'sdklibs': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [{
      test: /src\/.+\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre' // webpack2写法
    },
    {
      test: /src\/.+\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
  ]
};

console.log(module.exports.entry);
