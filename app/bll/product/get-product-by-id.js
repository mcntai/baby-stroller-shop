const Product = require('../../models/Product')
const argumentsAssert = require('../../asserts/arguments-assert')
const notFoundAssert = require('../../asserts/not-found-assert')
const mapProduct = require('../../mappers/product')
const isValidObjectId = require('./is-valid-object-id')

module.exports = async id => {
  const isValid = isValidObjectId(id)

  argumentsAssert(isValid, 'invalid product id')

  const product = await Product.findById(id)

  notFoundAssert(product, `no product with ${id} id`)

  return mapProduct(product)
}
