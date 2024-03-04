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

  const response = await api.get("/api/blogs")
  assert.strictEqual(response.body.length, testHelper.blogs.length + 1)

  const titles = response.body.map(blog => blog.title)
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

  //Todo: Finish this test 
})

after(async () => {
  await mongoose.connection.close()
})
