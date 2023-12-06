import { useState } from 'react'

const BlogForm = ({ createNew }) => {

  const [ title,setTitle ] = useState('')
  const [ author,setAuthor ] = useState('')
  const [ url,setUrl ] = useState('')

  const handleCreateNew = (event) => {
    event.preventDefault()
    const newObject = {
      title,
      author,
      url
    }
    createNew(newObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleCreateNew}>
        <div>
            title :
          <input type='text' value={title} name='Title' onChange={event => setTitle(event.target.value)}/>
        </div>
        <div>
            author :
          <input type='text' value={author} name='Author' onChange={event => setAuthor(event.target.value)}/>
        </div>
        <div>
            url :
          <input type='text' value={url} name='Url' onChange={event => setUrl(event.target.value)}/>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm