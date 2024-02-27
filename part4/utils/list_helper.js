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

const favoriteBlog = (blogs) => {
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
  if (blogs.length === 0) {
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

  return ({ author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  // group by author
  blogsByAuthor = lodash.groupBy(blogs, "author")

  // get number of likes for each author
  likesByAuthor = Object.entries(blogsByAuthor).map(authorBlogsList => {
    const numLikes = authorBlogsList[1].reduce(
      (totalLikes, blog) => totalLikes + blog.likes, 0)
    return { author: authorBlogsList[0], likes: numLikes }
  })

  // most liked author
  mostLikedAuthor = likesByAuthor.reduce(
    (mostLikesAuthor, author) => {
      return (
        mostLikesAuthor.likes < author.likes
          ? author
          : mostLikesAuthor
      )
    }
  )

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog: favoriteBlog,
  mostBlogs,
  mostBlogsLodash,
  mostLikes
}