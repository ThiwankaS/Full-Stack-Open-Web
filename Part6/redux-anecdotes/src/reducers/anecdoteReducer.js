import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name : 'anecdote',
  initialState : [],
  reducers : {
    updateAnecdote (state,action ) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload )
    },
    setAnecdote (state,action) {
      return action.payload
    },
    appendAnecdote (state,action) {
      state.push(action.payload)
    }
  }
})

export const { updateAnecdote,setAnecdote,appendAnecdote } = anecdoteSlice.actions

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

export const castVote = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    const content = anecdote.content
    const updatedObj = { ...anecdote, votes : anecdote.votes + 1 }
    const newAnecdote = await anecdoteService.updateRecord(id,updatedObj)
    dispatch(updateAnecdote(newAnecdote))
    const eventDetails = {
      type : ' voted ',
      content : content,
      visibility : true
    }
    dispatch(setNotification(eventDetails))
  }
} 

export default anecdoteSlice.reducer