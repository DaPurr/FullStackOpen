const Person = require('../models/person')

const findAll = () => Person.find({})

const findById = (id) => Person.findById(id)

const deleteById = (id) => Person.findByIdAndDelete(id)

const save = (person) => {
  const id = String(generateId())
  const savedPerson = new Person({
    id,
    name: person.name,
    number: person.number,
  })
  console.log('saving', id, savedPerson)
  return savedPerson.save()
}

const updateById = (id, updatedPerson) => {
  return Person.findByIdAndUpdate(id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
}

const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

module.exports = {
  findAll,
  findById,
  deleteById,
  save,
  updateById,
}
