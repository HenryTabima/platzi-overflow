'use strict'

const handlebars = require('handlebars')

function registerHelpers () {
  handlebars.registerHelper('answerNumber', (answer) => {
    const key = Object.keys(answer)
    return key.length
  })

  handlebars.registerHelper('ifEquals', (a, b, options) => {
    if (a === b) {
      return options.fn(this)
    }

    return options.inverse(this)
  })

  return handlebars
}

module.exports = registerHelpers()
