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
  const blogToPost = new Blog(receivedBlog)

  const savedBlog = await blogToPost.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter
