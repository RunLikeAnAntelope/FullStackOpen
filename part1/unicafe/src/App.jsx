import { useState } from 'react'

const Button = ({ text, callBack }) => {
  return (
    <button onClick={callBack}>
      {text}
    </button>
  )
}
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all !== 0) {
    return (
      <table>
        <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / (all)} />
        <StatisticLine text="positive" value={(good / all * 100).toString().concat("%")} />
        </tbody>
      </table>


    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text="good" callBack={() => setGood(good + 1)} />
      <Button text="neutral" callBack={() => setNeutral(neutral + 1)} />
      <Button text="bad" callBack={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
