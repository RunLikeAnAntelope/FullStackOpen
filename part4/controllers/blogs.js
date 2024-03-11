const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title && request.body.url) {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).json({
      error: "name is missing"
    })
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogsRouter.put("/:id", async (request, response) => {
  const blog = { ...request.body }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: "query" })
  response.json(result)
})
module.exports = blogsRouter
