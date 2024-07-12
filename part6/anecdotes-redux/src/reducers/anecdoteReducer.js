import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// helpers
const initialState = await anecdoteService.findAll()

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteFor(state, action) {
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

export default anecdoteSlice.reducer
export const { voteFor, addNew } = anecdoteSlice.actions
