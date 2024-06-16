import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, makeVoteFor } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(makeVoteFor(id))
  }

  const submitAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const anecdotesToDisplay = anecdotes.toSorted((a1, a2) => {
    return a2.votes - a1.votes
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToDisplay.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div><input name='anecdote' type='text' id='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App