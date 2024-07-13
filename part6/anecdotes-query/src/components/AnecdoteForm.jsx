import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: error => console.log('error posting:', error.message),
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)

    event.target.anecdote.value = ''
    console.log('new anecdote', content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
