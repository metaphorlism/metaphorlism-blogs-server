const express = require("express");
const router = express.Router();
const Blogs = require("../controllers/blogs.controller");

// validator
const bodyValidator = require("../middlewares/bodyValidator");
const blogSchema = require("../validators/BlogSchema");

router
  .route("/")
  .get(Blogs.getBlogs)
  .post(bodyValidator(blogSchema), Blogs.postBlog);

module.exports = router;
