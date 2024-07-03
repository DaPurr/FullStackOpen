import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log('using effect', response);
      })
  }, [])

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeSearchQuery = (event) => {
    setSearchQuery(event.target.value)

    console.log('search query', event.target.value);
  }

  const filterPerson = person => {
    return person.name.match(new RegExp(searchQuery, 'gi')) != null
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('Please fill in both name and number')
      return
    }

    const newPerson = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return
    }

    personService.addPerson(newPerson)
      .then(response => {
        console.log('POST response', response);
        setPersons(persons.concat(response.data))
      })

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons
            .filter(person => person.id !== id)
          )
        })
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter query={searchQuery} onChange={handleChangeSearchQuery} />
      <h2>add a new</h2>
      <PersonForm
        newPersonName={newName}
        newPersonNumber={newNumber}
        onSubmit={addPerson}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />
      <h2>numbers</h2>
      <Persons persons={persons} filter={filterPerson} deletePerson={deletePerson} />
    </div>
  )
}

export default App
