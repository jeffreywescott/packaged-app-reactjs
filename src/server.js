/* eslint-disable no-console, no-undef */
require('babel-core/register')
require('dotenv').load()

process.env.PORT = process.env.PORT || '8083'

import path from 'path'
import Express from 'express'
import serveStatic from 'serve-static'

// These may also be defined by webpack on the client-side.
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development'
global.__DEVTOOLS__ = global.__CLIENT__ && global.__DEVELOPMENT__

function start() {
  const serverPort = parseInt(process.env.PORT, 10)
  const baseUrl = process.env.APP_BASEURL || `http://localhost:${serverPort}`

  const app = new Express()

  if (__DEVELOPMENT__) {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackConfig = require('../webpack-development-config')
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))
    app.get('/app.css', (req, res) => {
      res.set('Content-Type', 'text/css')
      res.send('')
    })
  }

  // Use this middleware to server up static files
  app.use(serveStatic(__dirname))
  app.use(serveStatic(path.join(__dirname, '..', 'public')))

  app.listen(serverPort, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.info('🌍  Listening at %s', baseUrl)
    }
  })
}
module.exports = start

if (!module.parent) start()
