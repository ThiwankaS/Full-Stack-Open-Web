import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import ancedoteService from '../services/anecdotes'

const AnecdoteFrom = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = ancedoteService.createNew(content)
        const anecdoteToUpdate = {
            content: newAnecdote.content,
            id: newAnecdote.id,
            votes: newAnecdote.votes
        }
        dispatch(createAnecdote(anecdoteToUpdate))
        const eventDetails = {
            type : ' created ',
            content : content,
            visibility : true
          }
        dispatch(setNotification(eventDetails))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}
export default AnecdoteFrom