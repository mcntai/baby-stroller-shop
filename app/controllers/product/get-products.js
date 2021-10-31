const getProducts = require('../../bll/api/product/get-products')

module.exports = async ctx => {
  const products = await getProducts(ctx.query)

  ctx.body = { products }
}
