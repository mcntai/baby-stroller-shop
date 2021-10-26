const createOrder = require('../../bll/orders/createOrder')

module.exports = async ctx => {
  const { product, phone, address } = ctx.request.body

  const orderId = await createOrder(ctx.user, product, phone, address)

  ctx.body = { order: orderId }
}
