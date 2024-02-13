const Person = ({ person }) => {
  return (
    <div>
      {person.name}
      {person.number}
      <button>delete</button>
    </div>
  )
}
export default Person