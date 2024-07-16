import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, deleteWithId, likeWithId }) => {
  const sortedBlogs = [...blogs].sort((blogA, blogB) => {
    const likesA = blogA.likes ?? 0
    const likesB = blogB.likes ?? 0
    return likesB - likesA
  })

  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteWithId={deleteWithId}
          likeWithId={likeWithId}
        />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blogs
