import { useState } from 'react'

const Blog = ({ blog, deleteWithId, likeWithId }) => {
  const [isShowDetails, setIsShowDetails] = useState(false)

  const blogStyle = {
    border: '1px solid black',
    padding: '10px',
    marginTop: '5px',
  }
  const detailsStyle = {
    display: isShowDetails ? '' : 'none',
  }

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
      <button onClick={() => setIsShowDetails(!isShowDetails)}>
        {isShowDetails ? textExpanded : textNotExpanded}
      </button>
      <button onClick={() => deleteWithId(blog.id)}>delete</button>
    </div>
  )
}

export default Blog
