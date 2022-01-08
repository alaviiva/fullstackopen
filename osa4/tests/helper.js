const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'kala',
    author: 'fisu',
    url: 'jotainjotain',
    likes: 3,
    id: '61d59b20437932c12e794111'
  },
  {
    title: 'sintti',
    author: 'kissa',
    url: 'jotainjotain',
    likes: 4,
    id: '61d5a7e03d6406969d48eb26'
  },
  {
    title: 'kalaa kasoittain kalaa',
    author: 'valas',
    url: 'jotainjotain',
    likes: 1,
    id: '61d5a8f8c7793e52219aa4c6'
  },
  {
    title: 'kissakala',
    author: 'kissa',
    url: 'jotainjotain',
    likes: 1,
    id: '61d5a7e03d6406969d484638'
  },
  {
    title: 'vonkale',
    author: 'fisu',
    url: 'jotainjotain',
    likes: 5,
    id: '61d5a7e03d6406969d482a54'
  },
  {
    title: 'kalakissa',
    author: 'kissa',
    url: 'jotainjotain',
    likes: 2,
    id: '61d5a7e03d6406969d48601c'
  },
]

const nonExistingId = async () => {
  const b = new Blog({title: 'willremovethissoon', author: 'whatever'})
  await b.save()
  await b.remove()

  return b._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
