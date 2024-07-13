import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const cors = (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*') // Allow any origin
  response.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
}

const validator = (request, response, next) => {
  console.log()

  const { content } = request.body

  if (request.method === 'POST' && (!content || content.length < 5)) {
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more',
    })
  } else {
    next()
  }
}

server.use(cors)
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
