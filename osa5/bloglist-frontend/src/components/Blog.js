import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, update, user}) => {
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => setShowInfo(!showInfo)

  const addLike = async () => {
    await blogService.update(blog.id, {likes: blog.likes + 1})
    update()
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      update()
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemove = {
    display: user.username === blog.user.username ? '' : 'none'
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
      <div>likes: {blog.likes}<button onClick={addLike}>like</button></div>
      <div>{blog.author}</div>
      <button style={showRemove} onClick={removeBlog}>remove</button>
    </div>
  )
}

const BlogList = ({blogs, updateBlogs, user}) => {
  return (
    <div>
      {blogs.map(b =>
        <Blog key={b.id} blog={b} update={updateBlogs} user={user} />
      )}
    </div>
  )
}

export default BlogList
