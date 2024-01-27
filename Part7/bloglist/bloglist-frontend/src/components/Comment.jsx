import useValue from '../hooks/customeHooks'
import { addCommentToBlogList } from '../reducers/bloglistReducer'
import { useDispatch } from 'react-redux'
import { ComponentHeading,Button,Input,Li } from '../assets/styledComponents'

const Comment = ({ blog }) => {

  const { reset : commentReset, ...comment } = useValue('text')
  const dispatch = useDispatch()
  const generateId = () => {
    return Math.floor(Math.random()*1000)
  }
  const handelAddComment = (event) => {
    event.preventDefault()
    const recordToUpdate = { ...blog,comments : blog.comments.concat({ id : generateId(),value : comment.value }) }
    dispatch(addCommentToBlogList(recordToUpdate))
    commentReset()
  }
  return (
    <div>
      <ComponentHeading>Comments</ComponentHeading>
      <Input placeholder='type your comment here...' {...comment}></Input>
      <Button type='submit' onClick={handelAddComment}>add comment</Button>
      <ul>
        { blog.comments.map(n => <Li key={n.id}>{n.value}</Li>)}
      </ul>
    </div>)
}

export default Comment