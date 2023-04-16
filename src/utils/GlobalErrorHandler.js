const GlobalErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    status: "Failed !",
    message: error.message,
  });
};

module.exports = GlobalErrorHandler;
