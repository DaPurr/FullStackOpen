import axios from 'axios'

const findAll = async () => {
  const response = await axios.get('/api/anecdotes')
  return response.data
}

const createNew = async content => {
  const id = generateId()
  const anecdoteToPost = {
    id,
    content,
    votes: 0,
  }
  console.log('posting anecdote', anecdoteToPost)
  const postedAnecdote = await axios.post('/api/anecdotes', anecdoteToPost)
  console.log('posted anecdote', postedAnecdote)
  return postedAnecdote
}

const vote = async id => {
  const getResponse = await axios.get(`/api/anecdotes/${id}`)
  const oldAnecdote = getResponse.data
  const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
  await axios.put(`/api/anecdotes/${id}`, updatedAnecdote)
  return updatedAnecdote
}

const generateId = () => Math.floor(Math.random() * 10_000)

export default { findAll, createNew, vote }
