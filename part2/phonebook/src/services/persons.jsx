import axios from "axios"

const findAll = () => axios.get('http://localhost:3001/persons')

const addPerson = person => axios.post('http://localhost:3001/persons', person)

const deletePerson = id => axios.delete(`http://localhost:3001/persons/${id}`)

const updatePerson = person => axios.put(`http://localhost:3001/persons/${person.id}`, person)

export default {
    findAll,
    addPerson,
    deletePerson,
    updatePerson
}
