const config = require('./webpack.config.js');
const ReloadPlugin = require('./reload-plugin');

const devConfig = {
  ...config,
  mode: 'development',
  devServer: {
    writeToDisk: true,
    watchContentBase: true,
    sockPort: 41000,
    transportMode: 'ws',
  },
};

devConfig.plugins.push(new ReloadPlugin());

module.exports = devConfig;
