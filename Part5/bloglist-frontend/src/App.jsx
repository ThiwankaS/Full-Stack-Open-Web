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

  const handelLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username,password })
      setUser(loggedInUser)
      const blogList = blogs.filter(record => record.user[0].username === loggedInUser.username)
      setListToShow(blogList)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  if(user === null){
    return(
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
  }

  return (
    <div>
      <h2>blogs</h2>
      {listToShow.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}

export default App
