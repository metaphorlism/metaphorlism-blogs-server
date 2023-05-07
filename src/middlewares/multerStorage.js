const multer = require("multer");

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    if (file && file.mimetype === "text/plain") {
      cb(null, file.originalname);
    } else {
      throw new Error("Only JPEG and PNG are allowed");
    }
  },
});

const upload = multer({ storage: storage }).single("file");

module.exports = {
  storage: storage,
  uploadFiles: upload,
};
