import { useState,useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogDisplay from './components/BlogDisplay'
import blogService from './service/blog'

const App = () => {
  const list = [
    {
        id : 1,
        title: "MongoDB",
        author: "Kaushalya Roshini",
        url: "wwww.cloud.mongodb.com",
        likes: 2000
    },
    {
        id : 2,
        title: "Express.JS",
        author: "Thiwanka Somachandra",
        url: "www.expressjs.com",
        likes: 3000
    },
    {
        id : 3,
        title: "JavaScript",
        author: "Liisa Marttinen",
        url: "www.fullstackopen.com",
        likes: 6560,
    }
]

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
      <h2>Blog List App</h2>
      <BlogForm blogListItem={blogListItem} setBlogListItem={setBlogListItem} handelSubmit={handelSubmit}/>
      <br />
      <BlogDisplay list={listToDisplay}/>
    </div>
  )
}

export default App
