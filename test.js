require('dotenv').config()
const Note = require('./models/mongo')

let notes = []
Note
  .find({})
  .then(res => {
    notes = notes.concat(res)
    notes = notes.map(each => each._id)
    notes.forEach(each => {
    	Note
    		.findById(each)
    		.then(response => {
		    	console.log(response)
    		})
    })
  })

s