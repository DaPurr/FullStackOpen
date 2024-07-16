import { useState } from 'react'
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'

import useField from './hooks/useField'

const anecdotesDB = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1,
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2,
  },
]

const anecdoteById = id =>
  anecdotesDB.find(a => {
    return a.id === id
  })

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = props => {
  const contentField = useField('content', 'text')
  const authorField = useField('author', 'text')
  const infoField = useField('info', 'text')

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    })
  }

  const handleReset = event => {
    event.preventDefault()

    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} reset="" />
        </div>
        <div>
          author
          <input {...authorField} reset="" />
        </div>
        <div>
          url for more info
          <input {...infoField} reset="" />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const AnecdoteDetails = () => {
  const match = useMatch('/:id')

  const id = Number.parseInt(match.params.id)
  console.log('id:', id)
  console.log('anecdotes DB:', anecdotesDB)
  const anecdoteToDisplay = match ? anecdoteById(id) : null
  console.log('anecdote URL:', anecdoteToDisplay.info)

  return (
    anecdoteToDisplay && (
      <div>
        <h2>{anecdoteToDisplay.content}</h2>
        <p>has {anecdoteToDisplay.votes} votes</p>
        <p>
          for more info, see{' '}
          <Link to={anecdoteToDisplay.info}>{anecdoteToDisplay.info}</Link>
        </p>
      </div>
    )
  )
}

const Notification = ({ text }) => {
  return text && <p>{text}</p>
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState(anecdotesDB)

  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const addNew = anecdote => {
    anecdote.id = Math.round(Math.random() * 10000)
    anecdotesDB.push(anecdote)
    setAnecdotes(anecdotesDB)
    navigate('/')

    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => setNotification(''), 5000)
  }

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification text={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/:id" element={<AnecdoteDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
