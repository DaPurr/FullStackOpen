import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdoteFilter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes).filter(anecdote =>
    anecdote === ''
      ? true
      : anecdote.content.toLowerCase().includes(anecdoteFilter)
  )

  const sortedAnecdotes = [...anecdotes]
  sortedAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = id => {
    dispatch(voteFor(id))
  }

  return sortedAnecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
