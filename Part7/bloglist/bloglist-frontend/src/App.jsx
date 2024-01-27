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
import { Routes,Route,useNavigate,useMatch } from 'react-router-dom'
import { StyledLink,Navigation,Button,Em } from './assets/styledComponents'

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
    dispatch(setLoggedUser())
    dispatch(initializeUserDetails())
  },[dispatch])

  const handelLogout = async (event) => {
    event.preventDefault()
    dispatch(removeUser())
    navigate('/login')
  }
  return (
    <div>
      <Notification />
      <Navigation>
        <StyledLink style={padding} to='/blogs'>Blogs</StyledLink>
        <StyledLink style={padding} to='/users'>Users</StyledLink>
        {user
          ?<Em>  {user.name} logged in <Button onClick={handelLogout}>Logout</Button> </Em>
          : <StyledLink style={padding} to='/login'>login</StyledLink>
        }
      </Navigation>
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