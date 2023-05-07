const { NotFoundError } = require("../utils/ErrorMessages");

const findCollection = (model) => {
  const validator = async (req, res, next) => {
    const id = req.params.id;
    const collection = await model.findById(id);

    if (!collection) {
      next(new NotFoundError(`id: ${id} is not found.`));
    }
    next();
  };
  return validator;
};

module.exports = findCollection;
