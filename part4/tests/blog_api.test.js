const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const testHelper = require("./test_helper")
const Blog = require("../models/blog")

const api = supertest(app)

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

after(async () => {
  await mongoose.connection.close()
})
