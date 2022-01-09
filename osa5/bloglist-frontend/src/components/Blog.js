import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, update}) => {
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => setShowInfo(!showInfo)

  const addLike = async () => {
    await blogService.update(blog.id, {likes: blog.likes + 1})
    update()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      <button onClick={() => console.log(blog)}>kala</button>
    </div>
  )
}

const BlogList = ({blogs, updateBlogs}) => {
  return (
    <div>
      {blogs.map(b => <Blog key={b.id} blog={b} update={updateBlogs} />)}
    </div>
  )
}

export default BlogList
