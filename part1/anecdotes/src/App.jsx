import { useState } from 'react'

const Button = ({ text, callback }) => {
  return <button onClick={callback}>{text}</button>
}

const AnecdoteMostPopular = ({ text }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{text}</p>
    </div>
  )
}

const AnecdoteOfDay = ({ text, votes, voteCallback, nextAnecdoteCallback }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{text}</p>
      <p>has {votes} votes</p>
      <Button text={'vote'} callback={voteCallback} />
      <Button text={'next anecdote'} callback={nextAnecdoteCallback} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomInt = max => Math.floor(Math.random() * max)

  const x = randomInt(anecdotes.length)

  const [selected, setSelected] = useState(x)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const indexMostVotes = votes.reduce((indexMax, x, currentIndex, array) => array[currentIndex] > array[indexMax] ? currentIndex : indexMax, 0)

  const handleNextAnecdote = () => setSelected(randomInt(anecdotes.length))

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    console.log(newVotes)
  }

  return (
    <div>
      <AnecdoteOfDay
        text={anecdotes[selected]}
        votes={votes[selected]}
        voteCallback={handleVote}
        nextAnecdoteCallback={handleNextAnecdote} />
      <AnecdoteMostPopular text={anecdotes[indexMostVotes]} />
    </div>
  )
}

export default App
