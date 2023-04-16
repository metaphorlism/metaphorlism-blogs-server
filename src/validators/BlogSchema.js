const Joi = require("joi");

const blogSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Blog title is required",
  }),
  image: Joi.string().required().messages({
    "any.required": "blog image is required",
  }),
  description: Joi.string().empty(""),
  blog_url: Joi.string().required().messages({
    "any.required": "blog url is required",
  }),
  host: Joi.string()
    .required()
    .messages({ "any.required": "blog host id is required" }),
  category: Joi.string().required().messages({
    "any.required": "blog category is required",
  }),
  upload_date: Joi.date().empty(""),
  update_date: Joi.date().empty(""),
});

module.exports = blogSchema;
