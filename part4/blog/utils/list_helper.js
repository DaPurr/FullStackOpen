const dummy = () => {
  return 1
}

const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((accum, x) => accum + x, 0)

const favoriteBlog = blogs => {
  if (blogs.length === 0) return undefined
  const initialBlog = blogs.find(blog => blog.likes !== undefined)
  if (initialBlog === undefined) return undefined
  return blogs.reduce(
    (mostPopularBlog, currentBlog) =>
      currentBlog.likes > mostPopularBlog.likes ? currentBlog : mostPopularBlog,
    initialBlog
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
