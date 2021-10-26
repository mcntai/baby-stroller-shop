const Product = require('../../models/Product')
const mapProduct = require('../../mappers/product')

module.exports = async query => {
  const products = await Product
    .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .limit(20)

  return products.map(mapProduct)
}
