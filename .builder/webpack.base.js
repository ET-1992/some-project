const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'polyfills': path.resolve(__dirname, '../src/polyfills.js'),
    'sdklibs': path.resolve(__dirname, '../src/sdklibs.js'),
    'sdklibs.shim': path.resolve(__dirname, '../src/sdklibs.shim.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [
      {
        test: /src\/.+\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // webpack2写法
      },
      {
        test: /src\/.+\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../src/css')
        ],
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader' }
        ]
      },
    ]
  },
  plugins: [
  ]
};
