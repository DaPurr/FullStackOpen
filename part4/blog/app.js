const express = require('express')
const app = express()
const cors = require('cors')
const { requestLogger, unknownEndpoint } = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const { MONGODB_URL } = require('./utils/config')

mongoose.set('strictQuery', false)
info('Connecting to MongoDB')
mongoose
  .connect(MONGODB_URL)
  .then(() => info('Connected to MongoDB'))
  .catch(_error => error('Error connecting to MongoDB:', _error.message))

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)

module.exports = app
