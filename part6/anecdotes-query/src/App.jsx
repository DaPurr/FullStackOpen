import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: error => console.log('update anecdote error:', error.message),
  })

  const handleVote = anecdote => {
    console.log('vote')
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
  console.log('query result:', result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>error retrieving anecdotes: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
