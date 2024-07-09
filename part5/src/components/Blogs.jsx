import Blog from './Blog'

const Blogs = ({ blogs, deleteWithId, likeWithId }) => {
  return (
    <div>
      {blogs.map(blog => (
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

export default Blogs
