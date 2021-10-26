const getProductById = require('../../bll/products/getProductById')
const isProductIdValid = require('../../bll/products/isProductIdValid')

module.exports = async ctx => {
  const isValid = await isProductIdValid(ctx.params.id)

  if (!isValid) {
    ctx.throw(400, 'invalid product id')
  }

  const product = await getProductById(ctx.params.id)

  if (!product) {
    ctx.throw(404, `no product with ${ctx.params.id} id`)
  }

  ctx.body = { product }
}
