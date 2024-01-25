import useValue from '../hooks/customeHooks'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

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
        <div>
          username :
          <input id='username' {...username}/>
        </div>
        <div>
          password :
          <input id='password' {...password}/>
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}
export default LoginForm