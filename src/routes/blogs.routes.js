const express = require("express");
const router = express.Router();
const Blogs = require("../controllers/blogs.controller");

// validator
const bodyValidator = require("../middlewares/bodyValidator");
const blogSchema = require("../validators/BlogSchema");

// upload files
const { uploadFiles } = require("../middlewares/multerStorage");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");

router
  .route("/")
  .get(Blogs.getBlogs)
  .post(
    uploadFiles,
    cloudinaryUpload,
    bodyValidator(blogSchema),
    Blogs.postBlog
  );

router
  .route("/:id")
  .put(uploadFiles, bodyValidator(blogSchema), Blogs.editBlog);

module.exports = router;
