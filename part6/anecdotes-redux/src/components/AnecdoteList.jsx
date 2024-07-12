import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const sortedAnecdotes = [...anecdotes]
  sortedAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = id => {
    console.log('vote', id)
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
