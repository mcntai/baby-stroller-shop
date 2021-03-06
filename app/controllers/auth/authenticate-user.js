const passport = require('../../libs/passport')
const Session = require('../../models/Session')
const uuid = require('uuid/v4')
const { LoginError } = require('../../errors')

const loginUser = async user => {
  const token = uuid()

  await Session.create({ token, user, lastVisit: new Date() })

  return token
}

module.exports = async (ctx, next) => {
  const strategy = ctx.params.provider || 'local'

  await passport.authenticate(strategy, async (err, user, info) => {
    if (err) throw err

    if (!user) {
      throw new LoginError({ error: info })
    }

    const token = await loginUser(user)

    ctx.body = { token }
  })(ctx, next)
}
