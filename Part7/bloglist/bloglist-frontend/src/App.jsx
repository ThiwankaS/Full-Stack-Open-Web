import { useState,useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Display from './components/Display'
import UserDetails from './components/UserDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogList,createBlogList } from './reducers/bloglistReducer'
import { removeUser,setLoggedUser } from './reducers/userReducer'
import { initializeUserDetails } from './reducers/userDetailsReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [ listToShow,setListToShow ] = useState([])

  //Download all the availabale records during the initial render
  useEffect(() => {
    dispatch(initializeBlogList())
    dispatch(initializeUserDetails())
    dispatch(setLoggedUser())
  },[dispatch])

  //setListToShow(blogs.filter(list => list.user[0].username === user.username))

  //Need to refactor below function
  const handelLogout = async (event) => {
    event.preventDefault()
    dispatch(removeUser())
  }

  const handleCreateBlogList = async (newObject) => {
    try{
      const newListItem = { ...newObject, user: [{ 'id' : user.id, 'name' : user.name, 'username' : user.username }] }
      dispatch(createBlogList(newListItem))
      dispatch(setNotification(`a new blog '${ newObject.title }' added by ${ user.name }`,'green'))
    } catch(exception){
      dispatch(setNotification('Could not creat the record','red'))
    }
  }

  const newBlogForm = () => (
    <div>
      <p>{user.name} logged in <button onClick={handelLogout}>Logout</button></p>
      <h4>Create new blog list</h4>
      <Togglable buttonLable='Create New'>
        <BlogForm
          createNew={handleCreateBlogList}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user === null && <LoginForm /> }
        {user !== null && newBlogForm()}
        {user !== null && <Display />}
        {user !== null && <UserDetails />}
      </div>
    </div>
  )
}

export default App