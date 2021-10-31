const { NotFoundError } = require('../errors')

module.exports = (condition, message) => {
  if (!condition) {
    throw new NotFoundError(message)
  }
}
