const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
};

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
    new webpack.DefinePlugin(GLOBALS),
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
