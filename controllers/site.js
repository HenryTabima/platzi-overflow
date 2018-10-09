'use strict'

function home (req, h) {
  return h.view('index', {
    title: 'Home',
    user: req.state.user
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

module.exports = {
  register,
  home,
  login
}
