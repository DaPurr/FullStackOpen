import { useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './Blog'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.url}</TableCell>
                <TableCell>{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } else if (blogsResult.isPending) {
    return <h2>Loading ...</h2>
  } else {
    return <h2>Error</h2>
  }
}

export default Blogs
