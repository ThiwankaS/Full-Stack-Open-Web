import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlogList } from '../reducers/bloglistReducer'

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
  if(!blog){
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div className='buttonDiv'>
        <div>url : {blog.url}</div>
        <div id='like-element' >likes : {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button></div>
        <div>Added by : {blog.user[0].name} </div>
        <h4>comments</h4>
        <ul>
          { blog.comments.map(n => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog