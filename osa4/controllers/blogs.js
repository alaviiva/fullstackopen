const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const newblog = await blog.save()
  response.status(201).json(newblog)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  const newblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(newblog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const res = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
