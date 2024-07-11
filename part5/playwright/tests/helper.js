const createUser = async (request, name, username, password) => {
  await request.post('/api/users', {
    data: {
      name,
      username,
      password,
    },
  })
}

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByText('login').click()
}

const createBlog = async (page, title, author, url) => {
  await page.fill('input[name=title]', title)
  await page.fill('input[name=author]', author)
  await page.fill('input[name=url]', url)
  await page.click('button:has-text("create")')
  return await page.getByTestId('blog').filter({ hasText: title })
}

const likeBlog = async (page, title, likes) => {
  if (likes <= 0) return

  let blog1 = await page.locator(`text="${title}"`).locator('..').locator('..')
  await blog1.locator('button:has-text("view")').click()
  await blog1.locator('button:has-text("like")').click()

  if (likes > 1)
    for (const _ of Array(likes - 1)) {
      let blog1 = await page
        .locator(`text="${title}"`)
        .locator('..')
        .locator('..')
      await blog1.locator('button:has-text("like")').click()
    }
}

const getAllBlogs = async page => {
  const blogElements = await page.locator('div[data-testid="blog-likes"]').all()
  return Promise.all(
    blogElements.map(async blogElement => {
      const titleSpan = await blogElement.locator('span').nth(0)
      await blogElement.locator('button:has-text("view")').click()
      const likesText = await blogElement
        .locator('div[data-testid="blog-likes"]')
        .textContent()
      const likes = parseInt(likesText.split(': ')[1])
      return { title: titleSpan.textContent(), likes }
    })
  )
}

export { loginWith, createBlog, createUser, likeBlog, getAllBlogs }
