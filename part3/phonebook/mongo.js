const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit()
}

const databaseUrl = process.env.MONGODB_URL

mongoose.set('strictQuery', false)
mongoose.connect(databaseUrl)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then((people) => {
      people.forEach((person) => {
        console.log('phonebook:')
        console.log(person.name, person.number)
      })
    })
    .catch((error) => console.log('error finding people', error))
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })
  person
    .save()
    .then(() => {
      console.log(`added ${person.name} number ${person.number}`)
    })
    .catch((error) => console.log('error saving person', error))
}
