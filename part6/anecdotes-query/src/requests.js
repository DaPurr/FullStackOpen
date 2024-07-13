import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'

const getId = () => Math.floor(Math.random() * 1_000_000)

export const getAnecdotes = () =>
  axios.get(baseUrl).then(response => response.data)

export const createAnecdote = content => {
  console.log('posting anecdote:', content)
  return axios
    .post(baseUrl, { id: getId(), content, votes: 0 })
    .then(response => response.data)
}

export const updateAnecdote = anecdote => {
  console.log('voting for:', anecdote.id)
  return axios
    .put(`${baseUrl}/${anecdote.id}`, anecdote)
    .then(response => response.data)
}
