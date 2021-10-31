const getProductsByQuery = require('../../bll/product/get-product-by-query')

module.exports = async (ctx, next) => {
  const { query } = ctx.query

  if (!query) return next()

  const products = await getProductsByQuery(query)

  ctx.body = { products }
}
