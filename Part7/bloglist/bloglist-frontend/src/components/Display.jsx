import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const Display = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const listToShow = blogs.filter(item => item.user[0].username === user.username)
  const sortByLikes = (a,b) => b.likes - a.likes
  return (
    <div>
      <h4>previous list</h4>
      <div>{listToShow.sort(sortByLikes).map(blog => <Blog blog={blog} key={blog.id}/>)}</div>
    </div>
  )
}

export default Display