import { useState } from 'react'
import { addNew } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [anecdoteContent, setAnecdoteContent] = useState('')

  const addAnecdote = event => {
    console.log('adding anecdote', anecdoteContent)

    event.preventDefault()

    dispatch(addNew(anecdoteContent))
  }

  return (
    <div>
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

export default AnecdoteForm
