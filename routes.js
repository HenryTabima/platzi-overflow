'use strict'

const Joi = require('joi')
const middlewares = require('./lib/middlewares')
const siteController = require('./controllers/siteController')
const usersController = require('./controllers/usersController')
const questionsController = require('./controllers/questionsController')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: siteController.home,
    options: {
      cache: {
        expiresIn: 1000 * 30,
        privacy: 'private'
      }
    }
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
    path: '/question/{id}',
    handler: siteController.showQuestion
  },
  {
    method: 'GET',
    path: '/logout',
    handler: usersController.logout,
    options: {
      pre: [
        { method: middlewares.isAuth }
      ]
    }
  },
  {
    method: 'GET',
    path: '/ask',
    handler: siteController.ask,
    options: {
      pre: [
        { method: middlewares.isAuth }
      ]
    }
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
      pre: [
        { method: middlewares.isAuth }
      ],
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required(),
          image: Joi.any().optional()
        },
        failAction: usersController.failValidation
      }
    },
    handler: questionsController.createQuestion
  },
  {
    method: 'POST',
    path: '/answer-question',
    options: {
      pre: [{
        method: middlewares.isAuth
      }],
      validate: {
        payload: {
          answer: Joi.string().required(),
          id: Joi.string().required()
        },
        failAction: usersController.failValidation
      }
    },
    handler: questionsController.answerQuestion
  },
  {
    method: 'GET',
    path: '/answer/{questionId}/{answerId}',
    handler: questionsController.setRightAnswer,
    options: {
      pre: [
        { method: middlewares.isAuth }
      ]
    }
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
