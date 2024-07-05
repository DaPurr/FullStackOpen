require('dotenv').config()

const PORT = process.env.PORT
const NODE_ENV = process.env.ENVIRONMENT
const MONGODB_URL = process.env.MONGODB_URL
const TEST_MONGODB_URL = process.env.TEST_MONGODB_URL

module.exports = {
  PORT,
  MONGODB_URL,
  TEST_MONGODB_URL,
  NODE_ENV,
}
