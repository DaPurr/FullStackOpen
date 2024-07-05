require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const personService = require('./services/person')

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
    personService.findAll()
        .then(people => {
            response.send(`
            <p>Phonebook has info for ${people.length} people</p>
            <p>${new Date()}</p>`)
        })
})

app.get('/api/persons', (request, response) => {
    personService.findAll()
        .then(people => {
            response.json(people)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    personService.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).send({ error: 'person not found' })
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    personService.deleteById(request.params.id).then(() => response.status(204).end())
})

app.post('/api/persons', (request, response, next) => {
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

    personService.save({
        name: personPayload.name,
        number: personPayload.number
    })
        .then((savedPerson) => {
            response.status(201).json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const person = {
        id,
        name: request.body.name,
        number: request.body.number
    }
    personService.updateById(id, person)
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
