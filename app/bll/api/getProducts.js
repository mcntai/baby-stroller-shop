const getProductsBySubcategory = require('../products/getProductsBySubcategory')
const getProductsByQuery = require('../products/getProductsByQuery')
const getProductsList = require('../products/getProductsList')

module.exports = ({ subcategory, query }) => {
  if (subcategory) {
    return getProductsBySubcategory(subcategory)
  }

  if (query) {
    return getProductsByQuery(query)
  }

  return getProductsList()
}
