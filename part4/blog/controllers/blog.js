const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const receivedBlog = request.body.likes
    ? { ...request.body }
    : { likes: 0, ...request.body }
  if (!receivedBlog.title || !receivedBlog.url) {
    return response.status(400).end()
  }
  const blogToPost = new Blog(receivedBlog)

  const savedBlog = await blogToPost.save()
  return response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  await Blog.findByIdAndDelete(blogId)
  response.status(204).send()
})

module.exports = blogRouter
