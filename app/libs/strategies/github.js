const GithubStrategy = require('passport-github2').Strategy
const config = require('../../config')
const get = require('lodash/get')
const oauth = require('../../bll/api/user/oauth')

module.exports = new GithubStrategy({
    clientID    : config.providers.github.app_id,
    clientSecret: config.providers.github.app_secret,
    callbackURL : config.providers.github.callback_uri,
    scope       : ['user:email'],
    session     : false,
  }, async function (accessToken, refreshToken, profile, done) {
    let user
    let error

    try {
      user = await oauth('github', get(profile, 'emails[0].value'), profile.username)
    } catch (err) {
      error = err
    }
    done(error, user)
  },
)
