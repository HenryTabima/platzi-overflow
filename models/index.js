'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')
const User = require('./users')
const Question = require('./question')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://platzi-overflow-58c59.firebaseio.com/'
})

const db = firebase.database()

module.exports = {
  user: new User(db),
  question: new Question(db)
}
