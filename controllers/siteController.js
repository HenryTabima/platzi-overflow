'use strict'

const question = require('../models/index').question

async function home (req, h) {
  let data
  try {
    data = await question.getLast(10)
  } catch (error) {
    console.error(error)
  }
  return h.view('index', {
    title: 'Home',
    user: req.state.user,
    questions: data
  })
}

function register (req, h) {
  return h.view('register', {
    title: 'Registro',
    user: req.state.user
  })
}

function login (req, h) {
  return h.view('login', {
    title: 'Login',
    user: req.state.user
  })
}

function ask (req, h) {
  return h.view('ask', {
    title: 'Crear pregunta',
    user: req.state.user
  })
}

async function showQuestion (req, h) {
  let data
  try {
    data = await question.getOne(req.params.id)
    if (!data) {
      return notFound(req, h)
    }
  } catch (error) {
    console.error(error)
  }

  return h.view('question', {
    title: 'Detalles de la pregunta',
    user: req.state.user,
    question: data,
    key: req.params.id
  })
}

function notFound (req, h) {
  return h.view('404', {}, {
    layout: 'error-layout'
  }).code(404)
}

function fileNotFound (req, h) {
  const response = req.response
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, {
      layout: 'error-layout'
    }).code(404)
  }

  return h.continue
}

module.exports = {
  register,
  home,
  login,
  notFound,
  fileNotFound,
  ask,
  showQuestion
}
