import React from 'react'

const Blog = ({blog}) => (
  <div>
    {blog.title} - {blog.author}
  </div>
)

const BlogList = ({blogs, user}) => {
  console.log(blogs)
  return (
    <div>
      <h2>blogs</h2>
      <div>{user.username} logged in</div>
      {blogs.map(b => <Blog key={b.id} blog={b} />)}
    </div>
  )
}

export default BlogList
