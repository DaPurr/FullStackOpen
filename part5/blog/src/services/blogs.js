import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (title, author, url) => {
  const jwt = window.localStorage.getItem('jwt')

  try {
    const postResponse = await axios.post(
      baseUrl,
      { title, author, url },
      { headers: { Authorization: `Bearer ${jwt}` } }
    )
    return postResponse.data
  } catch (error) {
    console.error('create blog error:', error)
  }
}

const deleteWithId = async id => {
  return await axios.delete(`${baseUrl}/${id}`)
}

const likeWithId = async id => {
  return await axios.patch(`${baseUrl}/${id}/like`)
}

export default { getAll, addBlog, deleteWithId, likeWithId }
