import React from 'react'
import blogService from '../services/blogs'

const Createblog = ({title, setTitle, author, setAuthor, url,
    setUrl, handleCreate}) => {
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
