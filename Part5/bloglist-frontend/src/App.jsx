import { useState,useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {

  const [ blogs,setBlogs] = useState([])
  const [ user,setUser]   = useState(null)
  const [ username,setUsername ] = useState('')
  const [ password,setPassword ] = useState('')
  const [ listToShow,setListToShow ] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      const loggedInUser = JSON.parse(loggedUserJSON)
      setUser(loggedInUser)
      const blogList = blogs.filter(record => record.user[0].username === loggedInUser.username)
      setListToShow(blogList)
    }
  },[blogs])

  const handelLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username,password })
      setUser(loggedInUser)
      const blogList = blogs.filter(record => record.user[0].username === loggedInUser.username)
      setListToShow(blogList)
      window.localStorage.setItem('loggedInUser',JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handelLogout = async (event) => {
    event.preventDefault()
    try{
      setUser(null)
      window.localStorage.removeItem('loggedInUser')
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Oops! something went wrong')
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
      <p>{user.name} logged in <button onClick={handelLogout}>Logout</button></p>
      {listToShow.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <div>
      {user === null && loginForm()}
      {user !== null && display()}
      </div>
    </div>
  )
}

export default App
