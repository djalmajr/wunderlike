const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = webpackMerge(baseConfig, {
  cache: true,
  devtool: 'eval',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr',
      path.join(__dirname, '../index.web.js'),
    ],
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devServer: {
    publicPath: '/js/',
    contentBase: '../',
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
  },
});
