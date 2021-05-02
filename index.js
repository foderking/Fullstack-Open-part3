require('dotenv').config()
const express = require('express')
const app = express()
const PORT =  process.env.PORT 
const RANGE = 1000

const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgWhite = "\x1b[37m"
const FgRed = "\x1b[31m"
const FgBlue = "\x1b[34m"
const BgBlue = "\x1b[44m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const white = '\033[37m'
const blue = '\033[34m'
const cyan = '\033[36m'

const Note = require('./models/mongo')

app.use(express.json())

if (PORT == 3001) {
	var morgan = require('morgan')

	app.use(
		morgan(function (tokens, req, res) {
			if (tokens.method(req, res) === "POST") {
			  return  `${tokens.method(req, res)} "${tokens.url(req, res)}" | User-Agent ${tokens['user-agent'](req, res)} \n ${white} ${tokens.status(req, res)} ${blue} - ${tokens['response-time'](req, res)} ms \n${cyan} ${JSON.stringify(req.body)} ${blue}` 
			}
			else {
			  return  `${tokens.method(req, res)} "${tokens.url(req, res)}" | User-Agent ${tokens['user-agent'](req, res)} \n ${white} ${tokens.status(req, res)} ${blue} - ${tokens['response-time'](req, res)} ms` 
			}
		})
	)
}

app.use(express.static('build'))





app.listen(PORT, () => {
	console.log(FgYellow, `Server listening on port: ${PORT}`, FgBlue)
})


app.get('/api/persons', (request, response) => {
  Note
    .find({})
    .then(note => {
      response.json(note)
    })
		.catch(error => {
			response.send(error.message)
		})
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id

	Note
		.findById(id)
		.then(note => {
			response.json(note)
		})
		.catch(error => {
			response.send(error.message)
		})
})

app.get('/info', (request, response) => {
	response.send(
	  `<div>\
			<p>Phonebook has info for ${notes.length} people</p>\
			<p>${Date()}</p>\
		</div>`
	)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id

	if (usedId.includes(id)) {
		notes = notes.filter(each => each.id !== id)	
		response.status(204).json(notes)
	} 
	else {
		response.status(404).json({"error": "id does not exist"})
	}
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if ( !body.name || !body.number ) {
    response.status(400).json({ 
      error: 'content missing' 
    })
  } 
  else {
  	const note = new Note({
			name: body.name,
			number: body.number,
  	})
  	note
  		.save()
  		.then(saved => {
		  	response.json(saved)
  		})
  }
})

app.put('/api/persons/:id', (request, response) => {
	const body = request.body

	if ( !body.name || !body.number ) {
    response.status(400).json({ 
      error: 'content missing' 
    })
  } 
  else {
  	const note = new Note({
			name: body.name,
			number: body.number,
  	})
  	note
  		.save()
  		.then(saved => {
		  	response.json(saved)
  		})
  }
})