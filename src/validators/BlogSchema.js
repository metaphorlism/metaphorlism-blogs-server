const Joi = require("joi");

const blogSchema = Joi.object({
  blog_url: Joi.string().required().messages({
    "any.required": "blog url is required",
  }),
  category: Joi.string().required().messages({
    "any.required": "blog category is required",
  }),
  upload_date: Joi.date().empty(""),
  update_date: Joi.date().empty(""),
});

module.exports = blogSchema;
