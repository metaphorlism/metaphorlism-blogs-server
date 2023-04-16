const multer = require("multer");

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, file.originalname);
    } else {
      throw new Error("Only JPEG and PNG are allowed");
    }
  },
});

const upload = multer({ storage: storage }).single("image");

const cvStorage = multer.memoryStorage({
  filename: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword"
    ) {
      cb(null, file.originalname);
    } else {
      throw new Error("Only PDF and DOC file are allowed");
    }
  },
});

const uploadCV = multer({ storage: cvStorage }).single("CV");

module.exports = {
  storage: storage,
  upload: upload,
  uploadCV: uploadCV,
};
