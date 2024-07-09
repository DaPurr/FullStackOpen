import Blog from './Blog'

const Blogs = ({ blogs, deleteWithId, likeWithId }) => {
  const sortedBlogs = [...blogs].sort((blogA, blogB) => {
    const likesA = blogA.likes ? blogA.likes : 0
    const likesB = blogB.likes ? blogB.likes : 0
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

export default Blogs
