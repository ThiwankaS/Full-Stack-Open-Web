import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Notification = () => {

  const notification = useSelector(({notification}) => notification)
  const [ visibility,setVisibility ] = useState(true)
  const [ message,setMessage ] = useState(null)

  useEffect(()=>{
    const content = 'you' + notification.type + `' ${notification.content} '`
    setVisibility(true)
    setMessage(content)
  },[notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  setTimeout(()=>{
    setVisibility(false)
  },5000)

  return (
    <div>
        { visibility && notification.visibility && 
          <div style={style}>{message}</div> 
        } 
    </div>
  )
}

export default Notification