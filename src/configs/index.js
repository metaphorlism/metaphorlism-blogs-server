const path = require("path");
const dotenv = require("dotenv");

require("dotenv").config({ path: ".env.local" });

const cloudinary = require("./cloudinary");

module.exports = {
  DATABASE_URL: process.env.DB_URL,
  PORT: process.env.PORT || 80,
  CLOUDINARY: cloudinary,
};
