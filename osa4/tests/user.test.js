const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./helper')

describe('user test', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'kala', passwordHash })
    await user.save()
  })

  test('create new user', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'valas',
      name: 'Seppo',
      password: 'salakala',
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

  test('create invalid users', async () => {
    let response = await api
      .post('/api/users')
      .send({username: 'fisu'})
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toBe('invalid password')

    response = await api
      .post('/api/users')
      .send({username: 'fisu', password: '33'})
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toBe('invalid password')

    response = await api
      .post('/api/users')
      .send({password: 'asdf'})
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error)
      .toBe('User validation failed: username: Path `username` is required.')

    response = await api
      .post('/api/users')
      .send({username: 'aa', password: 'asdf'})
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error)
      .toBe('User validation failed: username: Path `username` (`aa`) is shorter than the minimum allowed length (3).')

    response = await api
      .post('/api/users')
      .send({username: 'kala', password: 'asdf'})
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error)
      .toBe('User validation failed: username: Error, expected `username` to be unique. Value: `kala`')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
