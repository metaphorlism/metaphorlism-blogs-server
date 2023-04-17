const sharp = require("sharp");
const { CLOUDINARY } = require("../configs");
const { v4: uuidv4 } = require("uuid");

const cloudinaryUpload = async (req, res, next) => {
  if (req.files) {
    const files = req.files;

    if (files.length !== 2) {
      return next(new Error("You can upload only two files at once!"));
    }

    try {
      const uploadPromises = req.files.map((file) => {
        //image
        if (file.mimetype.startsWith("image/")) {
          return new Promise((resolve, reject) => {
            sharp(file.buffer)
              .resize({ width: 1024 })
              .jpeg({ quality: 60 })
              .toBuffer((err, buffer) => {
                if (err) return reject(err);
                CLOUDINARY.uploader
                  .upload_stream(
                    { resource_type: "image", folder: "blog_images" },
                    (error, result) => {
                      if (error) {
                        return reject(error);
                      } else {
                        req.body.image = result.url;
                        resolve();
                      }
                    }
                  )
                  .end(buffer);
              });
          });

          // markdown
        } else if (file.mimetype === "text/markdown") {
          //generate uuid for public_id
          const uuid = uuidv4();

          return new Promise((resolve, reject) => {
            CLOUDINARY.uploader
              .upload_stream(
                {
                  resource_type: "auto",
                  folder: "blog_markdowns",
                  public_id: `${uuid}.md`,
                },
                (error, result) => {
                  if (error) {
                    return reject(error);
                  } else {
                    req.body.blog_url = result.url;
                    resolve();
                  }
                }
              )
              .end(file.buffer);
          });
        } else {
          return Promise.reject(new Error("File type is not allowed!"));
        }
      });

      await Promise.all(uploadPromises);
      return next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
};

module.exports = cloudinaryUpload;
