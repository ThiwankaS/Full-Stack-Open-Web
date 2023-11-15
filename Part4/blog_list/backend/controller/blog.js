const blogRouter = require('express').Router()
const Blog = require('../model/blog.js')

 
blogRouter.get('/', async ( request,response,next ) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', ( request,response,next ) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
})

  module.exports = blogRouter