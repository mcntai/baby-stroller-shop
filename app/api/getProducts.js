const getProductsBySubcategory = require('../bll/products/getProductsBySubcategory')
const getProductsByQuery = require('../bll/products/getProductsByQuery')
const getProductsList = require('../bll/products/getProductsList')

module.exports = ({ subcategory, query }) => {
  if (subcategory) {
    return getProductsBySubcategory(subcategory)
  }

  if (query) {
    return getProductsByQuery(query)
  }

  return getProductsList()
}
