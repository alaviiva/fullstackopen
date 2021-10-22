import React, { useState } from 'react'

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {

  return (
    <form onSubmit={addPerson}>
      <label> name:
        <input value={newName} onChange={handleNameChange} />
      </label>
      <label> number:
        <input value={newNumber} onChange={handleNumberChange} />
      </label>
      <button type="submit">add</button>
    </form>
  )
}

const Filter = ({nameFilter, handleFilterChange}) => {
  return (
    <label>filter names
      <input value={nameFilter} onChange={handleFilterChange} />
    </label>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log(newName)
    if (persons.some(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return 0
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const shownPersons = persons.filter(p =>
    p.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />

      <h3>Add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
         newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  )

}

export default App
