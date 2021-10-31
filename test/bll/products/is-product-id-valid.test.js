'use strict'
const isProductIdValid = require('../../../app/bll/product/is-valid-object-id')
const { createCategory, createProduct } = require('../../helpers/create-category-and-product')
const { Category, Product } = require('../../../app/models/index')

describe('bll/product/isProductIdValid', () => {
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
