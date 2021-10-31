const createOrder = require('../../bll/api/order/create-order')

module.exports = async ctx => {
  const { product, phone, address } = ctx.request.body

  ctx.body = {
    order: await createOrder(ctx.user, product, phone, address),
  }
}
