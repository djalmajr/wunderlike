const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  'transform-runtime',
  ['babel-root-import', { rootPathSuffix: 'src' }],
];

if (process.env.NODE_ENV !== 'production') {
  plugins.unshift('react-hot-loader/babel');
}

module.exports = {
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist/js'),
    publicPath: '/js/',
  },
  module: {
    noParse: /localforage.js$/,
    loaders: [
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, exclude: /node_modules/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /node_modules/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, exclude: /node_modules/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, exclude: /node_modules/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, exclude: /node_modules/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins,
          presets: ['react', ['latest', { es2015: { modules: false } }], 'stage-1'],
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&localIdentName=[name]__[local]__[hash:base64:10]',
          'autoprefixer-loader',
          'postcss-loader',
          'sass-loader?sourceMap',
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.join(__dirname, '../index.web.html'),
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.web.js'],
    modulesDirectories: ['node_modules', './src'],
  },
};
