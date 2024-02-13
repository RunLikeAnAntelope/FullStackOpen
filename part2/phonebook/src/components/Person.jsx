import personService from "../services/persons"
const Person = ({ person }) => {
  return (
    <div>
      {person.name}
      {person.number}
      <button onClick={()=>personService.remove(person.id)}>delete</button>
    </div>
  )
}
export default Person