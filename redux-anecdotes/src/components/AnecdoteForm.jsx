import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { createNotification,
  removeNotification,
  addNotificationTimeOutId } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))

    dispatch(createNotification(`The anecdote '${content}' has been added to the list`))
    const notificationTimeoutId = setTimeout(() => dispatch(removeNotification()), 5000)
    dispatch(addNotificationTimeOutId(notificationTimeoutId))
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={submitAnecdote}>
      <div><input name='anecdote' type='text' id='anecdote'/></div>
      <button type="submit">create</button>
    </form>
  </>
}

export default AnecdoteForm