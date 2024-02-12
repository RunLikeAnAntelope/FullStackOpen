import { useState } from 'react'
const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({ persons }) => {
  return (
    persons.map(person => <Person key={person.name} person={person} />)
  )
}

const SearchedPersons = ({ persons, search }) => {
  const lSearch = search.toLowerCase()
  return (
    <Persons persons={persons.filter(person =>
      person.name.toLowerCase().includes(lSearch))}
    />
  )
}

const Filter = ({ search, onChange }) => {
  return (
    <div>
      filter shown with<input name="pbfilter" value={search} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  <form onSubmit={onSubmit}>
    <div>
      name: <input name="pbname" value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input name="pbnumber" value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const App = () => {
  const init = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [persons, setPersons] = useState(init)
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

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
      setPersons(persons.concat(newPerson))
      setNewName("")
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