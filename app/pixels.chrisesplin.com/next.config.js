const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias['~'] = path.join(__dirname, 'components');
    config.resolve.alias['__'] = path.join(__dirname, 'components');
    config.resolve.alias['^'] = path.join(__dirname, '../extension/components');

    console.log('config.resolve.alias', config.resolve.alias);

    return config;
  },
};
