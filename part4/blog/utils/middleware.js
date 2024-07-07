const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('REQUEST')
  logger.info('---------')
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---------')
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.info('entered middleware error handler')
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send('malformatted id')
  } else if (error.name_ === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongeServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name_ === 'JsonWebTokenError') {
    logger.info('executed within middleware')
    return response.status(401).json({ error: 'token invalid' })
  }
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token =
    authorization && authorization.startsWith('Bearer ')
      ? authorization.replace('Bearer ', '')
      : null
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  unknownEndpoint,
}
