'use strict'
const getProductsByQuery = require('../../../app/bll/products/getProductsByQuery')
const { createCategory, createBulkProducts } = require('../../helpers/createCategoryAndProduct')
const { Category, Product } = require('../../../app/models/index')

const PRODUCTS_COUNT = 26
const query = 'Коляска детская'

describe('bll/products/getProductByQuery', () => {
  let products
  let product

  before(async () => {
    await Category.deleteMany()
    await Product.deleteMany()

    await createCategory()
    await createBulkProducts(PRODUCTS_COUNT)

    products = await getProductsByQuery(query)
    product = await Product.findById(products[0].id)
  })

  it('should find products by query', async () => {
    assert(products)
  })

  it('should return 20 products', () => {
    assert.strictEqual(products.length, 20)
  })

  it('product object should be of correct shape', async () => {
    assert.deepEqual(products[0], {
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
