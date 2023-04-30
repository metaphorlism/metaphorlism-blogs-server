const multer = require("multer");

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    if (
      file &&
      (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "text/plain")
    ) {
      cb(null, file.originalname);
    } else {
      throw new Error("Only JPEG and PNG are allowed");
    }
  },
});

const upload = multer({ storage: storage }).array("files", 2);

module.exports = {
  storage: storage,
  uploadFiles: upload,
};
