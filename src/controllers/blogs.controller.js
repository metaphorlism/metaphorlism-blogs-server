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

  async getBlog(req, res) {
    const blog = await BlogServices.getBlog(req);

    res.status(200).json({
      status: "Success",
      blog,
    });
  }

  async postBlog(req, res) {
    const blog = await BlogServices.createBlog(req);

    res.status(201).json({
      status: "Success",
      message: "Uploaded Successfully !",
      blog,
    });
  }

  async editBlog(req, res) {
    const updatedBlog = await BlogServices.editBlog(req);

    res.status(200).json({
      status: "Success",
      message: "Updated Successfully",
      blog: updatedBlog,
    });
  }

  async deleteBlog(req, res) {
    await BlogServices.deleteBlog(req);

    res.status(200).json({
      status: "Success",
      message: "Deleted Successfully",
    });
  }
}

module.exports = new Blogs();
