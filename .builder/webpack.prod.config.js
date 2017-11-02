const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.base.js');
const pkg = require('../package.json');

const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      comparisons: false
    },
    output: {
      comments: false,
      ascii_only: true
    },
    sourceMap: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
];
webpackConfig.entry.apitest = path.resolve(__dirname, '../src/api.test.js');
webpackConfig.output.filename = `[name].${pkg.version}.js`;
webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
webpackConfig.devtool = false;
module.exports = webpackConfig;
