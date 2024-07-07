const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.status(200).send(users)
})

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const receivedUser = { username, passwordHash, name }
  const userToAdd = new User(receivedUser)
  const addedUser = await userToAdd.save()
  response.status(201).json(addedUser)
})

userRouter.delete('/:id', async (request, response) => {
  const userId = request.params.id
  await User.findByIdAndDelete(userId)
  response.status(204).end()
})

module.exports = userRouter
