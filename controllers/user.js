'use strict'

function createUser (req, h) {
  console.log(req.payload)
  return 'Usuario Creado'
}

module.exports = {
  createUser
}
