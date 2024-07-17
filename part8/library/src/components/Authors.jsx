import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../queries'

const Authors = props => {
  const result = useQuery(GET_AUTHORS)
  if (result.loading) {
    return <h1>Loading authors</h1>
  }
  if (!result.data) {
    return <h1>Unable to fetch data</h1>
  }

  let authors = result.data.allAuthors

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
