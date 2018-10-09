'use strict'

function home (req, h) {
  return h.view('index', {
    title: 'Home'
  })
}

function register (req, h) {
  return h.view('register', {
    title: 'Registro'
  })
}

function login (req, h) {
  return h.view('login', {
    title: 'Login'
  })
}

module.exports = {
  register,
  home,
  login
}
