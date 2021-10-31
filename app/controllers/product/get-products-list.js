const getProductsList = require('../../bll/product/get-products-list')

module.exports = async ctx => {
  const products = await getProductsList()

  ctx.body = { products }
}
