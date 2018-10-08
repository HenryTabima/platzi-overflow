'use strict'

function register (req, h) {
  return h.view('register', {
    title: 'Registro'
  })
}

function home (req, h) {
  return h.view('index', {
    title: 'Home'
  })
}

module.exports = {
  register,
  home
}