class ApiFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
  }

  filter(searchFields) {
    const queryObject = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];

    excludedFields.forEach((el) => delete queryObject[el]);

    if (queryObject.schedule === "" || queryObject.schedule === "All") {
      delete queryObject.schedule;
    }
    if (queryObject.work_type === "" || queryObject.work_type === "All") {
      delete queryObject.work_type;
    }
    if (
      queryObject.job_category === "" ||
      queryObject.job_category === "View All"
    ) {
      delete queryObject.job_category;
    }

    // 1. Search Functionality
    if (this.queryString.search) {
      const searchRegex = new RegExp(this.queryString.search, "i");

      searchFields = searchFields.map((field) =>
        Object.assign({}, { [field]: searchRegex })
      );
      queryObject.$or = searchFields;
    }

    // 2. Advanced Filtering (Ranges)
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte |lt)\b/g,
      (match) => `$${match}`
    );

    this.model = this.model.find(queryObject);

    return this;
  }

  sort() {
    let sortQuery;
    switch (this.queryString.sort) {
      case "Deadline":
        sortQuery = { deadline: -1 };
        break;
      case "":
        sortQuery = { scoresCount: -1 };
        break;
      default:
        sortQuery = {};
    }

    this.model = this.model.sort(sortQuery);

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieldsBy = this.queryString.fields.split(",").join(" ");
      this.model = this.model.select(fieldsBy);
    } else {
      // -: exclude the specfic field
      this.model = this.model.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page?.offset * 1 || 1;
    const limit = this.queryString.page?.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.model = this.model.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
