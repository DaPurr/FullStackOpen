const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../../utils/list_helper')

const listWithOneBlog = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
]

const listWithTwoBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: -12,
  },
]

const listMissingLikes = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 10,
  },
]

const listWithoutLikes = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  },
]

const listWithFourBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'anon',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: -12,
  },
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: -12,
  },
]

const listWithMissingAuthorBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: -12,
  },
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: -12,
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list is empty, equals 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has two blogs with negative numbers, equals sum of all likes', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    assert.strictEqual(result, -5)
  })

  test('when list has blogs missing likes, equals NaN', () => {
    const result = listHelper.totalLikes(listMissingLikes)
    assert.strictEqual(result, NaN)
  })
})

describe('favorite blog', () => {
  test('when there is no blog, return undefined', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), undefined)
  })

  test('when there is only one blog, return that one', () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithOneBlog),
      listWithOneBlog[0]
    )
  })

  test('when there are two blogs, return the most popular one', () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithTwoBlogs),
      listWithTwoBlogs[0]
    )
  })

  test('when there is a blog missing likes, return the most popular one', () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listMissingLikes),
      listMissingLikes[1]
    )
  })

  test('when there is a list missing likes, return undefined', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithoutLikes), undefined)
  })
})

describe('most blogs', () => {
  test('when there is only one blog, that author is returned', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('when there are multiple blogs, return the one with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithFourBlogs), {
      author: 'Michael Chan',
      blogs: 2,
    })
  })

  test('when there is a blog with missing author, then it is ignored', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithMissingAuthorBlogs), {
      author: 'Michael Chan',
      blogs: 2,
    })
  })
})
