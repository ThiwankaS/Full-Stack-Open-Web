import { useState } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Display = () => {
  const [seletedBlog,setSelectedBlog] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const listToShow = blogs.filter(item => item.user[0].username === user.username)
  const sortByLikes = (a,b) => b.likes - a.likes
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingBottom : 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showBlogView= (blog) => {
    setSelectedBlog(blog)
  }
  return (
    <div>
      <h4>blog app</h4>
      <ul>
        {listToShow.sort(sortByLikes).map(blog => <div onClick={() => showBlogView(blog)} style={blogStyle} key={blog.id}>{blog.title}</div> )}
      </ul>
      <Blog blog={seletedBlog}/>
    </div>
  )
}

export default Display