const Session = require('../models/Session')
const { AuthorizationError } = require('../errors')

module.exports = async token => {
  const session = await Session.findOne({ token }).populate('user')

  if (!session) {
    throw new AuthorizationError('Wrong authentication token')
  }

  session.lastVisit = new Date()
  await session.save()

  return session.user
}
