const mongoose = require("mongoose");
const { BadRequestError } = require("../utils/ErrorMessages");

const objectIdValidator = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    next(new BadRequestError(`${id} is not a valid id`));
  } else {
    next();
  }
};

module.exports = objectIdValidator;
