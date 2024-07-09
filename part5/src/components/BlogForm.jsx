import { useEffect, useState } from 'react'

import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, pushNotification, addBlog }) => {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  const onTitleChange = event => {
    setTitle(event.target.value)
  }

  const onAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const onUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!title || title.length == 0)
      return pushNotification('title must be filled in')
    if (!url || url.length == 0)
      return pushNotification('author must be filled in')

    try {
      const addedBlog = await blogService.addBlog(title, author, url)
      addBlog(addedBlog)
      pushNotification(`A new blog ${title} by ${author} added`, 'success')
    } catch (error) {
      pushNotification(error.message, 'error')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>create new</h2>
        <div>
          <label>title:</label>
          <input onChange={onTitleChange} />
        </div>
        <div>
          <label>author:</label>
          <input onChange={onAuthorChange} />
        </div>
        <div>
          <label>url:</label>
          <input onChange={onUrlChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
