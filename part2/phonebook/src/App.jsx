import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService.findAll()
      .then(persons => {
        setPersons(persons)
        console.log('using effect', persons);
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

  const notify = (message, isError) => {
    setIsError(isError)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000);
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

    const existingPerson = persons.find(person => person.name === newPerson.name)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = { ...newPerson, id: existingPerson.id }
        personService.updatePerson(personToUpdate)
          .then(() => {
            setPersons(persons.map(person => person.id === personToUpdate.id ? personToUpdate : person))
            notify(`Updated phone number for ${personToUpdate.name}`, false)
          })
          .catch(error => {
            if (error.response.status == 404) {
              notify(`Information of ${personToUpdate.name} has already been removed from server`, true)
            }
          })
      }
    } else {
      personService.addPerson(newPerson)
        .then(response => {
          console.log('POST response', response);
          setPersons(persons.concat(response.data))
          notify(`Added ${newPerson.name}`, false)
          setNewName('')
          setNewNumber('')
        })
    }
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
      <Notification message={notificationMessage} isError={isError} />
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
