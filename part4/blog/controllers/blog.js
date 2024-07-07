const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate({ path: 'user', select: '-blogs' })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (!request.token)
    return response.status(401).json({ error: 'authorization required' })
  const decodedToken = jwt.verify(request.token, SECRET)
  if (!decodedToken.userId) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const userToLinkToBlog = await User.findById(decodedToken.userId)
  if (!userToLinkToBlog)
    return response.status(401).json({ error: 'authorization required' })

  const receivedBlog = request.body.likes
    ? { user: userToLinkToBlog.id, ...request.body }
    : { user: userToLinkToBlog.id, likes: 0, ...request.body }
  if (!receivedBlog.title || !receivedBlog.url) {
    return response.status(400).end()
  }

  const blogToPost = new Blog(receivedBlog)

  const savedBlog = await blogToPost.save()

  userToLinkToBlog.blogs = userToLinkToBlog.blogs.concat(savedBlog.id)
  userToLinkToBlog.save()

  return response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  await Blog.findByIdAndDelete(blogId)
  response.status(204).send()
})

blogRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const updatedBlog = request.body
  await Blog.findByIdAndUpdate(blogId, updatedBlog)
  response.status(204).send()
})

module.exports = blogRouter
