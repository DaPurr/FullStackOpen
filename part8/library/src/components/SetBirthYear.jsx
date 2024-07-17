import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { GET_AUTHORS, UPDATE_AUTHOR } from '../queries'

const SetBirthYear = ({ authors }) => {
  const [author, setAuthor] = useState(authors[0])
  const [birthYear, setBirthYear] = useState(1900)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [GET_AUTHORS],
  })

  const submit = event => {
    event.preventDefault()

    updateAuthor({ variables: { name: author, setBornTo: birthYear } })
  }

  const onSelectAuthor = event => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const onChangeBirthYear = event => {
    console.log(event.target.value)
    setBirthYear(event.target.value)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <select name="author" value={author} onChange={onSelectAuthor}>
          {authors.map(author => (
            <option key={author.name}>{author.name}</option>
          ))}
        </select>
        <div>
          <label>Born:</label>
          <input
            name="date-of-birth"
            value={birthYear}
            onChange={onChangeBirthYear}
            type="number"
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
