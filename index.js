'use strict'

/*
 * First Server with hapi js
 *
 */

// Dependencies
const hapi = require('hapi')
const handlebars = require('./lib/helpers')
const inert = require('inert')
const good = require('good')
const methods = require('./lib/methods')
const vision = require('vision')
const path = require('path')
const routes = require('./routes')
const siteController = require('./controllers/siteController')
const api = require('./lib/api')

// Server instatiation
const server = hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

// Initialize function for the server
async function init () {
  try {
    await server.register(inert)
    await server.register(vision)
    await server.register({
      plugin: good,
      options: {
        reporters: {
          console: [
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    })
    await server.register({
      plugin: api,
      options: {
        prefix: 'api'
      }
    })

    server.method('setRightAnswer', methods.setRightAnswer)
    server.method('getLast', methods.getLast, {
      cache: {
        expiresIn: 1000 * 60,
        generateTimeout: 2000
      }
    })

    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7,
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json'
    })

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.ext('onPreResponse', siteController.fileNotFound)
    server.route(routes)

    await server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  server.log('info', `Servidor lanzado en: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
  server.log('unhandledRejection', error)
})

process.on('unhandledException', error => {
  server.log('unhandledException', error)
})

init()
