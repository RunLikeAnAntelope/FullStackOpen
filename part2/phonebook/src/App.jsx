import { useEffect, useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import SearchedPersons from './components/SearchedPersons'
import personService from './services/persons'


const App = () => {

  // state variables
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  useEffect(
    //first argument
    () => {
      personService
        .getAll()
        .then(response => {
          setPersons(response)
        })
    },
    //second argument. Tells use effect only run on first render
    []
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
      .create(newPerson)
      .then(response => setPersons(persons.concat(response)))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearchChange} />
      <PersonForm
        onSubmit={addEntry}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange} />
      <form onSubmit={addEntry}>
        <div>
          name: <input name="pbname" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input name="pbnumber" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <SearchedPersons persons={persons} search={search} />
    </div>
  )
}

export default App