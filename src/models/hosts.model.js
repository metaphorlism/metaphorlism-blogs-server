const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
  hostname: {
    type: String,
    required: [true, "hostname is required"],
  },
  base_url: {
    type: String,
    required: [true, "host base url is required"],
  },
});

const hosts = mongoose.model("hosts", hostSchema);

module.exports = hosts;
