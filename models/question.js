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
}

module.exports = Question