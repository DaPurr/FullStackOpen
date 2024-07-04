require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('body', request => JSON.stringify(request.body))

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    Person.find({})
        .then(people => {
            response.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>`)
        })
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(people => {
            response.json(people)
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => response.json(person))
        .catch(() => response.status(404).json({ error: 'person not found' }))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(() => response.status(204).end())
})

app.post('/api/persons', (request, response) => {
    const personPayload = request.body
    if (personPayload === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    if (!personPayload.name) {
        return response.status(400).send({ message: 'name is required' })
    }

    if (!personPayload.number) {
        return response.status(400).send({ message: 'number is required' })
    }

    if (persons.some(person => person.name === personPayload.name)) {
        return response.status(409).send({ message: `person with name ${personPayload.name} already exists` })
    }

    const id = String(generateId())
    const savedPerson = new Person({
        id,
        name: personPayload.name,
        number: personPayload.number
    })
    console.log('saving', id, savedPerson);
    savedPerson.save()
        .then(() => {
            response.status(201).json(savedPerson)
        })
})

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
