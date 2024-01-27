import useValue from '../hooks/customeHooks'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Button,Lable,Input,Table,TBody,TR,TD } from '../assets/styledComponents'
import { cellStyleLable,cellStyleInput } from '../assets/styleClasses'

const LoginForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { reset : usernameReset,...username } = useValue('text')
  const { reset : passwordRest,...password } = useValue('password')

  const handelLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username : username.value,
      password : password.value
    }
    dispatch(setLoginUser(credentials))
    usernameReset()
    passwordRest()
    navigate('/create_blog')
  }

  return (
    <div>
      <form onSubmit={handelLogin}>
        <Table>
          <TBody>
            <TR>
              <TD style={cellStyleLable}><Lable>Username :</Lable></TD>
              <TD style={cellStyleInput}><Input id='username' {...username}/></TD>
            </TR>
            <TR>
              <TD style={cellStyleLable}><Lable>Password :</Lable></TD>
              <TD style={cellStyleInput}><Input id='password' {...password}/></TD>
            </TR>
          </TBody>
        </Table>
        <Button id='login-button' type='submit'>Login</Button>
      </form>
    </div>
  )
}
export default LoginForm