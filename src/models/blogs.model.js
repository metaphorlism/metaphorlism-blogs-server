const mongoose = require("mongoose");
// in order to populate("host")
const { hostSchema } = require("./hosts.model");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
  },
  image: {
    type: String,
    required: [true, "Blog image is required"],
  },
  description: {
    type: String,
  },
  blog_url: {
    type: String,
    required: [true, "Blog url is required"],
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hosts",
    required: true,
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
