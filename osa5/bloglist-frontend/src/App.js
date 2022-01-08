import React, { useState, useEffect } from 'react'
import BlogList from './components/Blog'
import Login from './components/Login'
import Createblog from './components/Createblog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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
      blogService.setToken(user.token)
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
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {title, author, url}
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('invalid blog data')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null)
    return (
      <>
        <h3>{message}</h3>
        <Login username={username} password={password} setUsername={setUsername}
          setPassword={setPassword} handleLogin={handleLogin} />
      </>
    )

  return (
    <div>
      <h2>blogs</h2>
      <h3>{message}</h3>
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Createblog title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl} handleCreate={handleCreate} />
      <BlogList blogs={blogs}/>
    </div>
  )
}

export default App
