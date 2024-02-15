const { ApolloServer } = require('@apollo/server') 
const { startStandaloneServer } = require('@apollo/server/standalone')
require('dotenv').config()
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const Books = require('./models/book')
const Authors = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery',false)
const MONGODB_URI = process.env.MONGODB_URI
console.log(`connecting to DB...`)
mongoose.connect(MONGODB_URI).then(() => {
  console.log(`------------------------\nsucessfully connected...\n------------------------`)
}).catch((error) =>{
  console.log(`------------------------ \n error connecting to DB\n ${error.message} \n ------------------------`)
})

const typeDefs = `
  type Author {
    name : String!,
    born : Int,
    bookCount : Int,
    id : ID!
  }
  type Book {
        title: String!,
        published: Int!,
        author: Author!,
        id: ID!,
        genres: [String!]!
  }
  type User {
    username : String!,
    favoriteGenre : String!,
    id : ID!
  }
  type Token {
    value : String!
  }
  type Query {
    bookCount : Int!,
    authorCount : Int!,
    allBooks(author : String, genre : String) : [Book!],
    allAuthors : [Author!],
    me : User!
  }
  type Mutation {
    addBook(
      title : String!,
      author : String!,
      published : Int!,
      genres : [String!]!
    ):Book,
    addAuthor(
      name : String!,
      born : Int
    ):Author,
    editAuthor(
      name : String!,
      setBornTo : Int!
   ): Author,
   createUser(
      username : String!,
      favoriteGenre : String!
   ) : User,
   login(
    username : String!,
    password : String!
   ) : Token
  }
`

const resolvers = {
  Query: {
        bookCount: async (root) => Books.collection.countDocuments(),
        authorCount : async (root) => Authors.collection.countDocuments(),
        allBooks : async (root,args) => {
            const author = args.author
            const genre = args.genre
            if(author && genre){
              const bookList = await Books.find({ genres : genre }).populate('author')
              return bookList.filter(p => p.author.name === author)
            }
            if(author && !genre){
              const existingAuthor = await Authors.findOne({ name : author })
              const bookList = await Books.find({ author : existingAuthor }).populate('author')
              return bookList
            }
            if(!author && genre){
              const bookList = await Books.find({ genres : genre }).populate('author')
              return bookList
            }
            const bookList = await Books.find({}).populate('author')
            return bookList
        },
        allAuthors : async (root) => {
          const authorList = await Authors.find({})
          return authorList
        },
        me : (root,args,context) => {
          return context.currentUser
        }
    },
  Mutation : {
      addBook : async (root,args,context) => {
        
        const handleBook = async (bookToHandle) => {
          const book = new Books(bookToHandle)
          try{
            const savedBook = await book.save()
          } catch (error){
            throw new GraphQLError('Saving book failed',{
              extensions : {
                code : 'BAD_USER_INPUT',
                invalidArgs : args.title,
                error
              }
            })
          }
          const newBook = await Books.findOne({ title : savedBook.title }).populate('author')
          return newBook
        }

      const existingAuthor = await Authors.findOne({ name : args.author })
      const currentUser = context.currentUser
        if(!currentUser){
          throw new GraphQLError('Authentication failed',{
            extensions : {
              code : 'BAD_USER_INPUT'
            }
          })
        }
          if(!existingAuthor){
            const author = new Authors({ name : args.author })
            try{
              const savedAuthor = await author.save()
            }catch(error){
              throw new GraphQLError('Saving author faild',{
                extensions : {
                  code : 'BAD_USER_INPUT',
                  invalidArgs : args.author,
                  error
                }
              })
            }
            return handleBook({ ...args, author : savedAuthor._id })
          }
        return handleBook({ ...args, author : existingAuthor._id })
      },
      addAuthor : async (root,args) => {
        const author = new Authors({ ...args })
        try{
          await author.save()
        }catch(error){
          throw new GraphQLError('Saving author faild',{
            extensions : {
              code : 'BAD_USER_INPUT',
              invalidArgs : args.author,
              error
            }
          })
        }
        return author
      },
      editAuthor : async (root,args,context) => {
        const name = args.name
        const author = await Authors.findOne({ name : name })
        const currentUser = context.currentUser
        if(!currentUser){
          throw new GraphQLError('Authentication failed',{
            extensions : {
              code : 'BAD_USER_INPUT'
            }
          })
        }
        if(!author){
          return null
        }
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author faild',{
            extensions : {
              code : 'BAD_USER_INPUT',
              invalidArgs : args.author,
              error
            }
          })
        }
        const updatedAuthor = await Authors.findOne({ name : name })
        return updatedAuthor
      },
      createUser : async (root,args) => {
        const newUser = new User({ ...args })
        try{
          await newUser.save()
        }catch(error){
          throw new GraphQLError('Creating user faild',{
            extensions : {
              code : 'BAD_USER_INPUT',
              invalidArgs : args.username,
              error
            }
          })
        }
        return newUser
      },
      login : async (root,args) => {
        const user = await User.findOne({ username : args.username })
          if(!user || args.password !== 'salainen'){
            throw new GraphQLError('Saving author faild',{
              extensions : {
                code : 'BAD_USER_INPUT'
              }
            })
          }
        const userForToken = {
          username : user.username,
          id : user._id
        }
        return { value : jwt.sign(userForToken,process.env.JWT_SECRET)}
      }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 }, context : async ({ req,res }) => {
    const auth = req ? req.headers.authorization : null
      if(auth && auth.startsWith('Bearer ')){
        const decodedToken = jwt.verify(auth.substring(7),process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})