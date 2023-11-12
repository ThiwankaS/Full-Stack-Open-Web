import { useState,useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogDisplay from './components/BlogDisplay'
import blogService from './service/blog'
import './App.css'

const App = () => {

  const [ blogListItem,setBlogListItem ] = useState({
        title: "",
        author: "",
        url: "",
        likes: 0
  })
  const [ listToDisplay,setListToDisplay ] = useState ([])

  useEffect(() => {
    blogService.getAll().then(initialRecords => setListToDisplay(initialRecords))
  },[])

  const handelSubmit = (event) => {
    event.preventDefault()
    const newRecord = {...blogListItem}
    blogService.creatRecord(newRecord).then(record => {
      setListToDisplay(listToDisplay.concat(record))
      setBlogListItem({
          title: "",
          author: "",
          url: "",
          likes: 0
      })
    })
  }
  return (
    <div>
      <BlogForm blogListItem={blogListItem} setBlogListItem={setBlogListItem} handelSubmit={handelSubmit}/>
      <br />
      <BlogDisplay list={listToDisplay}/>
    </div>
  )
}

export default App
