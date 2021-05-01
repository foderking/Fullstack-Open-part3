const express = require('express')
const app = express()
const PORT =  3001
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

let notes = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]
let usedId = notes.map(each => each.id)

app.use(express.json())

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
// const dispRequest = (request, response, next) => {
// 	next()
// 	console.log(FgGreen, `\n${request.method} \'${request.url}\' HTTP ${request.httpVersion} | User-Agent ${request.headers['user-agent']}\n....`, FgBlue)
// 	console.log(response._header)
// }
// app.use(dispRequest)
const newId = () => {
	while (true) {
		let ID = Math.floor(Math.random() * RANGE)

		if ( !usedId.includes(ID) ) {
			usedId = usedId.concat(ID)
			console.log(FgYellow,`\nNew person of id ${ID}`, FgBlue)
			return ID 
		}
	}	
}



app.listen(PORT, () => {
	console.log(FgYellow, `Server listening on port: ${PORT}`, FgBlue)
})

app.get('/', (request, response) => {
	response.send('<h1>Hello</h1>')
})

app.get('/api/persons', (request, response) => {
	response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(each => each.id === id)

	if (note) {
		response.json(note)
	} 
	else {
		response.status(404).json({
			"error": "content not found"
		})
	}
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
	const id = Number(request.params.id)

	if (usedId.includes(id)) {
		notes = notes.filter(each => each.id !== id)	
		response.status(204).end()
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
  else if (notes.find(each => each.name === body.name)) {
  	response.status(400).json({
  		"error":"Name must be unique"
  	})
  } 
  else {
  	const note = {
  		name: body.name,
  		number: body.number,
  		id: newId()
  	}
  	notes = notes.concat(note)
  	response.json(notes)
  }
})