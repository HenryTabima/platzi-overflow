'use strict'

const question = require('../models/index').question

async function setRightAnswer (questionId, answerId, user) {
  let result
  try {
    result = await question.setRightAnswer(questionId, answerId, user)
  } catch (error) {
    console.error(error)
    return false
  }

  return result
}

module.exports = {
  setRightAnswer
}
