const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('get list of blogs', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(titles).toContain('kalaa kasoittain kalaa')
  expect(response.body[0].id).toBeDefined()
})

test('add new blog', async () => {
  const newblog = {
    title: 'Olet kala',
    author: 'fisu',
    url: 'whatever',
    likes: 2
  }
  const response = await api.post('/api/blogs')
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const bloglist = await helper.blogsInDb()
  expect(bloglist).toHaveLength(helper.initialBlogs.length + 1)
  const titles = bloglist.map(b => b.title)
  expect(titles).toContain('Olet kala')
})

test('add new blog with undefined likes', async () => {
  const newblog = {
    title: 'Olet kala',
    author: 'fisu',
    url: 'whatever'
  }
  const response = await api.post('/api/blogs')
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const bloglist = await helper.blogsInDb()
  expect(bloglist).toHaveLength(helper.initialBlogs.length + 1)
  const b = bloglist.find(b => b.title === 'Olet kala')
  expect(b.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})
