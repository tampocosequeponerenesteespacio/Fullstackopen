const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

describe('blog HTTP GET', () => {
    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    },10000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
  })

describe('blog HTTP POST', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'username',
      name: 'username',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })


    test('request to the /api/blogs url successfully creates a new blog post', async () => {
        const blog = {
            title: 'El blog de tampo',
            author: 'tampo',
            url: 'www.elblogdetampo.cl',
            likes: 42
            }
        await api
            .post('/api/blogs')
            .set(headers)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const titles = response.body.map ( (blog) => blog.title )

        expect(titles).toContain('El blog de tampo')
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('request without id defaults to 0', async () => {
        const blog = {
            title: 'Este blog tiene 0 likes',
            author: 'tampoco',
            url: 'www.blogde0likes.cl',               
            }
        await api
            .post('/api/blogs')
            .set(headers)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const savedBlog = response.body[response.body.length - 1]
        expect(savedBlog.likes).toBe(0)          
        
    })

    test('request requiere url and title', async () => {
        const blog = {
            author: 'tampo',
            url: 'www.oli.cl',
            likes: 18
        }
        await api
            .post('/api/blogs')
            .set(headers)
            .send(blog)
            .expect(400)

        const blog2 = {
            author: 'tampo',
            title: 'no URL blog',
            likes: 18
        }
        await api
            .post('/api/blogs')
            .set(headers)
            .send(blog2)
            .expect(400)
    })
})

describe('HTTP DELETE', () => {
    test('delete first note predefined list', async () => {
        await api
        .delete('/api/blogs/5a422a851b54a676234d17f7')
        .expect(204)

        response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
    })
})

describe('HTTP PUT', () => {
    test('update blog information', async () => {

        blog = {            
            title: "React patterns and other stuff",
            author: "Michael Chan and tampo",
            url: "https://palindrome.cl/"                       
          }

        await api
        .put('/api/blogs/5a422a851b54a676234d17f7')
        .send(blog)
        .expect(200)

        const response = await api.get('/api/blogs')
        const url = response.body.map ( (blog) => blog.url )

        expect(url).toContain('https://palindrome.cl/')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
        
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('mypassword', 10)
      const user = new User({ username: 'myNameisUser', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'myNameisUser',
          name: 'myNameisUser',
          password: 'password',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
      test('username or password missing', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {          
          name: 'myNameisUser'          
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('missing')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('username or password must be > 3 chars', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {          
          name: 'myNameisUser',
          username: 'Pe',
          password: 'biokjjma333'         
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('3 characters long')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
    
  })



afterAll(() => {
  mongoose.connection.close()
})