const { BulkValidationError } = require('../errors')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.name !== 'ValidationError') throw err

    ctx.body = {
      errors: new BulkValidationError(err.errors),
    }
  }
}
