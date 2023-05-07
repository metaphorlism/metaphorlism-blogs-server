const express = require("express");
const router = express.Router();
const Blogs = require("../controllers/blogs.controller");
const BlogsModel = require("../models/blogs.model");

// validator
const bodyValidator = require("../middlewares/bodyValidator");
const blogSchema = require("../validators/BlogSchema");
const findCollection = require("../middlewares/findCollection");
const objectIdValidator = require("../middlewares/ObjectIdValidator");

// upload files
const { uploadFiles } = require("../middlewares/multerStorage");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");
const cloudinaryDestroy = require("../middlewares/cloudinaryDestroy");

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
  .get(objectIdValidator, findCollection(BlogsModel), Blogs.getBlog)
  .put(
    objectIdValidator,
    findCollection(BlogsModel),
    uploadFiles,
    cloudinaryUpload,
    cloudinaryDestroy,
    bodyValidator(blogSchema),
    Blogs.editBlog
  )
  .delete(objectIdValidator, findCollection(BlogsModel), Blogs.deleteBlog);

module.exports = router;
