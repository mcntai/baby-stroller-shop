const getProductsList = require('../../bll/products/getProductsList')

module.exports = async ctx => {
  const products = await getProductsList()

  ctx.body = { products }
}
