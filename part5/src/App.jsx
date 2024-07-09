import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Greeter from './components/Greeter'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState(null)
  const [blogAuthor, setBlogAuthor] = useState(null)
  const [blogUrl, setBlogUrl] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  const onUsernameChange = event => {
    setUsername(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  const onBlogTitleChange = event => {
    setBlogTitle(event.target.value)
  }

  const onBlogAuthorChange = event => {
    setBlogAuthor(event.target.value)
  }

  const onBlogUrlChange = event => {
    setBlogUrl(event.target.value)
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

  const handleSubmitBlog = async event => {
    event.preventDefault()

    try {
      const addedBlog = await blogService.addBlog(
        blogTitle,
        blogAuthor,
        blogUrl
      )
      setBlogs(blogs.concat(addedBlog))
      pushNotification(
        `A new blog ${blogTitle} by ${blogAuthor} added`,
        'success'
      )
    } catch (error) {
      pushNotification(error, 'error')
    }
  }

  const pushNotification = (message, style) => {
    setNotificationMessage(message)
    setNotificationStyle(style)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationStyle(null)
    }, 3000)
  }

  useEffect(() => {
    setUser(window.localStorage.getItem('name'))

    blogService.getAll().then(blogs => setBlogs(blogs))
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
        <BlogForm
          onTitleChange={onBlogTitleChange}
          onAuthorChange={onBlogAuthorChange}
          onUrlChange={onBlogUrlChange}
          handleSubmit={handleSubmitBlog}
        />
        <Blogs blogs={blogs} user={user} handleLogout={handleLogout} />
      </div>
    )
  }
}

export default App
