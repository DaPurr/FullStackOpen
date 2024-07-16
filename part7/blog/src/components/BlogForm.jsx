import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.addBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
    onError: error => console.error('error creating new blog:', error),
  })

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
    newBlogMutation.mutate({
      ...blogDetails,
    })
    setBlogDetails({ title: '', author: '', url: '' })
  }

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
            placeholder="title"
          />
        </div>
        <div>
          <label>author:</label>
          <input
            name="author"
            value={blogDetails.author}
            onChange={handleChange}
            placeholder="author"
          />
        </div>
        <div>
          <label>url:</label>
          <input
            name="url"
            value={blogDetails.url}
            onChange={handleChange}
            placeholder="url"
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
