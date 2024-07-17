const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

require('dotenv').config()

// get url from .env
const url = process.env.MONGODB_URI

console.log('connecting to', url)


// connect to mongoose 
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


// document schema 
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// remove id and v
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)