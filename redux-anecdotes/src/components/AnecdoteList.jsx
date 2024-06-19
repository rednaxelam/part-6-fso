import { useSelector, useDispatch } from 'react-redux'
import { makeVoteFor } from '../reducers/anecdoteReducer'
import { createNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes.filter(({content}) => content.toLowerCase().includes(filter))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(makeVoteFor(id))
    dispatch(createNotification(`You liked '${anecdotes.find(anecdote => anecdote.id === id).content}'`, 5))
  }

  const sortedAnecdotes = anecdotes.toSorted((a1, a2) => {
    return a2.votes - a1.votes
  })

  return <>
    {sortedAnecdotes.map(anecdote =>
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