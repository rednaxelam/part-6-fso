import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdoteService'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const anecdoteVoteMutation = useMutation({
    mutationFn: anecdoteService.voteForAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(
        ['anecdotes'],
        queryClient.getQueryData(['anecdotes'])
                   .map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote)
      )
    }
  })

  const handleVote = (anecdote) => {
    anecdoteVoteMutation.mutate(anecdote)
  }

  const anecdoteQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false
  })

  if (anecdoteQuery.isLoading) {
    return <div>anecdotes are loading</div>
  } else if (anecdoteQuery.isError) {
    return <div>anecdote service is unavailable</div>
  }

  const anecdotes = anecdoteQuery.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
