const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    blog ? response.json(blog) : response.status(404).end()
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body  
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
      })
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())     
  })     
  

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()   
  })

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
    }

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(savedBlog.toJSON())  
})


module.exports = blogsRouter
  