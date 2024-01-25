const IndividualView = ({ user }) => {
  if(!user){
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(item => <li key={item.id} >{item.title}</li>)}
      </ul>
    </div>
  )}

export default IndividualView