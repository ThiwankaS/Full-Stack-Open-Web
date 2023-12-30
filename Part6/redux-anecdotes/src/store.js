import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdote } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdotesService from './services/anecdotes'

const store = configureStore({
    reducer : {
        anecdote : anecdoteReducer,
        filter : filterReducer,
        notification : notificationReducer
    }
})

anecdotesService.getAll().then(anecdote => {
    store.dispatch(setAnecdote(anecdote))
})

export default store