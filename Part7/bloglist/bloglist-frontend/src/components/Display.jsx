import { useState } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import { ComponentHeading,Item } from '../assets/styledComponents'

const Display = () => {
  let blogs = useSelector(state => state.blogs)
  const [seletedBlog,setSelectedBlog] = useState(null)
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
      <NewBlogForm />
      <ComponentHeading>Blog app</ComponentHeading>
      <ul>
        {blogs.map(blog => <Item onClick={() => showBlogView(blog)} style={blogStyle} key={blog.id}>{blog.title}</Item> )}
      </ul>
      <Blog blog={seletedBlog} />
    </div>
  )
}

export default Display