const User = require('../../models/User')
const { BulkValidationError } = require('../../errors')

module.exports = async function authenticate(strategy, email, displayName, done) {
  if (!email) {
    return done(null, false, 'Email not provided')
  }

  try {
    let user = await User.findOne({ email })

    if (user) {
      return done(null, user)
    }

    user = await User.create({
      email, displayName,
    })

    return done(null, user)
  } catch (err) {
    err = new BulkValidationError(err)

    return done(err)
  }
}

