import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlogList,deleteBlogList } from '../reducers/bloglistReducer'
import Comment from './Comment'
import { ComponentHeading,DisplayItem,Like,Button } from '../assets/styledComponents'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const handleLike = (recordToUpdate) => {
    const updatedRecord = { ...recordToUpdate, user : recordToUpdate.user[0].id,likes : recordToUpdate.likes + 1 }
    try{
      dispatch(updateBlogList(updatedRecord))
    } catch (exception) {
      dispatch(setNotification('Could not update the record','red'))
    }
  }
  const handelDelete = (recordToDelete) => {
    try {
      dispatch(deleteBlogList(recordToDelete))
      dispatch(setNotification(`${recordToDelete.title} sucessfully removed`,'green'))
    } catch (exception) {
      dispatch(setNotification('Could not delete the record','red'))
    }
  }
  if(!blog){
    return null
  }
  return (
    <div>
      <ComponentHeading>{blog.title}</ComponentHeading>
      <div className='buttonDiv'>
        <DisplayItem>Url : {blog.url}</DisplayItem>
        <DisplayItem id='like-element' >Likes : {blog.likes} <Like id='like-button' onClick={() => handleLike(blog)}>like</Like></DisplayItem>
        <DisplayItem>Added by : {blog.user[0].name} </DisplayItem>
        <div><Button onClick={() => handelDelete(blog)}>Delete</Button></div>
        <Comment blog={blog} />
      </div>
    </div>
  )
}

export default Blog