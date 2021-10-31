module.exports = {
  mongodb  : {
    uri: (process.env.NODE_ENV === 'test')
      ? 'mongodb://localhost/test-baby-stroller-shop'
      : 'mongodb://localhost/baby-stroller-shop',
  },
  crypto   : {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length    : 128,
    digest    : 'sha512',
  },
  providers: {
    github   : {
      // app_id: process.env.GITHUB_APP_ID || 'github_app_id',
      // app_secret: process.env.GITHUB_APP_SECRET || 'github_app_secret',
      // callback_uri: 'http://localhost:3000/oauth/github',
      app_id      : '4ab0da0dae9a97374aa0',
      app_secret  : 'aeaec02794216aa8bc762b2677551d47037cbaf6',
      callback_uri: 'http://localhost:3000/api/oauth_callback/github',
      options     : {
        scope: ['user:email'],
      },
    },
    facebook : {
      app_id      : process.env.FACEBOOK_APP_ID || 'facebook_app_id',
      app_secret  : process.env.FACEBOOK_APP_SECRET || 'facebook_app_secret',
      callback_uri: 'http://localhost:3000/oauth/facebook',
      options     : {
        scope: ['email'],
      },
    },
    vkontakte: {
      app_id      : process.env.VKONTAKTE_APP_ID || 'vkontakte_app_id',
      app_secret  : process.env.VKONTAKTE_APP_SECRET || 'vkontakte_app_secret',
      callback_uri: 'http://localhost:3000/oauth/vkontakte',
      options     : {
        scope: ['email'],
      },
    },
  },
  mailer   : {
    user    : '',
    password: '',
  },
}
