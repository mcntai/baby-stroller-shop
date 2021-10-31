const getProductsBySubcategory = require('../../product/get-product-by-subcategory')
const getProductsByQuery = require('../../product/get-product-by-query')
const getProductsList = require('../../product/get-products-list')

module.exports = ({ subcategory, query }) => {
  if (subcategory) {
    return getProductsBySubcategory(subcategory)
  }

  if (query) {
    return getProductsByQuery(query)
  }

  return getProductsList()
}
