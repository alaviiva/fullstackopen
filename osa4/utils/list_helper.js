const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((prev, cur) => {
    return prev + cur.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  let favorite = 0
  blogs.forEach((b, i) => {
    if (b.likes > blogs[favorite].likes)
      favorite = i
  })
  return blogs[favorite]
}

const mostBlogs = (blogs) => {
  let authors = {}
  blogs.forEach((b) => {
    if (authors[b.author])
      authors[b.author]++
    else
      authors[b.author] = 1
  })
  let most = {
    author: '',
    blogs: 0
  }
  Object.entries(authors).forEach(([a, b]) => {
    if (most.blogs < b) {
      most.author = a
      most.blogs = b
    }
  })
  return most
}

const mostLikes = (blogs) => {
  let authors = {}
  blogs.forEach((b) => {
    if (authors[b.author])
      authors[b.author] += b.likes
    else
      authors[b.author] = b.likes
  })
  let most = {
    author: '',
    likes: 0
  }
  Object.entries(authors).forEach(([a, l]) => {
    if (most.likes < l) {
      most.author = a
      most.likes = l
    }
  })
  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
