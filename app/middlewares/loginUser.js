const uuid = require('uuid/v4')
const Session = require('../models/Session')

module.exports = (ctx, next) => {
  ctx.loginUser = async function (user) {
    const token = uuid()

    await Session.create({ token, user, lastVisit: new Date() })

    return token
  }

  return next()
}
