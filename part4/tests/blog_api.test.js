const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const testHelper = require("./test_helper")
const Blog = require("../models/blog")

const api = supertest(app)

const testBlog = {
  author: "Test Author",
  title: "Test Title",
  url: "www.hello.com",
  likes: 13
}

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testHelper.blogs.map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)

})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

describe("api get tests", () => {
  test("correct number of blogs are returned", async () => {
    const result = await api.get("/api/blogs")
    assert.strictEqual(result.body.length, testHelper.blogs.length)
  })
})

test("_id gets renamed to id", async () => {
  const result = await api.get("/api/blogs")
  assert.strictEqual(Object.keys(result.body[0]).includes("id"), true)
  assert.strictEqual(Object.keys(result.body[0]).includes("_id"), false)
})

test("adding blog works", async () => {
  await api
    .post("/api/blogs")
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const result = await api.get("/api/blogs")
  assert.strictEqual(result.body.length, testHelper.blogs.length + 1)

  const titles = result.body.map(blog => blog.title)
  assert(titles.includes(testBlog.title))
})

test("blog likes default to 0 if missing from request", async () => {
  let blogWithNoLikes = { ...testBlog }
  delete blogWithNoLikes.likes

  await api
    .post("/api/blogs")
    .send(blogWithNoLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const result = await api.get("/api/blogs")

  const retBlogWithNoLikes = result.body.find(blog => blog.title === blogWithNoLikes.title)
  // console.log(retBlogWithNoLikes)
  assert.strictEqual(retBlogWithNoLikes.likes, 0)
})

describe("Creation of new blogs", () => {
  test("title missing", async () => {
    let blogWithNoTitle = { ...testBlog }
    delete blogWithNoTitle.title

    await api
      .post("/api/blogs")
      .send(blogWithNoTitle)
      .expect(400)
  })

  test("url missing", async () => {
    let blogWithNoUrl = { ...testBlog }
    delete blogWithNoUrl.title

    await api
      .post("/api/blogs")
      .send(blogWithNoUrl)
      .expect(400)
  })

})

describe("Deletion of blogs", () => {
  test("Test Deletion", async () => {
    await api
      .delete(`/api/blogs/${testHelper.blogs[0]._id}`)
      .expect(204)

    const returnedBlogs = await api.get("/api/blogs")
    assert(returnedBlogs.body.length === testHelper.blogs.length - 1)
    const deletedBlogFound = returnedBlogs.body.find(blog => blog.id === testHelper.blogs[0]._id)
    assert(deletedBlogFound === undefined)
  })
})

describe("Modifying a blog", () => {
  test("Test modification", async () => {
    await api
      .put(`/api/blogs/${testHelper.blogs[0]._id}`)
      .send(testBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const returnedBlogs = await api.get("/api/blogs")
    const modifiedBlog = returnedBlogs.body.find(blog => blog.id === testHelper.blogs[0]._id)
    delete modifiedBlog.id
    delete modifiedBlog.__v
    assert.deepStrictEqual(modifiedBlog, testBlog)
  })
})
after(async () => {
  await mongoose.connection.close()
})
