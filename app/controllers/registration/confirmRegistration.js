const confirmRegistration = require('../../bll/registration/confirmRegistration')

module.exports = async ctx => {
  ctx.body = await confirmRegistration(ctx.request.body.verificationToken)
}
