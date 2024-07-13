import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { clearNotification, pushNotification } from '../reducers/notifications'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: error => console.log('error posting:', error.message),
  })
  const [notificationMessage, notificationDispatcher] =
    useContext(NotificationContext)

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('creating anecdote:', content)

    if (content.length < 5) {
      notificationDispatcher(
        pushNotification(
          `Anecdote '${content}' is too short: must have 5 or more characters`
        )
      )
      return
    }

    newAnecdoteMutation.mutate(content)
    notificationDispatcher(pushNotification(`Added '${content}'`))
    setTimeout(() => {
      notificationDispatcher(clearNotification())
    }, 5000)

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
