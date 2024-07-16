import { useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './Blog'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blogs = ({ blogs, deleteWithId, likeWithId }) => {
  const queryClient = useQueryClient()
  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  if (blogsResult.isSuccess) {
    const blogs = blogsResult.data
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
  } else if (blogsResult.isPending) {
    return <h2>Loading ...</h2>
  } else {
    return <h2>Error</h2>
  }
}

export default Blogs
