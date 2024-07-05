const dummy = () => {
  return 1
}

const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((accum, x) => accum + x, 0)

module.exports = {
  dummy,
  totalLikes,
}
