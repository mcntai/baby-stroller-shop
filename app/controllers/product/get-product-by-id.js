const getProductById = require('../../bll/product/get-product-by-id')

module.exports = async ctx => {
  const product = await getProductById(ctx.params.id)

  ctx.body = { product }
}
