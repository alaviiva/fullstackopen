const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const token = jwt.verify(request.token, process.env.SECRET)
  console.log(token)
  if (!token || !token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog(request.body)
  const user = await User.findById(token.id)
  blog.user = user._id

  const newblog = await blog.save()
  await User.findByIdAndUpdate(user._id, {blogs: user.blogs.concat(newblog._id)})

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
