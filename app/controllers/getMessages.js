const getMessages = require('../bll/getMessages')

module.exports = async ctx => {
  const messages = await getMessages(ctx.user.displayName)

  ctx.body = { messages }
}
