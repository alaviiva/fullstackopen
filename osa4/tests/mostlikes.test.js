const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
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

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 4
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    const expected = {
      author: 'fisu',
      likes: 8
    }
    expect(result).toEqual(expected)
  })

  test('when list is empty', () => {
    const result = listHelper.mostLikes([])
    const expected = {
      author: '',
      likes: 0
    }
    expect(result).toEqual(expected)
  })
})
