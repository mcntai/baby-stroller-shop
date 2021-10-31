const { InvalidArgumentsError } = require('../errors')

module.exports = (condition, message) => {
  if (!condition) {
    throw new InvalidArgumentsError(message)
  }
}
