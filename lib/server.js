'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console, no-undef */
require('babel-core/register');
require('dotenv').load();

process.env.PORT = process.env.PORT || '8083';

// These may also be defined by webpack on the client-side.
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';
global.__DEVTOOLS__ = global.__CLIENT__ && global.__DEVELOPMENT__;

function start() {
  var serverPort = parseInt(process.env.PORT, 10);
  var baseUrl = process.env.APP_BASEURL || 'http://localhost:' + serverPort;

  var app = new _express2.default();

  if (__DEVELOPMENT__) {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpackConfig = require('../webpack-development-config');
    var compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
    app.get('/app.css', function (req, res) {
      res.set('Content-Type', 'text/css');
      res.send('');
    });
  }

  // Use this middleware to server up static files
  app.use((0, _serveStatic2.default)(__dirname));
  app.use((0, _serveStatic2.default)(_path2.default.join(__dirname, '..', 'public')));

  app.listen(serverPort, function (error) {
    if (error) {
      console.error(error);
    } else {
      console.info('🌍  Listening at %s', baseUrl);
    }
  });
}
module.exports = start;

if (!module.parent) start();
