import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

export const CREATE_BOOK = gql`
  mutation (
    $title: String
    $author: String
    $published: Int
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
    }
  }
`
