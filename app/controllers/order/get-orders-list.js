const getOrdersList = require('../../bll/order/get-orders-list')

module.exports = async ctx => {
  ctx.body = await getOrdersList(ctx.user)
}
