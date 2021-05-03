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

app.use(express.static('build'))


if (PORT == 3001) {
	var morgan = require('morgan')

	app.use(
		morgan(function (tokens, req, res) {
			if (["POST", "PUT"].includes(tokens.method(req, res))) {
			  return  `${tokens.method(req, res)} "${tokens.url(req, res)}" | User-Agent ${tokens['user-agent'](req, res)} \n ${white} ${tokens.status(req, res)} ${blue} - ${tokens['response-time'](req, res)} ms \n${cyan} ${JSON.stringify(req.body)} ${blue}` 
			}
			else {
			  return  `${tokens.method(req, res)} "${tokens.url(req, res)}" | User-Agent ${tokens['user-agent'](req, res)} \n ${white} ${tokens.status(req, res)} ${blue} - ${tokens['response-time'](req, res)} ms` 
			}
		})
	)
}



app.listen(PORT, () => {
	console.log(FgYellow, `Server listening on port: ${PORT}`, FgBlue)
})

app.get('/info', (request, response) => {
	response.send(
	  `<div>\
			<p>Phonebook has info for ${notes.length} people</p>\
			<p>${Date()}</p>\
		</div>`
	)
})

app.get('/api/persons', (request, response, next) => {
  Note
    .find({})
    .then(note => {
      response.json(note)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id

	Note
		.findById(id)
		.then(note => {
			response.json(note)
		})
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Note
  	.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).json(result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

  	const note = new Note({
			name: body.name,
			number: body.number
  	})
  	note
  		.save()
  		.then(saved => {
		  	response.json(saved)
  		})
   		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const note = {
    name: body.name,
    number: body.number
  }

  Note
  	.findByIdAndUpdate(request.params.id, note, {new: true, runValidators: true, context: 'query'})
    .then(updatedNote => updatedNote)
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'SyntaxError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)