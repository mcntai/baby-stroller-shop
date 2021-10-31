const { AuthorizationError } = require('../errors')

module.exports = (condition, message) => {
  if (!condition) {
    throw new AuthorizationError(message)
  }
}
