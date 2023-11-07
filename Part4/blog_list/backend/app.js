const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blog')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const mongoUrl = config.MONGO_URL

mongoose.connect(mongoUrl).then((result)=>{
    logger.info('Connection sucessful!')
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRouter)

module.exports = app