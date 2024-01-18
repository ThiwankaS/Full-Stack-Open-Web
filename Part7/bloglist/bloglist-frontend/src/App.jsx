import { useState,useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blog'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'


const App = () => {

  const dispatch = useDispatch()

  const [ blogs,setBlogs] = useState([])
  const [ user,setUser]   = useState(null)
  const [ username,setUsername ] = useState('')
  const [ password,setPassword ] = useState('')
  const [ listToShow,setListToShow ] = useState([])

  //Download all the availabale records during the initial render
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  },[])

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



  const handleLike = (recordToUpdate) => {
    const updatedRecord = { ...recordToUpdate, user : recordToUpdate.user[0].id,likes : recordToUpdate.likes + 1 }
    updateBlogList(updatedRecord)
  }

  const updateBlogList = async (updatedRecord) => {
    try{
      const updatedListItem = await blogService.updateRecord(updatedRecord)
      const filteredList = listToShow.filter(record => record.id !== updatedListItem.id)
      setListToShow(filteredList.concat(updatedListItem))
    } catch (exception) {
      dispatch(setNotification('Could not update the record','red'))
    }
  }

  const createBlogList = async (newObject) => {
    try{
      const newRecord = await blogService.createRecord(newObject)
      const newListItem = {
        id      : newRecord.id,
        url     : newRecord.url,
        title   : newRecord.title,
        author  : newRecord.author,
        user    : [{ 'id' : user.id, 'name' : user.name, 'username' : user.username }],
        likes   : newRecord.likes
      }
      setListToShow(listToShow.concat(newListItem))
      dispatch(setNotification(`a new blog '${ newObject.title }' added by ${ user.name }`,'green'))
    } catch(exception){
      dispatch(setNotification('Could not creat the record','red'))
    }
  }

  const handleRemove = (recordToDelete) => {
    const confirmation = window.confirm(`Remove blog ${recordToDelete.title} by ${recordToDelete.author}`)
    if(confirmation){
      deleteBlogList(recordToDelete)
    }
  }

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
          createNew={createBlogList}
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
