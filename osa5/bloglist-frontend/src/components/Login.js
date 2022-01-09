import React, {useState} from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = ({setUser, setMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label> username
          <input type="text" value={username} name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </label>
      </div>
      <div>
        <label> password
          <input type="password" value={password} name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )
}

export default Login
