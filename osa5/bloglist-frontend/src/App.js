import React, { useState, useEffect } from 'react'
import BlogList from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggedUser')
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON)
      setUser(user)
      //noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <Login username={username} password={password} setUsername={setUsername}
      setPassword={setPassword} handleLogin={handleLogin} />
  )

  const bloglist = () => (
    <BlogList blogs={blogs} user={user} logout={handleLogout}/>
  )

  return (
    <div>
      <div>{errorMessage}</div>
      {user ? bloglist() : loginForm()}
    </div>
  )
}

export default App
