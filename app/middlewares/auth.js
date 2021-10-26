const withoutBearerPrefix = require('../common/withoutBearerPrefix')
const handleSession = require('../bll/handleSession')

module.exports = async (ctx, next) => {
  const authorizationHeader = ctx.request.get('Authorization')

  if (!authorizationHeader) return next()

  const token = withoutBearerPrefix(authorizationHeader)

  if (!token) return next()

  ctx.user = await handleSession(token)

  return next()
}
