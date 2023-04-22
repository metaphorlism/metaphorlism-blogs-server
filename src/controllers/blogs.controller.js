const BlogsModel = require("../models/blogs.model");
const ApiFeatures = require("../utils/ApiFeatures");
const buildUrl = require("../utils/BuildUrl");
const Serializer = require("../utils/Serializer");

const mongoose = require("mongoose");
const { NotFoundError, BadRequestError } = require("../utils/ErrorMessages");

const BlogServices = require("../services/blogServices");

class Blogs {
  async getBlogs(req, res) {
    const blogs = await BlogServices.getBlogs(req);

    res.status(200).json({
      status: "Success",
      result: blogs.data.length,
      blogs,
    });
  }

  async postBlog(req, res) {
    const blog = await BlogsModel.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Uploaded Successfully !",
      blog,
    });
  }

  async editBlog(req, res) {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestError(`${id} is not a valid id`);
    }

    const updatedBlog = await BlogsModel.findByIdAndUpdate(
      id,
      { ...req.body, update_date: Date.now() },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      throw new NotFoundError(`Blog ${id} is not found`);
    }

    res.status(200).json({
      status: "Success",
      message: "Updated Successfully",
      blog: updatedBlog,
    });
  }
}

module.exports = new Blogs();
