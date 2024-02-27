const lodash = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce(
    (total, blog) => total + blog.likes,
    0
  )
  return totalLikes
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const mostLikes = blogs.reduce(
    (mostLikedBlog, blog) => {
      return (
        mostLikedBlog.likes < blog.likes
          ? blog
          : mostLikedBlog
      )
    }
  )
  return mostLikes
}

// returns the author with the most blogs the "hard" way
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const mostBlogsList = blogs.reduce(
    (blogList, blog) => {
      const retBlog = blogList.find(b => b.author === blog.author)
      if (retBlog) {
        retBlog.blogs += 1
        return (blogList)
      }
      else {
        return (blogList.concat(({ author: blog.author, blogs: 1 })))
      }
    }, []
  )

  return mostBlogsList.reduce(
    (mostBlogs, blog) => {
      return (
        mostBlogs.blogs < blog.blogs
          ? blog
          : mostBlogs
      )
    }
  )
}

const mostBlogsLodash = (blogs) => {
  if(blogs.length === 0) {
    return undefined
  }
  authorBlogCount = lodash.countBy(blogs, "author")
  authorWithMostBlogs = Object.entries(authorBlogCount)
    .reduce((mostBlogs, author) => {
      return (
        mostBlogs[1] < author[1]
          ? author
          : mostBlogs
      )
    })

    return ({author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1]})

}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  mostBlogsLodash
}