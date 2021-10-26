const getProductsBySubcategory = require('../../bll/products/getProductsBySubcategory')

module.exports = async (ctx, next) => {
  const { subcategory } = ctx.query

  if (!subcategory) return next()

  const products = await getProductsBySubcategory(subcategory)

  ctx.body = { products }
}

