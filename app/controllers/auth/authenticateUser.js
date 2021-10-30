const passport = require('../../libs/passport')
const Session = require('../../models/Session')
const uuid = require('uuid/v4')

const loginUser = async user => {
  const token = uuid()

  await Session.create({ token, user, lastVisit: new Date() })

  return token
}

module.exports = async (ctx, next) => {
  const provider = ctx.request.body.provider || null

  const strategy = provider ? provider : 'local'

  await passport.authenticate(strategy, async (err, user, info) => {
    if (err) throw err

    if (!user) {
      ctx.status = 400
      ctx.body = { error: info.message }

      return
    }

    const token = await loginUser(user)

    ctx.body = { token }
  })(ctx, next)
}
