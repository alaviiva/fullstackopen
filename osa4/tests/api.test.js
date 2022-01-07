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
})

afterAll(() => {
  mongoose.connection.close()
})
