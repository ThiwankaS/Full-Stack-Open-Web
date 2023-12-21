import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({ filter,anecdote }) => {
        if(filter !== 'ALL'){
            return anecdote.filter(anecdote => anecdote.content.includes(filter))
        }
        return anecdote
    })

    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(castVote(id))
    }

    const style = {
        marginBottom : 2,
        marginTop : 2
    }
  
    const sortByVotes = (a,b) => b.votes - a.votes

    return(
        <div>
            {anecdotes.sort(sortByVotes).map(anecdote =>
                <div key={anecdote.id} style={style}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList