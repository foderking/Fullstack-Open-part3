require("dotenv").config()
const express = require("express")

const app = express()
const { PORT } = process.env

// const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
// const FgWhite = "\x1b[37m"
// const FgRed = "\x1b[31m"
const FgBlue = "\x1b[34m"
// const BgBlue = "\x1b[44m"
// const BgRed = "\x1b[41m"
// const BgGreen = "\x1b[42m"
const white = "\x33[37m"
const blue = "\x33[34m"
const cyan = "\x33[36m"

const Note = require("./models/mongo")

app.use(express.json())

app.use(express.static("build"))

if (PORT === "3001") {
/* eslint-disable global-require */
	const morgan = require("morgan")
	/* eslint-enable global-require */

	app.use(
		morgan((tokens, req, res) => {
			if (["POST", "PUT"].includes(tokens.method(req, res))) {
				return `${tokens.method(req, res)} "${tokens.url(req, res)}" | User-Agent ${tokens["user-agent"](req, res)} \n ${white} ${tokens.status(req, res)} ${blue} - ${tokens["response-time"](req, res)} ms \n${cyan} ${JSON.stringify(req.body)} ${blue}`
			}
			return `${tokens.method(req, res)} "${tokens.url(req, res)}" | User-Agent ${tokens["user-agent"](req, res)} \n ${white} ${tokens.status(req, res)} ${blue} - ${tokens["response-time"](req, res)} ms`
		}),
	)
}

app.listen(PORT, () => {
	console.log(FgYellow, `Server listening on port: ${PORT}`, FgBlue)
})

app.get("/info", (request, response) => {
	response.send(
		`<div>\
			<p>Phonebook has info for ${0} people</p>\
			<p>${Date()}</p>\
		</div>`,
	)
})

app.get("/api/persons", (request, response, next) => {
	Note
		.find({})
		.then((note) => {
			response.json(note)
		})
		.catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
	const { id } = request.params

	Note
		.findById(id)
		.then((note) => {
			response.json(note)
		})
		.catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
	Note
		.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).json(result)
		})
		.catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
	const { body } = request

	const note = new Note({
		name: body.name,
		number: body.number,
	})
	note
		.save()
		.then((saved) => {
			response.json(saved)
		})
		.catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
	const { body } = request

	const note = {
		name: body.name,
		number: body.number,
	}

	Note
		.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: "query" })
		.then((updatedNote) => updatedNote)
		.then((updatedNote) => {
			response.json(updatedNote)
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)
/* eslint-disable consistent-return */
const errorHandler = (error, request, response, next) => {
	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	}
	if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}
	if (error.name === "SyntaxError") {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}
/* eslint-enable consistent-return */

app.use(errorHandler)
