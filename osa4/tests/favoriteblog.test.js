const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
      'title': 'kala',
      'author': 'fisu',
      'url': 'jotainjotain',
      'likes': 3,
      'id': '61d59b20437932c12e794111'
    },
    {
      'title': 'sintti',
      'author': 'kissa',
      'url': 'jotainjotain',
      'likes': 4,
      'id': '61d5a7e03d6406969d48eb26'
    },
    {
      'title': 'kalaa kasoittain kalaa',
      'author': 'valas',
      'url': 'jotainjotain',
      'likes': 1,
      'id': '61d5a8f8c7793e52219aa4c6'
    }
  ]

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const expected = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const expected = {
      'title': 'sintti',
      'author': 'kissa',
      'url': 'jotainjotain',
      'likes': 4,
      'id': '61d5a7e03d6406969d48eb26'
    }
    expect(result).toEqual(expected)
  })

  test('when list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeUndefined()
  })
})
