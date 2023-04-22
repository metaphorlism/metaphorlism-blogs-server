const Joi = require("joi");

const blogSchema = Joi.object({
  image: Joi.string().required().messages({
    "any.required": "blog image is required",
  }),
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
