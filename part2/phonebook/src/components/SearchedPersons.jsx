import Persons from "./Persons"
const SearchedPersons = ({ persons, search }) => {
  const lSearch = search.toLowerCase()
  return (
    <Persons persons={persons.filter(person =>
      person.name.toLowerCase().includes(lSearch))}
    />
  )
}
export default SearchedPersons