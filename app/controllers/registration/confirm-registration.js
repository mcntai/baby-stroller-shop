const confirmRegistration = require('../../bll/registration/confirm-registration')

module.exports = async ctx => {
  ctx.body = await confirmRegistration(ctx.request.body.verificationToken)
}
