import { useSelector,useDispatch } from 'react-redux'
import { createBlogList } from '../reducers/bloglistReducer'
import { setNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { ComponentHeading } from '../assets/styledComponents'

const NewBlogForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleCreateBlogList = async (newObject) => {
    try{
      const newListItem = { ...newObject, user: [{ 'id' : user.id, 'name' : user.name, 'username' : user.username }] }
      dispatch(createBlogList(newListItem))
      dispatch(setNotification(`a new blog '${ newObject.title }' added by ${ user.name }`,'green'))
    } catch(exception){
      dispatch(setNotification('Could not creat the record','red'))
    }
  }
  if(!user){
    return null
  }
  return(
    <div>
      <ComponentHeading>Create new blog list</ComponentHeading>
      <Togglable buttonLable='Create New'>
        <BlogForm
          createNew={handleCreateBlogList}
        />
      </Togglable>
    </div>
  )
}

export default NewBlogForm