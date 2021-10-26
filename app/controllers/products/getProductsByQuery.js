const getProductsByQuery = require('../../bll/products/getProductsByQuery')

module.exports = async (ctx, next) => {
  const { query } = ctx.query

  if (!query) return next()

  const products = await getProductsByQuery(query)

  ctx.body = { products }
}
