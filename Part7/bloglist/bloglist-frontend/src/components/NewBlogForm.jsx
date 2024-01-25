import { useSelector,useDispatch } from 'react-redux'
import { createBlogList } from '../reducers/bloglistReducer'
import { removeUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const NewBlogForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
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
  return(
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
}

export default NewBlogForm