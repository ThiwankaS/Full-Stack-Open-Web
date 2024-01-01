import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name : 'anecdote',
  initialState : [],
  reducers : {
    castVote (state,action ){
      const id = action.payload
      const selectedAnecdote = state.find(anecdote => anecdote.id === id)
      const updateAnecdote = {...selectedAnecdote, votes : selectedAnecdote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : updateAnecdote )
    },
    setAnecdote (state,action) {
      return action.payload
    },
    appendAnecdote (state,action) {
      state.push(action.payload)
    }
  }
})

export const { castVote,setAnecdote,appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    const anecdoteToUpdate = {
        content: newAnecdote.content,
        id: newAnecdote.id,
        votes: newAnecdote.votes
    }
    dispatch(appendAnecdote(anecdoteToUpdate))
    const eventDetails = {
      type : ' created ',
      content : content,
      visibility : true
    }
    dispatch(setNotification(eventDetails))
  }
}

export default anecdoteSlice.reducer