const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/books')
const Author = require('./models/authors')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error('error connecting to MongoDB:', error))

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

const typeDefs = `
  type Author {
    id: ID
    name: String!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Query {
    authorCount: Int
    allAuthors: [Author]
    findAuthor: Author
    bookCount: Int
    allBooks(author: String, genre: String): [Book]
    findBook: Book
  }
  type Mutation {
    addBook(
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book
    editAuthor(
      name: String
      setBornTo: Int
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) query.author = author._id
      }
      if (args.genre) query.genres = args.genre
      return Book.find(query).populate('author')
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      let books = await Book.find({}).populate('author')

      const authorsWithBookCount = Author.aggregate([
        {
          $lookup: {
            from: 'books',
            localField: '_id',
            foreignField: 'author',
            as: 'books',
          },
        },
        {
          $project: {
            name: 1,
            bookCount: { $size: '$books' },
          },
        },
      ])
      console.log('authors with book count:', authorsWithBookCount)
      return authorsWithBookCount
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ id: uuid(), name: args.author })
        author = await author.save()
      }
      const book = new Book({
        id: uuid(),
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      })
      const savedBook = await book.save()
      return savedBook.populate('author')
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate({
        name: args.name,
        born: args.setBornTo,
        new: true,
      })
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
