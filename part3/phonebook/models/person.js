const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const databaseUrl = process.env.MONGODB_URL
console.log('connecting to MongoDB');

mongoose.connect(databaseUrl)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB', error.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
