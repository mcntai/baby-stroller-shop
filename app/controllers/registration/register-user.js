const registerUser = require('../../bll/api/user/register')

module.exports = async ctx => {
  const { email, displayName, password } = ctx.request.body

  await registerUser(email, displayName, password)

  ctx.body = { status: 'ok' }
}
