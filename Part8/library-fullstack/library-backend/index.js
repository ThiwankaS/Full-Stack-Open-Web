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


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
        allBooks : (root,args) => {
            const isAuthorAlreadyExist = books.find(b => b.author === args.author)
            const isGenreAlreadyExist = books.find( b => b.genres.find( str => str === args.genre))
            if(!isAuthorAlreadyExist && !isGenreAlreadyExist){
                return books
            }
            if(isAuthorAlreadyExist && !isGenreAlreadyExist){
              const bookList = books.filter(book => book.author === args.author)
              return bookList
            }
            if(!isAuthorAlreadyExist && isGenreAlreadyExist){
              const bookList = books.filter( b => b.genres.find( str => str === args.genre))
              return bookList
            }
            const bookList = books.filter(book => book.author === args.author && book.genres.find( str => str === args.genre))
              return bookList
        },
        allAuthors : (root) => books.reduce((result,book)=>{
            const author = book.author
            const getBookCount = (str) => {
                return books.filter(p => p.author === str).length
            }
            const getBornYear = (str) => {
                return authors.filter(p => p.name === str)[0].born
            }
            const isAlreadyExist = result.find(p => p.name === author)
            if(!isAlreadyExist){
                result.push({ name : author, born : getBornYear(author),bookCount : getBookCount(author) })
            }
            return result
         },[])
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
      editAuthor : (root,args) => {
        const name = args.name
        const author = authors.find(p => p.name === name)
        if(!author){
          return null
        }
        const newAuthor = {...author, born : args.setBornTo }
        authors = authors.map(p => p.name === name ? newAuthor : p)
        return newAuthor
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