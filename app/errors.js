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
  constructor() {
    super()
    this.message = 'Internal server error'
    this.status = 500
  }
}

class AuthorizationError extends ApiError {
  constructor() {
    super()
    this.message = 'Wrong authentication token'
    this.status = 401
  }
}

class ConfirmRegistrationError extends ApiError {
  constructor() {
    super()
    this.message = 'Confirmation link is either old or invalid'
    this.status = 400
  }
}

class MustBeAuthenticatedError extends ApiError {
  constructor() {
    super()
    this.message = 'User is not logged in'
    this.status = 401
  }
}

class MongooseValidationError extends ApiError {
  constructor(errors) {
    super()
    this.errors = {}
    this.status = 400

    for (const field of Object.keys(errors)) {
      this.errors[field] = errors[field].message
    }
  }
}

module.exports = {
  ApiError,
  InvalidArgumentsError,
  InternalServerError,
  AuthorizationError,
  ConfirmRegistrationError,
  MustBeAuthenticatedError,
  MongooseValidationError,
}
