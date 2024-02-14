import personService from "../services/persons"
const Person = ({ person, setNewPersons, persons}) => {
  const onClick = () => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response =>
          setNewPersons(persons.filter(person => person.id != response.id)))
    }
  }
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onClick}>
        delete
      </button>
    </div>
  )
}
export default Person