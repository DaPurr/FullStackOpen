import { useSelector, useDispatch } from 'react-redux'
import { addNew, voteFor } from './reducers/anecdoteReducer'
import { useState } from 'react'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const [anecdoteContent, setAnecdoteContent] = useState('')

  const vote = id => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }

  const addAnecdote = event => {
    console.log('adding anecdote', anecdoteContent)

    event.preventDefault()

    dispatch(addNew(anecdoteContent))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            value={anecdoteContent}
            onChange={event => setAnecdoteContent(event.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
