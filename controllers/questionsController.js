'use strict'

const question = require('../models/index').question
const { writeFile } = require('fs')
const { promisify } = require('util')
const { join } = require('path')
const uuid = require('uuid/v1')

const write = promisify(writeFile)

async function createQuestion (req, h) {
  let result, fileName
  try {
    if (Buffer.isBuffer(req.payload.image)) {
      fileName = `${uuid()}.png`
      await write(join(__dirname, '..', 'public', 'uploads', fileName), req.payload.image)
    }
    result = await question.create(req.payload, req.state.user, fileName)
  } catch (error) {
    console.error(`Ocurrio un error: ${error}`)
    return h.view('ask', {
      title: 'Crear pregunta',
      error: 'Problemas creando la pregunta'
    }).code(500).takeover()
  }

  return h.redirect(`/question/${result}`)
}

async function answerQuestion (req, h) {
  let result
  try {
    result = await question.answer(req.payload, req.state.user)
    console.log(`Respuesta creada: ${result}`)
  } catch (error) {
    console.error(error)
  }

  return h.redirect(`/question/${req.payload.id}`)
}

async function setRightAnswer (req, h) {
  let result
  try {
    result = await req.server.methods.setRightAnswer(req.params.questionId, req.params.answerId, req.state.user)
    console.log(result)
  } catch (error) {
    console.error(error)
  }

  return h.redirect(`/question/${req.params.questionId}`)
}

module.exports = {
  createQuestion,
  answerQuestion,
  setRightAnswer
}
