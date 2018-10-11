'use strict'

const Joi = require('joi')
const question = require('../models/index').question
const users = require('../models/index').user
const Boom = require('boom')
const authBasic = require('hapi-auth-basic')

module.exports = {
  name: 'api-rest',
  version: '1.0.0',
  async register (server, options) {
    const prefix = options.prefix || 'api'

    await server.register(authBasic)
    server.auth.strategy('simple', 'basic', {
      validate: validateAuth
    })

    server.route({
      method: 'GET',
      path: `/${prefix}/question/{key}`,
      options: {
        auth: 'simple',
        validate: {
          params: {
            key: Joi.string().required()
          },
          failAction: failValidation
        }
      },
      handler: async (req, h) => {
        let result
        try {
          result = await question.getOne(req.params.key)
          if (!result) {
            return Boom.notFound(`No se pudo encontrar la pregunta ${req.params.key}`)
          }
        } catch (error) {
          return Boom.badImplementation(`Hubo un error buscando ${req.params.key} - ${error}`)
        }
        return result
      }
    })

    server.route({
      method: 'GET',
      path: `/${prefix}/questions/{ammount}`,
      options: {
        auth: 'simple',
        validate: {
          params: {
            ammount: Joi.number().integer().min(1).max(20).required()
          },
          failAction: failValidation
        }
      },
      handler: async (req, h) => {
        let result
        try {
          result = await question.getLast(req.params.ammount)
          if (!result) {
            return Boom.notFound(`No se pudo recuperar las preguntas`)
          }
        } catch (error) {
          return Boom.badImplementation(`Hubo un error buscando las preguntas`, error)
        }
        return result
      }
    })

    function failValidation (req, h, err) {
      return Boom.badRequest(`Por favor use los parametros correctos`)
    }

    async function validateAuth (req, username, passwd, h) {
      let user
      try {
        user = await users.validate({ email: username, password: passwd })
      } catch (error) {
        server.log('error', error)
      }
      return {
        credentials: user || {},
        isValid: (user !== false)
      }
    }
  }
}
