import axios from 'axios'

const login = async (username, password) => {
  let loginResponse
  try {
    loginResponse = await axios.post('/api/login', { username, password })
  } catch (error) {
    console.error('login error:', error)
  }
  return loginResponse.data
}

export default {
  login,
}
