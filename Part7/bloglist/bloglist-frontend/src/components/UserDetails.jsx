/* eslint-disable react/jsx-key */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import IndividualView from './IndividualView'

const UserDetails = () => {
  const users = useSelector(state => state.users)
  const [selectedUser,setSelectedUser] = useState(null)
  const showIndividualUser = (user) => {
    setSelectedUser(user)
  }
  return (
    <div>
      <h2>users</h2>
      <div>
        <table>
          <tr><th>user</th><th>blogs created</th></tr>
          {users.map(user=>
            <tr><td onClick={() => showIndividualUser(user)}>{user.name}</td><td>{user.blogs.length}</td></tr>
          )}
        </table>
        <IndividualView user={selectedUser}/>
      </div>
    </div>)
}

export default UserDetails