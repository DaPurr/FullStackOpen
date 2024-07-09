import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, deleteWithId }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} deleteWithId={deleteWithId} />
      ))}
    </div>
  )
}

export default Blogs
