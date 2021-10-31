const { AuthorizationError } = require('../../errors')

module.exports = (ctx, next) => {
  if (!ctx.user) {
    throw new AuthorizationError('User is not logged in')
  }

  return next()
}
