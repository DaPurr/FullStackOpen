import { useState } from 'react'

const Blog = ({ blog, deleteWithId, likeWithId }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    border: '1px solid black',
    padding: '10px',
    marginTop: '5px',
  }
  const detailsStyle = {
    display: showDetails ? '' : 'none',
  }

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteWithId(blog.id)
    }
  }

  const toggleDetails = () => setShowDetails(!showDetails)

  const textExpanded = 'hide'
  const textNotExpanded = 'view'

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={detailsStyle}>
        <div>{blog.url}</div>
        <div>likes: {blog.likes}</div>
        <button onClick={() => likeWithId(blog.id)}>like</button>
        <div>{blog.user.name}</div>
      </div>
      <button onClick={toggleDetails}>
        {showDetails ? textExpanded : textNotExpanded}
      </button>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Blog
