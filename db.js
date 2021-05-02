
const mongoose = require('mongoose')


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const db_name = 'phonebook_db'
const url =
  `mongodb+srv://ope:${password}@cluster0.gvmqb.mongodb.net/${db_name}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
	name: String,
	number: Number
})
const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 5) {
	const note = new Note({
		name: name,
		number: number
	})

	note
		.save()
		.then(result => {
			console.log(`Added ${name} number ${number} to phonebook`)
			mongoose.connection.close()
		})
}
else if (process.argv.length === 3) {
	console.log('phonebook:')
	Note
		.find({})
		.then(note => {
			console.log(note.map(
				each => `${each.name} ${each.number}`).join('\n'))
			mongoose.connection.close()
		})
}
else { 
	console.log('Not enough parameters: node mongo.js <password> <name> <number>')
	process.exit(1)
}