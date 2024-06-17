import { useSelector, useDispatch } from 'react-redux'
import { makeVoteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(makeVoteFor(id))
  }

  const anecdotesToDisplay = anecdotes.toSorted((a1, a2) => {
    return a2.votes - a1.votes
  })

  return <>
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
  </>
}

export default AnecdoteList