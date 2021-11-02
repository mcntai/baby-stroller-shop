const { InvalidArgumentsError, AuthorizationError, NotFoundError } = require('../errors')

module.exports.argumentsAssert = (condition, message) => {
  if (!condition) {
    throw new InvalidArgumentsError(message)
  }
}

module.exports.authorizationAssert = (condition, message) => {
  if (!condition) {
    throw new AuthorizationError(message)
  }
}

module.exports.notFoundAssert = (condition, message) => {
  if (!condition) {
    throw new NotFoundError(message)
  }
}

