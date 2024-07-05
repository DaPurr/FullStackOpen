const { info } = require('./logger')

const requestLogger = (request, response, next) => {
  info('REQUEST')
  info('---------')
  info('Method:', request.method)
  info('Path:', request.path)
  info('Body:', request.body)
  info('---------')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
}