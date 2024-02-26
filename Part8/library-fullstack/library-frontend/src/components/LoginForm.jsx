import { useState,useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../assets/queries'

const LoginForm = ({ show,setToken,token }) => {

    const [ username,setUsername ] = useState('')
    const [ password,setPassword ] = useState('')
    const [ login,result ] = useMutation(LOGIN,{
        onError : (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(()=>{
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token',token)
        }
    },[result.data])

    if(!show){
        return null
    }
    if(token){
        return <h4> Click 'logout' button to end the session... </h4>
    }

    const submit = (event) => {
        event.preventDefault()
        login({ variables : { username,password }})
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username : 
                    <input name='username' type='text' onChange={({ target }) => setUsername( target.value )}/>
                </div>
                <div>
                    password : 
                    <input name='password' type='password' onChange={({ target }) => setPassword( target.value ) } /> 
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm