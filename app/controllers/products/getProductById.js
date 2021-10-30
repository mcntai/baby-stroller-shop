const getProductById = require('../../bll/products/getProductById')

module.exports = async ctx => {
  const product = await getProductById(ctx.params.id)

  ctx.body = { product }
}
