const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

const blogs = helper.initialBlogs


describe('favorite blog', () => {
  test('favorite blog of empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })
  test('favorite blog of many', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('of bigger list calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(40)
  })
})