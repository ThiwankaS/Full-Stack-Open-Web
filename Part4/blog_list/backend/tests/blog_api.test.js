const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS',30000)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../model/blog')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]

    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObject = new Blog(blogs[0])
        await blogObject.save()
        blogObject = new Blog(blogs[1])
        await blogObject.save()
    })
    
    test('returns the correct amount of blog posts in the JSON format', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogs.length)
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
    })

    test('verifies that the unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body[0].id).toBeDefined()
    })

    test('successfully creates a new blog post', async () => {
      const newBlogList = {
          title: "Ultimate Guide on How to Delete Commit History in Github",
          author: "Mehmood Ghaffar",
          url: "https://medium.com/@mgm06bm/ultimate-guide-on-how-to-delete-commit-history-in-github-35cc11d74571",
          likes: 4,
      }
      await api
          .post('/api/blogs')
          .send(newBlogList)
          .expect(201)
          .expect('Content-Type',/application\/json/)
      const response = await api.get('/api/blogs')
      const titles = response.body.map(r => r.title)
      expect(response.body).toHaveLength(blogs.length + 1)
      expect(titles).toContain('Ultimate Guide on How to Delete Commit History in Github')
    })
    
    afterAll(async () => {
        await mongoose.connection.close()
    })

