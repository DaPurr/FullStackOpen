const mongoose = require('mongoose')
const Blog = require('../models/blog')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

userSchema.pre('findOneAndDelete', async function (next) {
  const user = await this.model.findOne(this.getQuery())
  if (user.blogs.length > 0) {
    await Blog.deleteMany({ _id: { $in: user.blogs } })
  }
  next()
})

module.exports = userSchema
