const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((prev, cur) => {
    return prev + cur.likes
  }, 0)
  return total
}

module.exports = {
  dummy,
  totalLikes
}
