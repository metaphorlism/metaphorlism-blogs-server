// const { CLOUDINARY } = require('../config')
// const { FetchDataById } = require('../helper/DataFetching')
// const UserModel = require('../models/users.model')

// const cloudinaryDestroy = async (req, res, next) => {
//   //   const data = await UserModel.findById(req.params.id)
//   const data = await FetchDataById(UserModel, req.params.id)

//   const public_id = data.image
//     .split('/')
//     [data.image.split('/').length - 1].split('.')[0]
//   console.log(public_id)

//   CLOUDINARY.uploader.destroy(public_id, (error, result) => {
//     if (error) throw new Error(error)
//     return next()
//   })
// }

// module.exports = cloudinaryDestroy
