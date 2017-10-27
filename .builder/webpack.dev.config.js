const webpackConfig = require('./webpack.base.js');
const webpack = require('webpack');

const plugins = [
  new webpack.HotModuleReplacementPlugin()
];
webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
webpackConfig.devtool = 'cheap-module-source-map';
webpackConfig.devServer = {
  host: '100.84.248.189',
  contentBase: './',
  port: 9090
}
module.exports = webpackConfig;
