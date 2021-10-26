const { ValidationError } = require('sito')
const { InvalidArgumentsError, ApiError, InternalServerError } = require('../errors')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof ValidationError) {
      err = new InvalidArgumentsError(err.message)
    }

    if (!(err instanceof ApiError)) {
      console.error(err)
      err = new InternalServerError()
    }

    ctx.status = err.status
    ctx.body = err.message
  }
}
