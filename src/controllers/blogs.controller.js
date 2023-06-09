const BlogsModel = require("../models/blogs.model");
const ApiFeatures = require("../utils/ApiFeatures");
const buildUrl = require("../utils/BuildUrl");
const Serializer = require("../utils/Serializer");

class Blogs {
  async getBlogs(req, res) {
    const blogs = new ApiFeatures(BlogsModel, req.query)
      .filter(["host", "category"])
      .sort()
      .limitFields()
      .paginate();

    let docs = await blogs.model.populate("host").exec();
    const blogCount = await BlogsModel.countDocuments();
    const queryOptions = await blogs.model.options;

    // get limit per page
    const limitPerPage = queryOptions.limit;

    // get current page
    const page = queryOptions.skip / limitPerPage + 1;

    // current url
    const currentUrl = new URL(
      req.protocol + "://" + req.get("host") + req.originalUrl
    );

    //next page
    const hasNextPage =
      limitPerPage * page < blogCount
        ? buildUrl(currentUrl, { "page[offset]": page + 1 })
        : null;

    //previous page
    const hasPreviousPage =
      queryOptions.skip / limitPerPage + 1 > 1
        ? buildUrl(currentUrl, { "page[offset]": page - 1 })
        : null;

    // last page
    const hasLastPage = buildUrl(currentUrl, {
      "page[offset]": blogCount / limitPerPage,
    });

    const links = {
      self: currentUrl,
      next: hasNextPage,
      previous: hasPreviousPage,
      last: hasLastPage,
    };

    docs = Serializer.blog(docs, links);

    res.status(200).json({
      status: "Success",
      result: docs.data.length,
      blogs: docs,
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
}

module.exports = new Blogs();
