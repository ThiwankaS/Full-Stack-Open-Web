import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Display from './components/Display'
import UserDetails from './components/UserDetails'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogList } from './reducers/bloglistReducer'
import { setLoggedUser,removeUser } from './reducers/userReducer'
import { initializeUserDetails } from './reducers/userDetailsReducer'
import { Routes,Route,Link,useNavigate,useMatch } from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null
  const padding = {
    padding : 5
  }

  useEffect(() => {
    dispatch(initializeBlogList())
    dispatch(initializeUserDetails())
    dispatch(setLoggedUser())
  },[dispatch])
  const handelLogout = async (event) => {
    event.preventDefault()
    dispatch(removeUser())
    navigate('/login')
  }
  return (
    <div>
      <Notification />
      <div>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        {user
          ? <em>{user.name} logged in <button onClick={handelLogout}>Logout</button> </em>
          : <Link style={padding} to='/login'>login</Link>
        }
      </div>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/blogs' element={<Display />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} />} />
        <Route path='/users' element={<UserDetails />} />
        <Route path='/create_blog' element={<NewBlogForm />} />
      </Routes>
    </div>
  )
}

export default App