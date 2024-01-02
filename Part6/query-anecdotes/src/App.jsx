import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import { getAnecdotes,updateAnecdotes } from './request'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn : updateAnecdotes,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey: ['anecdote']})
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes : anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey : ['anecdote'],
    queryFn : getAnecdotes
  })

  if(result.isLoading){
    return <div>Loading data...</div>
  }

  const anecdotes = result.data

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
