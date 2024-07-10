import { render, screen, waitFor } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import BlogForm from '../../src/components/BlogForm'
import userEvent from '@testing-library/user-event'

test('given form with valid input, when submitting, then submit correct details', async () => {
  // given
  const mockAddBlog = vi.fn()
  const mockSetBlogs = vi.fn()
  const mockPushNotification = vi.fn()
  const user = userEvent.setup()
  render(
    <BlogForm
      addBlog={mockAddBlog}
      setBlogs={mockSetBlogs}
      pushNotification={mockPushNotification}
    />
  )
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  await user.type(titleInput, 'title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'url')
  const submitButton = screen.getByText('create')
  // when
  await waitFor(() => user.click(submitButton))
  // then
  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0]).toBe('title')
  expect(mockAddBlog.mock.calls[0][1]).toBe('author')
  expect(mockAddBlog.mock.calls[0][2]).toBe('url')
})
