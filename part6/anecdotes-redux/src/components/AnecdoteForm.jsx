import { useState } from 'react'
import { addNew } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [anecdoteContent, setAnecdoteContent] = useState('')

  const addAnecdote = async event => {
    console.log('adding anecdote', anecdoteContent)

    event.preventDefault()

    const response = await anecdoteService.createNew(anecdoteContent)
    dispatch(addNew(response.data))
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
