import { useEffect, useState } from 'react'

import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, pushNotification, addBlog }) => {
  const [blogDetails, setBlogDetails] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = event => {
    const { name, value } = event.target
    setBlogDetails({ ...blogDetails, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (blogDetails.title.length === 0)
      return pushNotification('title must be filled in')
    if (blogDetails.url.length === 0)
      return pushNotification('author must be filled in')

    try {
      const addedBlog = await blogService.addBlog(
        blogDetails.title,
        blogDetails.author,
        blogDetails.url
      )
      addBlog(addedBlog)
      pushNotification(
        `A new blog ${blogDetails.title} by ${blogDetails.author} added`,
        'success'
      )
      setBlogDetails({ title: '', author: '', url: '' })
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
          <input
            name="title"
            value={blogDetails.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            name="author"
            value={blogDetails.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>url:</label>
          <input name="url" value={blogDetails.url} onChange={handleChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
