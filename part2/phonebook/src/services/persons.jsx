import axios from "axios"

const addPerson = person => axios.post('http://localhost:3001/persons', person)

const deletePerson = id => axios.delete(`http://localhost:3001/persons/${id}`)

export default {
    addPerson,
    deletePerson
}
