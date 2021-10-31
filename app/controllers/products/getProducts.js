const getProducts = require('../../bll/api/getProducts')

module.exports = async ctx => {
  const products = await getProducts(ctx.query)

  ctx.body = { products }
}
