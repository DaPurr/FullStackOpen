import { useState, useEffect, useReducer } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Greeter from './components/Greeter'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import notificationReducer, {
  clearNotification,
  setNotification,
} from './reducers/notification'
import { Container } from '@mui/material'

const App = () => {
  const [notificationMessage, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [user, setUser] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  const onUsernameChange = event => {
    setUsername(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const { token, name } = await loginService.login(username, password)
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('jwt', token)
      pushNotification(`${name} logged in`, 'success')
      setUser(name)
    } catch (error) {
      pushNotification('wrong username or password', 'failure')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('jwt')
    setUser(null)
  }

  const deleteWithId = id => {
    blogService.deleteWithId(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const likeWithId = async id => {
    await blogService.likeWithId(id)
    await findAllBlogs()
  }

  const pushNotification = (message, style) => {
    notificationDispatch(setNotification(message))
    setNotificationStyle(style)
    setTimeout(() => {
      notificationDispatch(clearNotification())
      setNotificationStyle(null)
    }, 3000)
  }

  useEffect(() => {
    setUser(window.localStorage.getItem('name'))
  }, [])

  if (user === null) {
    return (
      <Container>
        <Notification message={notificationMessage} type={notificationStyle} />
        <LoginForm
          onUsernameChange={onUsernameChange}
          onPasswordChange={onPasswordChange}
          handleLogin={handleLogin}
        />
      </Container>
    )
  } else {
    return (
      <div>
        <Notification message={notificationMessage} type={notificationStyle} />
        <Greeter user={user} handleLogout={handleLogout} />
        <Togglable buttonText={'new blog'}>
          <BlogForm />
        </Togglable>
        <Blogs />
      </div>
    )
  }
}

export default App
