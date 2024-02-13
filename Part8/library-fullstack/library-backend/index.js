const { ApolloServer } = require('@apollo/server') 
const { startStandaloneServer } = require('@apollo/server/standalone')
require('dotenv').config()
const mongoose = require('mongoose')
const Books = require('./models/book')
const Authors = require('./models/author')

mongoose.set('strictQuery',false)
const MONGODB_URI = process.env.MONGODB_URI
console.log(`connecting to DB...`)
mongoose.connect(MONGODB_URI).then(() => {
  console.log(`------------------------ \n sucessfully connected...\n ------------------------`)
}).catch((error) =>{
  console.log(`------------------------ \n error connecting to DB\n ${error.message} \n ------------------------`)
})

const typeDefs = `
  type Author {
    name : String!,
    born : Int,
    bookCount : Int
    id : ID!
  }
  type Book {
        title: String!,
        published: Int!,
        author: Author!,
        id: ID!,
        genres: [String!]!
  }
  type Query {
    bookCount : Int!,
    authorCount : Int!,
    allBooks(author : String, genre : String) : [Book!],
    allAuthors : [Author!]
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
   ): Author
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
        }
    },
  Mutation : {
      addBook : async (root,args) => {
        
        const handleBook = async (bookToHandle) => {
          const book = new Books(bookToHandle)
          const savedBook = await book.save()
          const newBook = await Books.findOne({ title : savedBook.title }).populate('author')
          return newBook
        }

        const existingAuthor = await Authors.findOne({ name : args.author })

          if(!existingAuthor){
            const author = new Authors({ name : args.author })
            const savedAuthor = await author.save()
            return handleBook({ ...args, author : savedAuthor._id })
          }
        return handleBook({ ...args, author : existingAuthor._id })
      },
      addAuthor : async (root,args) => {
        const author = new Authors({ ...args })
        return author.save()
      },
      editAuthor : async (root,args) => {
        const name = args.name
        const author = await Authors.findOne({ name : name })
        if(!author){
          return null
        }
        author.born = args.setBornTo
        await author.save()
        const updatedAuthor = await Authors.findOne({ name : name })
        return updatedAuthor
      }
    }
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