const { test, after, before, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const Blog = require('../../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 6,
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 6,
  },
  {
    title: 'title3',
    author: 'author3',
    url: 'url3',
    likes: 6,
  },
]

before(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(initialBlogs)
})

after(() => mongoose.connection.close())

describe('blogs REST integration tests', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const contents = response.body
    // eslint-disable-next-line no-unused-vars
    const blogsWithoutIds = contents.map(({ id, ...rest }) => rest)
    assert.deepStrictEqual(blogsWithoutIds, initialBlogs)
  })
})
