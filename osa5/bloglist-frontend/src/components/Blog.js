import React from 'react'

const Blog = ({blog}) => (
  <div>
    {blog.title} - {blog.author}
  </div>
)

const BlogList = ({blogs}) => {
  return (
    <div>
      {blogs.map(b => <Blog key={b.id} blog={b} />)}
    </div>
  )
}

export default BlogList
