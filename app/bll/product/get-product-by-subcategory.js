const Product = require('../../models/Product')
const mapProduct = require('../../mappers/product')

module.exports = async subcategory => {
  const products = await Product.find({ subcategory }).limit(20)

  return products.map(mapProduct)
}
