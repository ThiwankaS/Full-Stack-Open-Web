import { useState,useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {

  const defaultMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const [ blogs,setBlogs] = useState([])
  const [ user,setUser]   = useState(null)
  const [ username,setUsername ] = useState('')
  const [ password,setPassword ] = useState('')
  const [ listToShow,setListToShow ] = useState([])
  const [ title,setTitle ] = useState('')
  const [ author,setAuthor ] = useState('')
  const [url,setUrl ] = useState('')
  const [ message,setMessage ] = useState(null)
  const [ messageStyle,setMessageStyle ] = useState(defaultMessage)

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

  const displayNotification = (color,message) => {
    const updatedStyle = {...messageStyle,color: color ,borderColor: color} 
      setMessageStyle(updatedStyle); 
      setMessage(message)
      setTimeout(()=> {
            setMessage(null)
      },5000)
  }

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
      const color = 'red'
      const message = 'wrong username or passwrod'
      displayNotification(color,message)
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
      const color = 'red'
      const message = 'Oops! something went wrong'
      displayNotification(color,message)
    }
  }

  const handelCreateNew = async (event) => {
    event.preventDefault()
    
    try{
      const newObject = {
        title : title,
        author : author,
        url : url
      }
      blogService.createRecord(newObject)
      setListToShow(listToShow.concat(newObject))
      setTitle('')
      setAuthor('')
      setUrl('')
      const color = 'green'
      const message = `a new blog \' ${ newObject.title } \' added by ${ user.name }`
      displayNotification(color,message)
    } catch(exception){
      const color = 'red'
      const message = 'Could not creat the record'
      displayNotification(color,message)
    }
  }

  const loginForm = () => (
      <div>
        <form onSubmit={handelLogin}>
          <div>
            username : 
            <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            password : 
            <input type='password' value={password} name='Password' onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )

  const display = () => (
    <div>
      <h4>previous list</h4>
      {listToShow.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )

  const newBlogForm = () => (
    <div>
      <p>{user.name} logged in <button onClick={handelLogout}>Logout</button></p>
      <h4>create new</h4>
      <form onSubmit={handelCreateNew}>
        <div>
              title : 
              <input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
              author : 
              <input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
              url : 
              <input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageStyle={messageStyle} />
      <div>
      {user === null && loginForm()}
      {user !== null && newBlogForm()}
      {user !== null && display()}
      </div>
    </div>
  )
}

export default App
