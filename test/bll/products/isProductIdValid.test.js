'use strict'
const isProductIdValid = require('../../../app/bll/products/isValidObjectId')
const { createCategory, createProduct } = require('../../helpers/createCategoryAndProduct')
const { Category, Product } = require('../../../app/models/index')

describe('bll/products/isProductIdValid', () => {
  let product

  before(async () => {
    await Category.deleteMany()
    await Product.deleteMany()

    await createCategory()
    product = await createProduct()
  })

  it('should validate product ID', async () => {
    const isIdValid = await isProductIdValid(product.id)

    assert(isIdValid)
  })
})
