import anecdoteService from "../services/anecdoteService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "../context/NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], queryClient.getQueryData(['anecdotes']).concat(newAnecdote))
      notificationDispatch({type: 'CREATE_NOTIFICATION', payload: `anecdote ${newAnecdote.content} created`})
      const timeoutId = setTimeout(() => notificationDispatch({type: 'REMOVE_NOTIFICATION'}), 5000)
      notificationDispatch({type: 'SET_TIMEOUT_ID', payload: timeoutId})
    },
    onError: (error) => {
      notificationDispatch({type: 'CREATE_NOTIFICATION', payload: `anecdote too short, must have length >= 5`})
      const timeoutId = setTimeout(() => notificationDispatch({type: 'REMOVE_NOTIFICATION'}), 5000)
      notificationDispatch({type: 'SET_TIMEOUT_ID', payload: timeoutId})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
