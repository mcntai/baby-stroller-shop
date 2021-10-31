const uuid = require('uuid/v4')
const User = require('../../models/User')
const sendMail = require('../../libs/sendMail')

module.exports = async (email, displayName, password) => {
  const verificationToken = uuid()

  const user = new User({
    email,
    displayName,
    verificationToken,
  })

  await user.setPassword(password)
  await user.save()

  await sendMail({
    to      : user.email,
    subject : 'Confirm your email',
    locals  : { token: verificationToken },
    template: 'confirmation',
  })

  return user
}
