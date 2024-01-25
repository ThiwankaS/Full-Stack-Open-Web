/* eslint-disable react/jsx-key */
import { useSelector } from 'react-redux'

const UserDetails = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h2>users</h2>
      <div>
        <table>
          <tr><th>user</th><th>blogs created</th></tr>
          {users.map(user=>
            <tr><td>{user.name}</td><td>{user.blogs.length}</td></tr>
          )}
        </table>
      </div>
    </div>)
}

export default UserDetails