import { describe, test, expect, beforeEach } from '@playwright/test'
import {
  createBlog,
  createUser,
  getAllBlogs,
  likeBlog,
  loginWith,
} from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, 'tester', 'tester', 'test')

    await page.goto('http:localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    // given when then
    await expect(page.getByText('log in to application')).toBeVisible
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('login', async () => {
    test('given valid credentials, then login successfully', async ({
      page,
    }) => {
      // given when
      await loginWith(page, 'tester', 'test')
      // then
      await page.getByText('tester currently logged in')
    })

    test('given invalid credentials, then login failed', async ({ page }) => {
      // given when
      await loginWith(page, 'no', 'no')
      // then
      await page.getByText('wrong username or password')
    })
  })

  describe('when logged in', async () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'tester', 'test')
    })

    test('given logged in user, then new blog is created', async ({ page }) => {
      // given when
      await createBlog(page, 'test blog', 'test author', 'test url')
      // then
      await page.getByText('test blog').isVisible
      await page.getByText('view').isVisible
      await page.getByText('delete').isVisible
    })

    test('given a blog, then it can be liked', async ({ page }) => {
      // given
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByText('view').click()
      await page.getByTestId('blog-likes')
      await page.getByTestId('blog-like').click()
      await page.getByText('likes: 1')
    })

    test('given logged in user, be able to add and delete blog', async ({
      page,
    }) => {
      page.on('dialog', async dialog => {
        if (dialog.type() === 'confirm') {
          await dialog.accept()
        }
      })

      await createBlog(page, 'test title', 'test author', 'test url')
      await expect(
        page.getByText('test title', { exact: 'true' })
      ).toBeVisible()
      await page.getByText('delete').click()
      expect(page.locator('span')).toHaveCount(0)
    })

    test('given different than blog creator, do not see delete button', async ({
      page,
      request,
    }) => {
      await createUser(request, 'other', 'other', 'other')

      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByText('logout', { exact: 'true' }).click()
      await loginWith(page, 'other', 'other', 'other')

      expect(page.locator('delete')).toHaveCount(0)
    })

    test.only('given three blogs, they are sorted in decreasing number of likes', async ({
      page,
    }) => {
      // show form
      await page.click('button:has-text("new blog")')
      // first blog
      const blog1 = await createBlog(
        page,
        'Blog one',
        'Author one',
        'http://example.com/blog1'
      )
      // second blog
      const blog2 = await createBlog(
        page,
        'Blog two',
        'Author two',
        'http://example.com/blog2'
      )
      // third blog
      const blog3 = await createBlog(
        page,
        'Blog three',
        'Author three',
        'http://example.com/blog3'
      )
      // like
      await blog1.getByRole('button', { name: 'view' }).click()
      await blog2.getByRole('button', { name: 'view' }).click()
      await blog3.getByRole('button', { name: 'view' }).click()

      await blog3.getByRole('button', { name: 'like' }).click()
      await blog3.getByRole('button', { name: 'like' }).click()
      await blog2.getByRole('button', { name: 'like' }).click()

      await blog3
        .locator('div:has-text("Likes: 2")[data-testid="blog-likes"]')
        .waitFor()
      await blog2
        .locator('div:has-text("Likes: 1")[data-testid="blog-likes"]')
        .waitFor()
      // verify
      const divElementsLocator = page.locator('div[data-testid="blog"]')
      const divElements = await divElementsLocator.all()
      expect(divElements[0]).toContainText('Blog three')
      expect(divElements[1]).toContainText('Blog two')
      expect(divElements[2]).toContainText('Blog one')
    })
  })
})
