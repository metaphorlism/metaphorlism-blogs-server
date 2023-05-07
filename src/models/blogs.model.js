const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blog_url: {
    type: String,
    required: [true, "Blog url is required"],
  },
  category: {
    type: String,
    required: true,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
  },
});

const blogs = mongoose.model("blogs", blogSchema);

module.exports = blogs;
