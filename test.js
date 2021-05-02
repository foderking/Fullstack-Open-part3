require('dotenv').config()
const Note = require('./models/mongo')

Note
  .find({})
  .then(notes => {
    console.log(notes)
  })