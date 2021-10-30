const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/User')

module.exports = new LocalStrategy(
  { usernameField: 'email', session: false },
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email })

      if (!user) {
        return done(null, false, 'No such user')
      }

      const isValidPassword = await user.checkPassword(password)

      if (!isValidPassword) {
        return done(null, false, 'Invalid password')
      }

      if (user.verificationToken) {
        return done(null, false, 'Confirm your email')
      }

      return done(null, user)
    } catch (err) {
      done(err)
    }
  },
)
