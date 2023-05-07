const { CLOUDINARY } = require("../configs");
const BlogModel = require("../models/blogs.model");

const cloudinaryDestroy = async (req, res, next) => {
  const { blog_url } = await BlogModel.findById(req.params.id);
  const promises = [];

  if (req.file !== undefined) {
    if (blog_url !== req.body.blog_url) {
      const blog_id = blog_url
        .split("/")
        [blog_url.split("/").length - 1].split(".")[0];
      promises.push(
        new Promise((resolve, reject) => {
          CLOUDINARY.uploader.destroy(
            "blog_markdowns/" + blog_id + ".md",
            { resource_type: "raw" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
        })
      );
    }
  } else {
    req.body.blog_url = blog_url;
  }

  await Promise.all(promises);
  next();
};

module.exports = cloudinaryDestroy;
