import React, { useState } from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => setShowInfo(!showInfo)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemove = {
    display: (blog.user && user.username === blog.user.username) ? '' : 'none'
  }

  if (!showInfo)
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={toggleInfo} >view</button>
      </div>
    )

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleInfo} >hide</button>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button onClick={ () => addLike(blog) }>like</button>
      </div>
      <div>{blog.author}</div>
      <button style={showRemove} onClick={ () => removeBlog(blog) }>
        remove
      </button>
    </div>
  )
}

const BlogList = ({ blogs, addLike, user, removeBlog }) => {
  return (
    <div>
      {blogs.map(b =>
        <Blog key={b.id} blog={b} addLike={addLike}
          user={user} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default BlogList
