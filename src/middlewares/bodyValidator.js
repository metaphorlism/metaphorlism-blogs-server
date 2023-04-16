const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../utils/ErrorMessages");

const bodyValidator = (schema) => {
  const Validator = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequestError(error.details[0].message));
    }
    next();
  };
  return Validator;
};
module.exports = bodyValidator;
