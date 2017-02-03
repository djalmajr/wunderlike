/* eslint-disable no-console */

const open = require('open');
const path = require('path');
const morgan = require('morgan');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack/webpack.dev.config');

const port = 4000;
const app = express();
const compiler = webpack(config);

app.use(morgan('dev'));
app.use(devMiddleware(compiler, config.devServer));
app.use(hotMiddleware(compiler));
app.use(express.static(path.join(__dirname, './dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`http://localhost:${port}`);
    open(`http://localhost:${port}`);
  }
});
