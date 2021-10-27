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

      if (args.author && args.genre) {
        let res = await Book.find({ genres: { $in: [args.genre]}  }).populate('author')
        res = res.filter( b => b.author.name === args.author)      
        
         return res
       }
       
      if (args.author) {
        let res = await Book.find({}).populate('author') //DONT FORGET TO POPULATE!!        
        res = res.filter( b => b.author.name === args.author )        
        return res
      }  

      if (args.genre) return await Book.find({ genres: { $in: [args.genre]}  }).populate('author')

      return Book.find({}).populate('author')
      
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => await Book.find({ author: root.id }).countDocuments()
    
  },
  Mutation: {
    addBook: async (root, args) => {      
      let author = await Author.findOne({ name: args.author })
            
      if ( !author ) {
        author = await new Author({name: args.author}).save()
                
      }
      // FOR SOME REASON, author "remembers" the ID
      let book =  new Book({...args, author: author })
      await book.save()
      return book
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOneAndUpdate({ name: args.name}, { $set: { born: args.setBornTo }})
      return author

      // let author = authors.find( a => a.name === args.name)
      // if ( author ) {
      //   author.born = args.setBornTo
      //   return author
      // }
      // return null

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