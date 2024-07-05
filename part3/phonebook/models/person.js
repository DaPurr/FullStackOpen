const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const databaseUrl = process.env.MONGODB_URL
console.log('connecting to MongoDB');

mongoose.connect(databaseUrl)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB', error.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        validate: {
            validator: value => /^\d{2,3}-\d+$/.test(value),
            message: props => `${props.value} is not a valid phone number of the form XX-X...`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
