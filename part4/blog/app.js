const express = require('express')
const app = express()
const cors = require('cors')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const testingRouter = require('./controllers/testing')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const { MONGODB_URL, TEST_MONGODB_URL, NODE_ENV } = require('./utils/config')

mongoose.set('strictQuery', false)
info('Connecting to MongoDB')
mongoose
  .connect(NODE_ENV === 'test' ? TEST_MONGODB_URL : MONGODB_URL)
  .then(() => info('Connected to MongoDB'))
  .catch(_error => error('Error connecting to MongoDB:', _error.message))

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
