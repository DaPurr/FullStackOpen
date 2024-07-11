import { useState } from 'react'

const Blog = ({ blog, deleteWithId, likeWithId }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    border: '1px solid black',
    padding: '10px',
    marginTop: '5px',
    width: '20%',
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

  const loggedInName = window.localStorage.getItem('name')

  const showDelete = blog.user.name === loggedInName

  return (
    <div style={blogStyle} data-testid="blog">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
      </div>
      {showDetails && (
        <div style={detailsStyle}>
          <div data-testid="blog-url">{blog.url}</div>
          <div data-testid="blog-likes">likes: {blog.likes}</div>
          <button data-testid="blog-like" onClick={() => likeWithId(blog.id)}>
            like
          </button>
          <div>{blog.user.name}</div>
        </div>
      )}
      <button data-testid="blog-viewhide" onClick={toggleDetails}>
        {showDetails ? textExpanded : textNotExpanded}
      </button>
      {showDelete && <button onClick={handleDelete}>delete</button>}
    </div>
  )
}

export default Blog
