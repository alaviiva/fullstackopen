import React from 'react'

const Blog = ({blog}) => (
  <div>
    {blog.title} - {blog.author}
  </div>
)

const BlogList = ({blogs, user, logout}) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>{user.username} logged in <button onClick={logout}>logout</button></div>
      {blogs.map(b => <Blog key={b.id} blog={b} />)}
    </div>
  )
}

export default BlogList
