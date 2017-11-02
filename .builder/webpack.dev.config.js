const path = require('path');
const os = require('os');
const webpack = require('webpack');
const webpackConfig = require('./webpack.base.js');

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return '127.0.0.1';
}

webpackConfig.entry.apitest = path.resolve(__dirname, '../src/api.test.js');

const plugins = [
  new webpack.HotModuleReplacementPlugin()
];
webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
webpackConfig.devtool = 'cheap-module-source-map';
webpackConfig.devServer = {
  host: getIPAddress(),
  contentBase: './',
  port: 9090
}
module.exports = webpackConfig;
