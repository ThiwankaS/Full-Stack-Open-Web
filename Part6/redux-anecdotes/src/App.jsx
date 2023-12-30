import { useEffect } from 'react'
import AnecdoteFrom from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    anecdotesService.getAll().then(anecdote => {
      dispatch(setAnecdote(anecdote))
  })
  },[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteFrom />
    </div>
  )
}

export default App