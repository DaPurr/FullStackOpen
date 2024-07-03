import axios from "axios"

const addPerson = person => {
    return axios.post('http://localhost:3001/persons', person)
}

export default {
    addPerson
}
