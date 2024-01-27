import { ComponentHeading,Li} from '../assets/styledComponents'

const IndividualView = ({ user }) => {
  if(!user){
    return null
  }
  return (
    <div>
      <ComponentHeading>{user.name}</ComponentHeading>
      <ul>
        {user.blogs.map(item => <Li key={item.id} >{item.title}</Li>)}
      </ul>
    </div>
  )}

export default IndividualView