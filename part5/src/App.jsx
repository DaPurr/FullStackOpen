import { useState, useEffect } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Greeter from './components/Greeter'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
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
      console.error('log in error:', error)
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
    setNotificationMessage(message)
    setNotificationStyle(style)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationStyle(null)
    }, 3000)
  }

  const findAllBlogs = async () => {
    setBlogs(await blogService.getAll())
  }

  useEffect(() => {
    setUser(window.localStorage.getItem('name'))
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} type={notificationStyle} />
        <LoginForm
          onUsernameChange={onUsernameChange}
          onPasswordChange={onPasswordChange}
          handleLogin={handleLogin}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Notification message={notificationMessage} type={notificationStyle} />
        <Greeter user={user} handleLogout={handleLogout} />
        <Togglable buttonText={'new note'}>
          <BlogForm
            setBlogs={setBlogs}
            pushNotification={pushNotification}
            addBlog={blog => setBlogs(blogs.concat(blog))}
          />
        </Togglable>
        <Blogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          deleteWithId={deleteWithId}
          likeWithId={likeWithId}
        />
      </div>
    )
  }
}

export default App
