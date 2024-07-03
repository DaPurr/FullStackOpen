import { useState } from 'react'

const Statistic = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
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
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={totalFeedback} />
      <Statistic text="average" value={calculateAverage()} />
      <Statistic text="positive" value={calculatePercentagePositive()} />
    </div>
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
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      {hasFeedback && <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  )
}

export default App
