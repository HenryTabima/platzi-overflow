'use strict'

const Joi = require('joi')
const question = require('../models/index').question
const Boom = require('boom')

module.exports = {
  name: 'api-rest',
  version: '1.0.0',
  async register (server, options) {
    const prefix = options.prefix || 'api'
    server.route({
      method: 'GET',
      path: `/${prefix}/question/{key}`,
      options: {
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
  }
}
