'use strict'
const getProductById = require('../../../app/bll/products/getProductById')
const { createCategory, createProduct } = require('../../helpers/createCategoryAndProduct')
const { Category, Product } = require('../../../app/models/index')

describe('bll/products/getProductById', () => {
  let product
  let foundProduct

  before(async () => {
    await Category.deleteMany()
    await Product.deleteMany()

    await createCategory()
    product = await createProduct()

    foundProduct = await getProductById(product.id)
  })

  it('should find product by ID', async () => {
    assert(foundProduct)
  })

  it('product object should be of correct shape', async () => {
    assert.deepEqual(foundProduct, {
      id         : product.id,
      title      : product.title,
      images     : product.images,
      category   : product.category,
      subcategory: product.subcategory,
      price      : product.price,
      description: product.description,
    })
  })
})
