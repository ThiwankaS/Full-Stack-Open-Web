const LoginForm = ({ handelLogin,username,password,handleUsernameChange,handlePasswordChange }) => {
    return (
        <div>
            <form onSubmit={handelLogin}>
                <div>
                    username : 
                    <input type='text' value={username} name='Username' onChange={handleUsernameChange}/>
                </div>
                <div>
                    password : 
                    <input type='password' value={password} name='Password' onChange={handlePasswordChange}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
export default LoginForm