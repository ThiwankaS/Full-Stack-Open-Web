import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name : 'anecdote',
  initialState : [],
  reducers : {
    createAnecdote (state,action) {
      state.concat(action.payload)
    },
    castVote (state,action ){
      const id = action.payload
      const selectedAnecdote = state.find(anecdote => anecdote.id === id)
      const updateAnecdote = {...selectedAnecdote, votes : selectedAnecdote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : updateAnecdote )
    },
    setAnecdote (state,action) {
      return action.payload
    }
  }
})

export const { createAnecdote,castVote,setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer