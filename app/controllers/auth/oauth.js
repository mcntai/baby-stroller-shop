const passport = require('../../libs/passport')
const config = require('../../config')

module.exports = async (ctx, next) => {
  const provider = ctx.params.provider

  await passport.authenticate(
    provider,
    config.providers[provider].options,
  )(ctx, next)

  ctx.status = 200
  ctx.body = { status: 'ok', location: ctx.response.get('location') }
}
