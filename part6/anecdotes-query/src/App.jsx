import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'
import notificationReducer, {
  clearNotification,
  pushNotification,
} from './reducers/notifications'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: error => console.log('update anecdote error:', error.message),
  })

  const [notificationMessage, notificationDispatcher] = useReducer(
    notificationReducer,
    ''
  )

  const handleVote = anecdote => {
    console.log('vote')
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    notificationDispatcher(pushNotification(`Voted for '${anecdote.content}'`))
    setTimeout(() => notificationDispatcher(clearNotification()), 5000)
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

      <NotificationContext.Provider
        value={[notificationMessage, notificationDispatcher]}
      >
        <Notification />
        <AnecdoteForm />
      </NotificationContext.Provider>

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
