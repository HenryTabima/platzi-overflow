'use strict'

/*
 * First Server with hapi js
 *
 */

// Dependencies
const hapi = require('hapi')
const handlebars = require('./lib/helpers')
const inert = require('inert')
const methods = require('./lib/methods')
const vision = require('vision')
const path = require('path')
const routes = require('./routes')
const siteController = require('./controllers/siteController')

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

  console.log('\x1b[32m', `Servidor lanzado en: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
  console.error('Unhandled Rejection', error.message, error)
})

process.on('unhandledException', error => {
  console.error('Unhandled Exception', error.message, error)
})

init()
