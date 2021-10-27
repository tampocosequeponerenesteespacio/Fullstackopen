const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'A_SECRET_KEY'

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`


const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
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
    addBook: async (root, args, context) => {  
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
            
      if ( !author ) {
        author = await new Author({name: args.author}).save()
                
      }
      // FOR SOME REASON, author "remembers" the ID
      let book =  new Book({...args, author: author })
      await book.save()
      return book
    },
    editAuthor: async (root, args, context) => {
      let authorExist = await Author.findOne({name: args.name})
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if ( authorExist ) return null
      try {
        let author = await Author.findOneAndUpdate({ name: args.name}, { $set: { born: args.setBornTo }})
      } catch (error) { throw new UserInputError(error.message, {invalidArgs: args}) }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      console.log(user);
      try { await user.save() 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})