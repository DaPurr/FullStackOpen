const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { info } = require('../utils/logger')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  info('user found in db', user)
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordCorrect) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = { username: user.username, userId: user.id }
  info('user to store in JWT:', userForToken)

  const token = jwt.sign(userForToken, SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
