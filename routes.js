'use strict'

const Joi = require('joi')
const siteController = require('./controllers/siteController')
const usersController = require('./controllers/usersController')
const questionsController = require('./controllers/questionsController')

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
    method: 'GET',
    path: '/logout',
    handler: usersController.logout
  },
  {
    method: 'GET',
    path: '/ask',
    handler: siteController.ask
  },
  {
    method: 'POST',
    path: '/validate-user',
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        },
        failAction: usersController.failValidation
      }
    },
    handler: usersController.validateUser
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
        },
        failAction: usersController.failValidation
      }
    },
    handler: usersController.createUser
  },
  {
    method: 'POST',
    path: '/create-question',
    options: {
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required(),
        },
        failAction: usersController.failValidation
      }
    },
    handler: questionsController.createQuestion
  },
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  },
  {
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: siteController.notFound
  }
]
