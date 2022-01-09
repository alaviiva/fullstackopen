import React, {useState} from 'react'
import blogService from '../services/blogs'

const Createblog = ({addBlog, setMessage, blogFormRef}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {title, author, url}
      const createdBlog = await blogService.create(newBlog)
      addBlog(createdBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
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

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={handleCreate}>
        <div>
          <label> title:
            <input type="text" value={title} name="Title"
              onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label> author:
            <input type="text" value={author} name="Author"
              onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label> url:
            <input type="text" value={url} name="Url"
              onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default Createblog
