'use strict'

const siteController = require('./controllers/site')
const userController = require('./controllers/user')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: siteController.home
  },
  {
    method: 'GET',
    path: '/register',
    handler: siteController.register
  },
  {
    method: 'POST',
    path: '/create-user',
    handler: userController.createUser
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  }
]