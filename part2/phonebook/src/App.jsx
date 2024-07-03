import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0612345678' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeSearchQuery = (event) => {
    setSearchQuery(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Fill in a name please')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (newNumber === '') {
      alert('Fill in a phone number please')
      return
    }

    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with
        <input value={searchQuery} onChange={handleChangeSearchQuery} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <table>
          <tr>
            <td>name:</td>
            <td><input value={newName} onChange={handleChangeName} /></td>
          </tr>
          <tr>
            <td>number:</td>
            <td><input value={newNumber} onChange={handleChangeNumber} /></td>
          </tr>
        </table>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>numbers</h2>
      <table>
        {persons
          .filter(person => searchQuery === '' || person.name.match(new RegExp(searchQuery, 'gi')) != null)
          .map(person =>
            <Person
              key={person.name}
              name={person.name}
              number={person.number}
            />)}
      </table>
    </div>
  )
}

export default App
