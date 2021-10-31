const getProductsBySubcategory = require('../../bll/product/get-product-by-subcategory')

module.exports = async (ctx, next) => {
  const { subcategory } = ctx.query

  if (!subcategory) return next()

  const products = await getProductsBySubcategory(subcategory)

  ctx.body = { products }
}


