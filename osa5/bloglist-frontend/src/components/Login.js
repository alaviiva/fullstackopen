import React from 'react'

const Login = ({username, password, setUsername, setPassword, handleLogin}) => (
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

export default Login
