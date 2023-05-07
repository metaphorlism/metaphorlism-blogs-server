const { CLOUDINARY } = require("../configs");
const BlogModel = require("../models/blogs.model");

const DestroyFile = async (id) => {
  const { blog_url } = await BlogModel.findById(id);
  const promises = [];

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

  await Promise.all(promises);
};

module.exports = DestroyFile;
