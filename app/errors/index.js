class ApiError extends Error {
  constructor() {
    super()
  }
}

class InvalidArgumentsError extends ApiError {
  constructor(message) {
    super()
    this.message = message
    this.status = 400
  }
}

class InternalServerError extends ApiError {
  constructor(message) {
    super()
    this.message = message
    this.status = 500
  }

  static USER_MESSAGE = 'Something went wrong'
}

class AuthorizationError extends ApiError {
  constructor(message) {
    super()
    this.message = message
    this.status = 401
  }
}

class BulkValidationError extends ApiError {
  constructor(err) {
    super()
    this.errors = {}
    this.status = 400

    for (const field of Object.keys(err.errors)) {
      this.errors[field] = err.errors[field].message
    }
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super()
    this.message = message
    this.status = 404
  }
}

class LoginError extends ApiError {
  constructor(message) {
    super()
    this.message = message
    this.status = 400
  }
}

module.exports = {
  ApiError,
  InvalidArgumentsError,
  InternalServerError,
  AuthorizationError,
  BulkValidationError,
  NotFoundError,
  LoginError
}
