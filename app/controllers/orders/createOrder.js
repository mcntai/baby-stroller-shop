const createOrder = require('../../bll/orders/createOrder')

module.exports = async ctx => {
  const { product, phone, address } = ctx.request.body

  ctx.body = {
    order: await createOrder(ctx.user, product, phone, address),
  }
}
