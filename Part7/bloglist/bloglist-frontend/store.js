import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './src/reducers/notificationReducer'
import bloglistReducer from './src/reducers/bloglistReducer'
import userReducer from './src/reducers/userReducer'
import userDetailsReducer from './src/reducers/userDetailsReducer'

const store = configureStore({
  reducer : {
    notification : notificationReducer,
    blogs : bloglistReducer,
    user : userReducer,
    users : userDetailsReducer
  }
})

export default store