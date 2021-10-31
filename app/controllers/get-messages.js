const getMessages = require('../bll/message/get-messages')

module.exports = async ctx => {
  ctx.body = await getMessages(ctx.user.displayName)
}
