const uuid = require('uuid/v4')
const User = require('../../models/User')
const { AuthorizationError } = require('../../errors')

module.exports = async verificationToken => {
  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw new AuthorizationError('Confirmation link is either expired or invalid')
  }

  user.verificationToken = undefined
  await user.save()

  return { token: uuid() }
}
