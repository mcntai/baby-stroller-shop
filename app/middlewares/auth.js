const handleSession = require('../bll/user/handle-session')

const withoutBearerPrefix = authorizationHeader => {
  return authorizationHeader.split(' ')[1]
}

module.exports = async (ctx, next) => {
  const authorizationHeader = ctx.request.get('Authorization')

  if (!authorizationHeader) return next()

  const token = withoutBearerPrefix(authorizationHeader)

  if (!token) return next()

  ctx.user = await handleSession(token)

  return next()
}
