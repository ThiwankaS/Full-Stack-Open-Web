import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => 
                          state.anecdote.map(obj => 
                            <div 
                              key={obj.id}>{obj.id} {obj.votes}
                            </div>
                        ))

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification