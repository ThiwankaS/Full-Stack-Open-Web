import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

    const anecdotes = useSelector(({ filter,anecdote }) => {
        if(filter !== 'ALL'){
            return anecdote.filter(anecdote => anecdote.content.includes(filter))
        }
        return anecdote
    })

    const dispatch = useDispatch()
  
    const vote = ({id,content}) => {
      dispatch(castVote(id))
      const eventDetails = {
        type : ' voted ',
        content : content,
        visibility : true
      }
      dispatch(setNotification(eventDetails))
    }

    const style = {
        marginBottom : 2,
        marginTop : 2
    }
  
    const sortByVotes = (a,b) => b.votes - a.votes

    return(
        <div>
            {anecdotes.slice().sort(sortByVotes).map(anecdote =>
                <div key={anecdote.id} style={style}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList