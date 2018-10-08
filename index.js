'use strict'

/*
 * First Server with hapi js
 *
 */

// Dependencies
const hapi = require('hapi')

// Server instatiation
const server = hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

// Initialize function for the server
async function init () {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'Hola Mundo!'
    }
  })

  try {
    await server.start
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()
