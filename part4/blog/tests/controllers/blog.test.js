const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const Blog = require('../../models/blog')
const User = require('../../models/user')

const api = supertest(app)

const addUser = (username, password) => {
  const addUserPayload = {
    username,
    password,
    name: username,
  }
  return api
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send(addUserPayload)
}

const getTokenFor = async (username, password) => {
  const loginPayload = {
    username,
    password,
  }
  const loginUserResponse = await api
    .post('/api/login')
    .set('Content-Type', 'application/json')
    .send(loginPayload)
  return loginUserResponse.body.token
}

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
  await User.deleteMany()
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
    await addUser('tester', 'pass')
    const token = await getTokenFor('tester', 'pass')
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
    assert.strictEqual(postResponse.status, 201)
    // then
    const getResponse = await api.get('/api/blogs')
    assert.strictEqual(getResponse.status, 200)
    // eslint-disable-next-line no-unused-vars
    const blogsWithoutId = getResponse.body.map(({ id, ...rest }) => rest)
    assert.strictEqual(blogsWithoutId.length, 1)
    assert.deepStrictEqual(
      {
        title: blogsWithoutId[0].title,
        author: blogsWithoutId[0].author,
        url: blogsWithoutId[0].url,
        likes: blogsWithoutId[0].likes,
      },
      newBlog
    )
  })

  test('given a POST without likes, default to 0', async () => {
    // given
    await addUser('tester', 'pass')
    const token = await getTokenFor('tester', 'pass')
    const newBlog = {
      title: 'Harry Potter and the whatever it is',
      author: 'JK',
      url: 'www.hpfans.magic',
    }
    // when
    const postResponse = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
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
    await addUser('tester', 'password')
    const token = await getTokenFor('tester', 'password')
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog1)
    assert.strictEqual(postResponse1.status, 400)
    const postResponse2 = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog2)
    assert.strictEqual(postResponse2.status, 400)
  })

  test('given a DELETE request, then delete specified blog', async () => {
    // given
    const newBlog = {
      title: 'Harry Potter and the whatever it is',
      author: 'JK',
      url: 'www.hpfans.magic',
    }
    await new Blog(newBlog).save()
    const blogs = await Blog.find({})
    const blogId = blogs[0].id
    assert.notStrictEqual(blogId, undefined)
    // when
    await api.delete(`/api/blogs/${blogId}`)
    // then
    const actualBlogs = await Blog.find({})
    assert.strictEqual(actualBlogs.length, 0)
  })

  test('given an updated blog sent with a PUT request, then update the blog accordingly', async () => {
    // given
    const existingBlog = {
      title: 'Harry Potter and the whatever it is',
      author: 'JK',
      url: 'www.hpfans.magic',
    }
    const updatedBlog = {
      title: 'a better title',
      author: 'clearly better author',
      url: 'www.betterwebsite.com',
    }
    await new Blog(existingBlog).save()
    const blogs = await Blog.find({})
    const blogId = blogs[0].id
    assert.notStrictEqual(blogId, undefined)
    // when
    await api
      .put(`/api/blogs/${blogId}`)
      .set('Content-Type', 'application/json')
      .send(updatedBlog)
    // then
    await api.put(`/api/blogs/${blogId}`)
    const putResponse = await api.get('/api/blogs')
    const actualBlogs = putResponse.body
    // eslint-disable-next-line no-unused-vars
    const actualBlogsWithoutId = actualBlogs.map(({ id, ...rest }) => rest)
    const actualUpdatedBlog = actualBlogsWithoutId[0]
    assert.deepStrictEqual(actualUpdatedBlog, updatedBlog)
  })

  test('given invalid user to add, then return 400', async () => {
    // given
    const userToAdd = { username: 'A', name: 'tooShortUsername', password: 'B' }
    // when
    const postResponse = await api
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(userToAdd)
    // then
    assert.strictEqual(postResponse.status, 400)
    assert.strictEqual(
      postResponse.body.error,
      'username and password have to more than 3 characters long'
    )
  })
})

describe('jwt authentication', () => {
  test('given no authentication when creating a blog, then return status 401', async () => {
    // given
    const blogToPost = {
      title: 'title',
      author: 'me',
      url: 'http://yep.com',
      likes: 100,
    }
    // when
    const postResponse = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(blogToPost)
    // then
    assert.strictEqual(postResponse.status, 401)
  })
})
