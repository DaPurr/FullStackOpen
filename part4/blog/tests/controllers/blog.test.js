const { test, after, beforeEach, describe } = require('node:test')
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

beforeEach(async () => {
  await Blog.deleteMany()
})

after(() => mongoose.connection.close())

describe('blogs REST integration tests', () => {
  test('blogs are returned as JSON', async () => {
    // given
    await Blog.insertMany(initialBlogs)
    // when then
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

  test('given a GET request, returned entities should have id instead of _id field', async () => {
    // given
    await Blog.insertMany(initialBlogs)
    // when
    const response = await api.get('/api/blogs')
    // then
    response.body.forEach(blog => {
      assert.strictEqual(blog._id, undefined)
      assert.notStrictEqual(blog.id, undefined)
    })
  })

  test('given a valid POST request, store the blog in the database', async () => {
    // given
    const newBlog = {
      title: 'Harry Potter and the whatever it is',
      author: 'JK',
      url: 'www.hpfans.magic',
      likes: 9001,
    }
    // when
    const postResponse = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(newBlog)
    assert.strictEqual(postResponse.status, 201)
    // then
    const getResponse = await api.get('/api/blogs')
    assert.strictEqual(getResponse.status, 200)
    // eslint-disable-next-line no-unused-vars
    const blogsWithoutId = getResponse.body.map(({ id, ...rest }) => rest)
    assert.strictEqual(blogsWithoutId.length, 1)
    assert.deepStrictEqual(blogsWithoutId[0], newBlog)
  })

  test('given a POST without likes, default to 0', async () => {
    // given
    const newBlog = {
      title: 'Harry Potter and the whatever it is',
      author: 'JK',
      url: 'www.hpfans.magic',
    }
    // when
    const postResponse = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(newBlog)
    assert.strictEqual(postResponse.status, 201)
    // then
    const getResponse = await api.get('/api/blogs')
    assert.strictEqual(getResponse.status, 200)
    const blogs = getResponse.body
    assert.strictEqual(blogs[0].likes, 0)
  })

  test('given missing title or url, then return bad request', async () => {
    // given
    const newBlog1 = {
      title: 'Harry Potter and the whatever it is',
      author: 'JK',
    }
    const newBlog2 = {
      author: 'JK',
      url: 'www.hpfans.magic',
    }
    // when
    const postResponse1 = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(newBlog1)
    assert.strictEqual(postResponse1.status, 400)
    const postResponse2 = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(newBlog2)
    assert.strictEqual(postResponse2.status, 400)
  })
})
