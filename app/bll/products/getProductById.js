const Product = require('../../models/Product')
const mapProduct = require('../../mappers/product')

module.exports = async id => {
  const product = await Product.findById(id)

  return mapProduct(product)
}
