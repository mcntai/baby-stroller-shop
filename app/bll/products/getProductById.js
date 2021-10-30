const Product = require('../../models/Product')
const argumentsAssert = require('../../asserts/argumentsAssert')
const notFoundAssert = require('../../asserts/notFoundAssert')
const mapProduct = require('../../mappers/product')
const isValidObjectId = require('./isValidObjectId')

module.exports = async id => {
  const isValid = isValidObjectId(id)

  argumentsAssert(isValid, 'invalid product id')

  const product = await Product.findById(id)

  notFoundAssert(product, `no product with ${id} id`)

  return mapProduct(product)
}
