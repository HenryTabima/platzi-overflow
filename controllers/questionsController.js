'use strict'

const question = require('../models/index').question

async function createQuestion (req, h) {
  let result
  try {
    result = await question.create(req.payload, req.state.user)
    console.log(`Pregunta creada con el ID ${result}`)
  } catch (error) {
    console.error(`Ocurrio un error: ${error}`)
    return h.view('ask', {
      title: 'Crear pregunta',
      error: 'Problemas creando la pregunta'
    }).code(500).takeover()
  }

  return h.response(`Pregunta creada con el ID ${result}`)
}

module.exports = {
  createQuestion
}