const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/User')
const { authorizationAssert, notFoundAssert } = require('../../errors/asserts')

module.exports = new LocalStrategy(
  { usernameField: 'email', session: false },
  async function (email, password, done) {
    let user
    let error

    try {
      user = await User.findOne({ email })

      notFoundAssert(user, 'No such user')

      const isValidPassword = await user.checkPassword(password)

      authorizationAssert(isValidPassword, 'Invalid password')

      authorizationAssert(!user.verificationToken, 'Confirm your email')
    } catch (err) {
      error = err
    }
    done(error, user)
  },
)
