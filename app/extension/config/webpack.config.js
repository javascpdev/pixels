const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '^': path.resolve(__dirname, '../components'),
      __: path.resolve(__dirname, '../components'),
      '~': path.resolve(__dirname, '../../pixels.chrisesplin.com/components'),
      '+': path.resolve(__dirname, '../../extension/content/components'),
      _background: path.resolve(__dirname, '../../extension/background'),
      _content: path.resolve(__dirname, '../../extension/content'),
      react: path.resolve(__dirname, '../node_modules/react'),
      '@rmwc': path.resolve(__dirname, '../../pixels.chrisesplin.com/node_modules/@rmwc'),
      '@material': path.resolve(__dirname, '../../pixels.chrisesplin.com/node_modules/@material'),
    },
  },
  entry: {
    index: path.resolve(__dirname, '../components/index.js'),
    background: path.resolve(__dirname, '../background/background.js'),
    content: path.resolve(__dirname, '../content/content.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' },
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
          to: 'browser-polyfill.js',
        },
      ],
    }),
    new webpack.DefinePlugin({
      $ENVIRONMENT: process.env.NODE_ENV,
    }),
  ],
  optimization: {
    minimize: false,
  },
};
