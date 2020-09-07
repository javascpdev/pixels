const path = require('path');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  webpack(config, options) {
    config.resolve.alias['~'] = path.join(__dirname, 'components');
    config.resolve.alias['__'] = path.join(__dirname, 'components');
    config.resolve.alias['^'] = path.join(__dirname, '../extension/components');

    return config;
  },
});
