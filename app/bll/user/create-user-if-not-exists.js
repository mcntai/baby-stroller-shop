const User = require('../../models/User')

module.exports = async (strategy, email, displayName) => {
  const user = await User.findOne({ email })

  if (user) {
    return user
  }

  return User.create({ email, displayName })
}
