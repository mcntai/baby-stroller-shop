const uuid = require('uuid/v4')
const User = require('../../models/User')
const { ConfirmRegistrationError } = require('../../errors')

module.exports = async verificationToken => {
  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw new ConfirmRegistrationError()
  }

  user.verificationToken = undefined
  await user.save()

  const token = uuid()

  return { token }
}
