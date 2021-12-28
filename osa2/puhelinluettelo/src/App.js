import React, { useState, useEffect } from 'react'
import personsService from './services/personsService'

const Persons = ({persons, deletePerson}) => {
  return (
    <ul>
      {persons.map(person =>
        <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person)}>delete</button>
        </li>
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
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    personsService.getAll().then(pers => {
      console.log(pers)
      setPersons(pers)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(p => p.name === newName)
    if (found) {
      updatePerson(found.id, newPerson)
      return 0
    }

    personsService.create(newPerson).then(p => {
      setPersons(persons.concat(p))
      setNewName('')
      setNewNumber('')
    })
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

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`))
      personsService.remove(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const updatePerson = (id, person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace number?`))
      personsService.update(id, person).then((person) => {
        setPersons(persons.map(p => p.id === person.id ? person : p))
        setNewName('')
        setNewNumber('')
      })
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
      <Persons persons={shownPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App
