import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addVote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload) {
          const newAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1,
          }
          return newAnecdote
        }
        return anecdote
      })
    },
    addNew(state, action) {
      console.log('adding new anecdote')
      console.log('state:', state)
      console.log('action:', action)
      return state.concat(action.payload)
    },
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.findAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch(addNew(response.data))
  }
}

export const voteFor = id => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch(addVote(id))
  }
}

export default anecdoteSlice.reducer
export const { addVote, addNew, setAnecdotes } = anecdoteSlice.actions
