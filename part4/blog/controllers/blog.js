const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const users = await User.find({})
  const userToLinkToBlog = users[0]

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
