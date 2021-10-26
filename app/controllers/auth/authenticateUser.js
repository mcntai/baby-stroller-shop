const passport = require('../../libs/passport')

module.exports = async (ctx, next) => {
  const provider = ctx.request.body.provider || null

  const strategy = provider ? provider : 'local'

  await passport.authenticate(strategy, async (err, user, info) => {
    if (err) throw err

    if (!user) {
      ctx.status = 400
      ctx.body = { error: info }

      return
    }

    const token = await ctx.login(user)

    ctx.body = { token }
  })(ctx, next)
}
