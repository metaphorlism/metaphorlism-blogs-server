// response status code
const status = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// not found error
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = status.NOT_FOUND;
  }
}

// bad request error
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = status.BAD_REQUEST;
  }
}

// unauthorized request error
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = status.UNAUTHORIZED;
  }
}

module.exports = { BadRequestError, NotFoundError, UnauthorizedError };
