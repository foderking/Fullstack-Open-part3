require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connecting to", url)
const uniqueValidator = require("mongoose-unique-validator")

mongoose.connect(url, {
	useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

// phonebook_db schema
const noteSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		unique: true,
		required: true,
	},
	number: {
		type: Number,
		min: 9999999,
		required: true,
	},
})
noteSchema.plugin(uniqueValidator)
/* eslint-disable no-param-reassign */
noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})
/* eslint-enable no-param-reassign */
module.exports = mongoose.model("Note", noteSchema)
