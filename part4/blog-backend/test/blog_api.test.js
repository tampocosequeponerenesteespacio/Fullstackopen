const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

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
    test('request to the /api/blogs url successfully creates a new blog post', async () => {
        const blog = {
            title: 'El blog de tampo',
            author: 'tampo',
            url: 'www.elblogdetampo.cl',
            likes: 42
            }
        await api
            .post('/api/blogs')
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
            .send(blog)
            .expect(400)

        const blog2 = {
            author: 'tampo',
            title: 'no URL blog',
            likes: 18
        }
        await api
            .post('/api/blogs')
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



afterAll(() => {
  mongoose.connection.close()
})