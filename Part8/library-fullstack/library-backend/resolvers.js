const { GraphQLError } = require('graphql')
const Books = require('./models/book')
const Authors = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
          },
          allGenre : async (root,args) => {
            const allBooks = await Books.find({})
            const allGenreList = allBooks.reduce((result,item) => {
              item.genres.forEach(element => {
                  if(!result.includes(element)){
                    result.push(element)
                  }
              })
              return result
            },[])
            return allGenreList
          }
      },
    Mutation : {
        addBook : async (root,args,context) => {
          
          const handleBook = async (bookToHandle) => {
            const book = new Books(bookToHandle)
            try{
              const savedBook = await book.save()
              const newBook = await Books.findOne({ title : savedBook.title }).populate('author')
              return newBook
            } catch (error){
              throw new GraphQLError('Saving book failed',{
                extensions : {
                  code : 'BAD_USER_INPUT',
                  invalidArgs : args.title,
                  error
                }
              })
            }
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
              const author = new Authors({ name : args.author, bookCount : 1 })
              try{
                const savedAuthor = await author.save()
                const addedBook =  handleBook({ ...args, author : savedAuthor._id })
                pubsub.publish('BOOK_ADDED',{ bookAdded : addedBook })
                return addedBook
              }catch(error){
                throw new GraphQLError('Saving author faild',{
                  extensions : {
                    code : 'BAD_USER_INPUT',
                    invalidArgs : args.author,
                    error
                  }
                })
              }
            }
          existingAuthor.bookCount = existingAuthor.bookCount + 1
          await existingAuthor.save()
          const addedBook = handleBook({ ...args, author : existingAuthor._id })
          pubsub.publish('BOOK_ADDED',{ bookAdded : addedBook })
          return addedBook
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
      },
      Subscription : {
        bookAdded : {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED') 
        }
      }
  }

module.exports = resolvers