const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://tampoco2:tampoco2@cluster0.wj2s6.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
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
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => books.filter( b => b.author === root.name ).length
  },
  Mutation: {
    addBook: async (root, args) => {      
      let author = await Author.findOne({ name: args.author })
      console.log('author: ',author);
      
      if ( !author ) {
        author = new Author({name: args.author})
        await author.save()        
      }
      // FOR SOME REASON, author "remembers" the ID
      let book =  new Book({...args, author: author })
      console.log("book: ",book);
      await book.save()
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