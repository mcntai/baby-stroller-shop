const { GenericValidationError } = require('sito')
const { InvalidArgumentsError, ApiError, InternalServerError } = require('../errors')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof GenericValidationError) {
      err = new InvalidArgumentsError(err.message)
    }

    if (!(err instanceof ApiError)) {
      err = new InternalServerError('[UNHANDLED ERROR] ' + err.stack)
    }

    console.error(`${err.name}: ${err.message}`)

    if (err instanceof InternalServerError) {
      err.message = InternalServerError.USER_MESSAGE
    }

    ctx.status = err.status
    ctx.body = err
  }
}
