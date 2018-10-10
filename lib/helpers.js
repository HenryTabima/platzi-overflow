'use strict'

const handlebars = require('handlebars')

function registerHelpers () {
  handlebars.registerHelper('answerNumber', (answer) => {
    const key = Object.keys(answer)
    return key.length
  })

  return handlebars
}

module.exports = registerHelpers()
