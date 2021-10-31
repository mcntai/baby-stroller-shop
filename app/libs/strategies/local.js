const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/User')
const notFoundErrorAssert = require('../../asserts/not-found-assert')
const authorizationAssert = require('../../asserts/authorization-assert')

module.exports = new LocalStrategy(
  { usernameField: 'email', session: false },
  async function (email, password, done) {
    let user
    let error

    try {
      user = await User.findOne({ email })

      notFoundErrorAssert(user, 'No such user')

      const isValidPassword = await user.checkPassword(password)

      authorizationAssert(isValidPassword, 'Invalid password')

      authorizationAssert(!user.verificationToken, 'Confirm your email')
    } catch (err) {
      error = err
    }
    done(error, user)
  },
)
