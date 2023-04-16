const express = require("express");
const cors = require("cors");

// global error handler
const GlobalErrorHandler = require("./src/utils/GlobalErrorHandler");

// initialize app
const app = express();
app.use(cors());
// to accept req.body  (JSON)
app.use(express.json());
// to accept FormData as body
app.use(express.urlencoded({ extended: true }));

// routes
const BLOG_ROUTES = require("./src/routes/blogs.routes");

app.use("/api/v1/blogs", BLOG_ROUTES);

app.use(GlobalErrorHandler);

module.exports = app;
