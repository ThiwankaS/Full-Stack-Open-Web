import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './src/reducers/notificationReducer'
import bloglistReducer from './src/reducers/bloglistReducer'

const store = configureStore({
  reducer : {
    notification : notificationReducer,
    blogs : bloglistReducer
  }
})

export default store