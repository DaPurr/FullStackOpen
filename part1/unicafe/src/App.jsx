import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad

  const calculateAverage = () => {
    if (totalFeedback == 0) return 0
    return (good - bad) / totalFeedback
  }

  const calculatePercentagePositive = () => {
    if (totalFeedback == 0) return 0
    return 100 * (good / totalFeedback)
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={totalFeedback} />
        <StatisticLine text="average" value={calculateAverage()} />
        <StatisticLine text="positive" value={calculatePercentagePositive()} />
      </table>
    </div>
  )
}

const Button = ({ text, onClickCallback }) => {
  return (
    <button onClick={onClickCallback}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  const hasFeedback = good + neutral + bad > 0

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClickCallback={incrementGood} />
      <Button text="neutral" onClickCallback={incrementNeutral} />
      <Button text="bad" onClickCallback={incrementBad} />
      {hasFeedback && <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  )
}

export default App
