const VkontakteStrategy = require('passport-vkontakte').Strategy
const config = require('../../config')
const oauth = require('../../bll/api/user/oauth')

module.exports = new VkontakteStrategy({
    clientID    : config.providers.vkontakte.app_id,
    clientSecret: config.providers.vkontakte.app_secret,
    callbackURL : config.providers.vkontakte.callback_uri,
    scope       : ['user:email'],
    session     : false,
  }, async function (accessToken, refreshToken, params, profile, done) {
    let user
    let error

    try {
      user = await oauth('vkontakte', params.email, profile.username)
    } catch (err) {
      error = err
    }
    done(error, user)
  },
)
