const getMessages = require('../bll/getMessages')

module.exports = async ctx => {
  ctx.body = await getMessages(ctx.user.displayName)
}
