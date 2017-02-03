const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
};

module.exports = webpackMerge(baseConfig, {
  devtool: 'cheap-source-map',
  entry: {
    wunderlike: path.join(__dirname, '../index.web.js'),
  },
  output: {
    filename: '[name].min.js',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
  ],
});
