const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blog')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const ErrorHandler = require('./middleware/errorHandeler')

mongoose.set('strictQuery',false)

const mongoUrl = config.MONGO_URL

mongoose.connect(mongoUrl).then((result)=>{
    logger.info('Connection sucessful!')
  })

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use('/api/blogs',blogRouter)
app.use(ErrorHandler)

module.exports = app