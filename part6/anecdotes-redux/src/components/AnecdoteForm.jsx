import { useState } from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [anecdoteContent, setAnecdoteContent] = useState('')

  const addAnecdote = async event => {
    console.log('adding anecdote', anecdoteContent)

    event.preventDefault()

    dispatch(createAnecdote(anecdoteContent))
    dispatch(setNotification(`Added anecdote ${anecdoteContent}`, 3000))
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
