import { useState,useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blog'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogList,createBlogList } from './reducers/bloglistReducer'


const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const [ listToShow,setListToShow ] = useState([])

  const [ user,setUser]   = useState(null)
  const [ username,setUsername ] = useState('')
  const [ password,setPassword ] = useState('')

  //Download all the availabale records during the initial render
  useEffect(() => {
    dispatch(initializeBlogList())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      const loggedInUser = JSON.parse(loggedUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      const blogList = blogs.filter(record => record.user[0].username === loggedInUser.username)
      setListToShow(blogList)
    }
  },[blogs])

  const handelLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username,password })
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      const blogList = blogs.filter(record => record.user[0].username === loggedInUser.username)
      setListToShow(blogList)
      window.localStorage.setItem('loggedInUser',JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or passwrod','red'))
    }
  }
  //Need to refactor below function
  const handelLogout = async (event) => {
    event.preventDefault()
    try{
      setUser(null)
      blogService.setToken(null)
      window.localStorage.removeItem('loggedInUser')
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Oops! something went wrong','red'))
    }
  }
  //Need to refactor below function
  const handleLike = (recordToUpdate) => {
    const updatedRecord = { ...recordToUpdate, user : recordToUpdate.user[0].id,likes : recordToUpdate.likes + 1 }
    updateBlogList(updatedRecord)
  }
  //Need to refactor below function
  const updateBlogList = async (updatedRecord) => {
    try{
      const updatedListItem = await blogService.updateRecord(updatedRecord)
      const filteredList = listToShow.filter(record => record.id !== updatedListItem.id)
      setListToShow(filteredList.concat(updatedListItem))
    } catch (exception) {
      dispatch(setNotification('Could not update the record','red'))
    }
  }

  const handleCreateBlogList = async (newObject) => {
    try{
      const newListItem = { ...newObject,user: [{ 'id' : user.id, 'name' : user.name, 'username' : user.username }] }
      dispatch(createBlogList(newListItem))
      dispatch(setNotification(`a new blog '${ newObject.title }' added by ${ user.name }`,'green'))
    } catch(exception){
      dispatch(setNotification('Could not creat the record','red'))
    }
  }
  //Need to refactor below function
  const handleRemove = (recordToDelete) => {
    const confirmation = window.confirm(`Remove blog ${recordToDelete.title} by ${recordToDelete.author}`)
    if(confirmation){
      deleteBlogList(recordToDelete)
    }
  }
  //Need to refactor below function
  const deleteBlogList = async (recordToDelete) => {
    try {
      await blogService.deleteRecord(recordToDelete)
      const filteredList = listToShow.filter(record => record.id !== recordToDelete.id)
      setListToShow(filteredList)
    } catch (exception) {
      dispatch(setNotification('Could not delete the record','red'))
    }
  }

  const loginForm = () => (
    //Need to refactor below function
    <div>
      <LoginForm
        handelLogin={handelLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
  )
  //Need to refactor below function
  const display = () => {
    const sortByLikes = (a,b) => b.likes - a.likes
    return(
      <div>
        <h4>previous list</h4>
        <div>
          {listToShow.sort(sortByLikes).map(blog => <Blog
            key={blog.id}
            blog={blog}
            handleClickLikeButton={handleLike}
            handleClickRemoveButton={handleRemove}
            user={user}
          />)}
        </div>
      </div>
    )
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
        {user === null && loginForm()}
        {user !== null && newBlogForm()}
        {user !== null && display()}
      </div>
    </div>
  )
}

export default App
