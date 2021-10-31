const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../../config')
const get = require('lodash/get')
const oauth = require('../../bll/api/user/oauth')

module.exports = new FacebookStrategy({
    clientID     : config.providers.facebook.app_id,
    clientSecret : config.providers.facebook.app_secret,
    callbackURL  : config.providers.facebook.callback_uri,
    profileFields: ['displayName', 'email'],
    session      : false,
  }, async function (accessToken, refreshToken, profile, done) {
    let user
    let error

    try {
      user = await oauth('facebook', get(profile, 'emails[0].value'), profile.username)
    } catch (err) {
      error = err
    }
    done(error, user)
  },
)
