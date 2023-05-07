const JSONAPISerializer = require("jsonapi-serializer").Serializer;

class Serializer {
  blog(blogs, links) {
    return new JSONAPISerializer("blogs", {
      id: "_id",
      attributes: [
        "title",
        "image",
        "description",
        "blog_url",
        "category",
        "upload_date",
        "update_date",
      ],
      keyForAttribute: "underscore_case",
      topLevelLinks: {
        self: links?.self || "",
        previous: links?.previous || "",
        next: links?.next || "",
        last: links?.last || "",
      },
      typeForAttribute: () => {
        return "Blogs";
      },
      // host: {
      //   ref: "_id",
      //   included: true,
      //   attributes: ["hostname", "base_url"],
      // },
    }).serialize(blogs);
  }
}

module.exports = new Serializer();
