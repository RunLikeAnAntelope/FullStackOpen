const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>

  )
}

const Content = (props) => {
  return (
    <>
      {
        props.parts.map(part =>
          <Part key={part.name} name={part.name} exercises={part.exercises} />)
      }
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises
        {
          props.parts.reduce((sum, part) =>
            sum + part.exercises, 0)
        }
      </p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course