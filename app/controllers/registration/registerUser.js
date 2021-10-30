const registerUser = require('../../bll/registration/registerUser')

module.exports = async ctx => {
  const { email, displayName, password } = ctx.request.body

  await registerUser(email, displayName, password)

  ctx.body = { status: 'ok' }
}
