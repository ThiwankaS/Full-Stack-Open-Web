import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Display from './components/Display'
import UserDetails from './components/UserDetails'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogList } from './reducers/bloglistReducer'
import { setLoggedUser } from './reducers/userReducer'
import { initializeUserDetails } from './reducers/userDetailsReducer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogList())
    dispatch(initializeUserDetails())
    dispatch(setLoggedUser())
  },[dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user === null && <LoginForm /> }
        {user !== null && <NewBlogForm />}
        {user !== null && <Display />}
        {user !== null && <UserDetails />}
      </div>
    </div>
  )
}

export default App