'use strict'

class Question {
  constructor (db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('questions')
  }

  async create (data, user) {
    data.owner = user
    const question = this.collection.push()
    question.set(data)
    return question.key
  }

  async getLast (ammount) {
    const query = await this.collection.limitToLast(ammount).once('value')
    const data = query.val()
    return data
  }

  async getOne (id) {
    const query = await this.collection.child(id).once('value')
    const data = query.val()
    return data
  }

  async answer (data, user) {
    const answer = await this.collection.child(data.id).child('answers').push()
    answer.set({text: data.answer, user})
    return answer
  }

  async setRightAnswer (questionId, answerId, user) {
    const query = await this.collection.child(questionId).once('value')
    const question = query.val()
    const answers = question.answers

    if(!user.email === question.owner.email) {
      return false
    }

    for (let key in answers) {
      answers[key].correct = Boolean(key === answerId)
    }

    const update = await this.collection.child(questionId).child('answers').update(answers)

    return update
  }
}



module.exports = Question