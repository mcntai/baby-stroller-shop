const getOrdersList = require('../../bll/orders/getOrdersList')

module.exports = async ctx => {
  ctx.body = await getOrdersList(ctx.user)
}
