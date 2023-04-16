const sharp = require('sharp')
const { CLOUDINARY } = require('../config')

const cloudinaryUpload = (req, res, next) => {
  if (req.file) {
    sharp(req.file.buffer)
      .resize({ width: 1024 })
      .jpeg({ quality: 60 })
      .toBuffer((err, buffer) => {
        if (err) return next(err)
        CLOUDINARY.uploader
          .upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
              return next(error)
            } else {
              req.imageUrl = result.url
              return next()
            }
          })
          .end(buffer)
      })
  } else return next()
}

module.exports = cloudinaryUpload
