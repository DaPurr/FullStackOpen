const mongoose = require('mongoose')
const blogSchema = require('../schemas/blog')

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
