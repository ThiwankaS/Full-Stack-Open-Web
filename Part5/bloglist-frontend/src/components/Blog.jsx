import { useState } from 'react'

const Blog = ({ blog,handleClickLikeButton,handleClickRemoveButton,user }) => {
  const [ visibility,setVisibility ] = useState(false)
  const [ buttonLable,setButtonLable ] = useState('Show')
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingBottom : 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle ={
    backgroundColor : '#D1583E'
  }

  const showDetails = { display : visibility ? '' : 'none' }

  const toggaleVisibility = () => {
    setVisibility(!visibility)
    setButtonLable(visibility ? 'Show' : 'Hide')
  }
  return (
    <div style={blogStyle}>
      <div className='titleDiv'>Titile : {blog.title} <button onClick={toggaleVisibility}>{buttonLable}</button></div>
      <div className='buttonDiv' style={showDetails}>
        <div>url : {blog.url}</div>
        <div>likes : {blog.likes} <button onClick={() => handleClickLikeButton(blog)}>like</button></div>
        <div>Created by : {user.name} </div>
        <div><button style={buttonStyle} onClick={() => handleClickRemoveButton(blog)}>Remove</button></div>
      </div>
    </div>
  )
}

export default Blog