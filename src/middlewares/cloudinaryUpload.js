const { CLOUDINARY } = require("../configs");
const generateRandomId = require("../utils/GenerateRandomId");
const { BadRequestError } = require("../utils/ErrorMessages");

const cloudinaryUpload = async (req, res, next) => {
  if (req.file !== undefined) {
    // accept only markdown file
    if (req.file.mimetype === "text/markdown") {
      //generate uuid for public_id
      const publicId = generateRandomId(20);

      CLOUDINARY.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "blog_markdowns",
            public_id: `${publicId}.md`,
          },
          (error, result) => {
            if (error) {
              next(new BadRequestError("Something went wrong."));
            } else {
              req.body.blog_url = result.url;
              next();
            }
          }
        )
        .end(req.file.buffer);
    } else {
      next(new BadRequestError("File type is not allowed."));
    }
  } else {
    return next();
  }
};

module.exports = cloudinaryUpload;
