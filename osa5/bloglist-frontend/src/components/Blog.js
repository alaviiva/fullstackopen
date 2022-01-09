import React, {useState} from 'react'

const Blog = ({blog}) => {
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => setShowInfo(!showInfo)

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
      <div>likes: {blog.likes}<button onClick={() => console.log(blog)}>like</button></div>
      <div>{blog.author}</div>
    </div>
  )
}

const BlogList = ({blogs}) => {
  return (
    <div>
      {blogs.map(b => <Blog key={b.id} blog={b} />)}
    </div>
  )
}

export default BlogList
