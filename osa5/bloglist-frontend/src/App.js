import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/Blog'
import Login from './components/Login'
import Createblog from './components/Createblog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
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
      blogService.setToken(user.token)
    }
  }, [])

    const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  if (user === null)
    return (
      <>
        <h3>{message}</h3>
        <Login setUser={setUser} setMessage={setMessage} />
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
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <Createblog addBlog={addBlog} setMessage={setMessage}
          blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList blogs={blogs}/>
    </div>
  )
}

export default App
