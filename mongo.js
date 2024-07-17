const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
console.log(password)

const url =
  `mongodb+srv://Chanmin:${password}@cluster0.hhumatj.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// how the note is stored in the data base 
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})


/*
const note1 = new Note({
        content: 'HTML is easy',
        important: true,
    })



note1.save().then(result => {
  console.log('notes saved!')
  mongoose.connection.close()
})
*/
