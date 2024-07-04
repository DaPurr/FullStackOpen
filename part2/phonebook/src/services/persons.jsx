import axios from "axios"

const baseUrl = '/api/persons'

const findAll = () => axios.get(`${baseUrl}`)
    .then(response => {
        if (!Array.isArray(response.data)) {
            return Promise.reject(new TypeError('Expected array of {name, number}'))
        }
        return response.data
    })

const addPerson = person => axios.post(`${baseUrl}`, person)

const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

const updatePerson = person => axios.put(`${baseUrl}/${person.id}`, person)

export default {
    findAll,
    addPerson,
    deletePerson,
    updatePerson
}
