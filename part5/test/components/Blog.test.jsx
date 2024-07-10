import { expect, test, vi } from 'vitest'
import Blog from '../../src/components/Blog'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('given valid blog, render content', () => {
  // given
  const givenBlog = {
    id: 123,
    title: 'Nice title',
    author: 'Best author',
    url: 'internet.com/blog',
    likes: 1,
    user: { name: 'mod' },
  }
  // when
  render(<Blog blog={givenBlog} />)
  // then
  const titleElement = screen.getByText('Nice title')
  const authorElement = screen.getByText('Best author')
  const urlElement = screen.queryByTestId('blog-url')
  const likesElement = screen.queryByTestId('blog-likes')
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('given valid blog, when click on details, then show details', () => {
  // given
  const givenBlog = {
    id: 123,
    title: 'Nice title',
    author: 'Best author',
    url: 'internet.com/blog',
    likes: 1,
    user: { name: 'mod' },
  }
  render(<Blog blog={givenBlog} />)
  const user = userEvent.setup()
  const buttonViewDetails = screen.getByText('view')
  // when
  user.click(buttonViewDetails)
  // then
  const urlElement = screen.queryByText('internet.com/blog')
  const likesElement = screen.queryByText('1')
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('given valid blog, when click on details and 2x like, then handler is called 2x', async () => {
  // given
  const mockLikeHandler = vi.fn()
  const givenBlog = {
    id: 123,
    title: 'Nice title',
    author: 'Best author',
    url: 'internet.com/blog',
    likes: 1,
    user: { name: 'mod' },
  }
  render(<Blog blog={givenBlog} likeWithId={mockLikeHandler} />)
  const user = userEvent.setup()
  const buttonViewDetails = screen.getByTestId('blog-viewhide')
  await waitFor(() => user.click(buttonViewDetails))
  const buttonLike = screen.getByTestId('blog-like')
  // when
  await waitFor(() => user.click(buttonLike))
  await waitFor(() => user.click(buttonLike))
  // then
  expect(mockLikeHandler).toHaveBeenCalledTimes(2)
})
