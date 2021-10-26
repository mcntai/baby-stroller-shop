const { MustBeAuthenticatedError } = require('../../errors')

module.exports = (ctx, next) => {
  if (!ctx.user) {
    throw new MustBeAuthenticatedError()
  }

  return next()
}
