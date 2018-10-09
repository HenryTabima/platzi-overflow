'use strict'

const Joi = require('joi')
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
    method: 'GET',
    path: '/login',
    handler: siteController.login
  },
  {
    method: 'POST',
    path: '/validate-user',
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }
      }
    },
    handler: userController.validateUser
  },
  {
    method: 'POST',
    path: '/create-user',
    options: {
      validate: {
        payload: {
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }
      }
    },
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
