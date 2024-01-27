/* eslint-disable react/jsx-key */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import IndividualView from './IndividualView'
import { ComponentHeading,Table,THead,TBody,TH,TR,TD,TDD } from '../assets/styledComponents'
import { tableHeading,theData } from '../assets/styleClasses'

const UserDetails = () => {
  const users = useSelector(state => state.users)
  const [selectedUser,setSelectedUser] = useState(null)
  const showIndividualUser = (user) => {
    setSelectedUser(user)
  }

  return (
    <div>
      <ComponentHeading>Users</ComponentHeading>
      <div>
        <Table>
          <THead>
            <TR><TH style={tableHeading}>User</TH><TH style={tableHeading}>Blogs created</TH></TR>
          </THead>
          <TBody>
            {users.map(user=>
              <TR key={user.id}><TD style={theData} onClick={() => showIndividualUser(user)}>{user.name}</TD><TDD style={theData}>{user.blogs.length}</TDD></TR>
            )}
          </TBody>
        </Table>
        <IndividualView user={selectedUser}/>
      </div>
    </div>)
}

export default UserDetails