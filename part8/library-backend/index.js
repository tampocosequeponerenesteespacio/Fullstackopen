const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://tampoco2:tampoco2@cluster0.wj2s6.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`


const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) return (
        books.filter(  b => b.author === args.author && b.genres.includes(args.genre)  )
      )
      if (args.author) return books.filter( b => b.author === args.author )
      if (args.genre) return books.filter( b => b.genres.includes(args.genre) )
      return await Book.find({})
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: (root) => books.filter( b => b.author === root.name ).length
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find( b => b.author === args.author ) === undefined ) {
        const author = {name: args.author, id: uuid()}
        authors = authors.concat(author)
        
      }
      const book =  new Book({...args})
      book.save()
    },
    editAuthor: (root, args) => {
      let author = authors.find( a => a.name === args.name)
      if ( author ) {
        author.born = args.setBornTo
        return author
      }
      return null

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})