'use strict'
const getProductsList = require('../../../app/bll/product/get-products-list')
const { createCategory, createBulkProducts } = require('../../helpers/create-category-and-product')
const { Category, Product } = require('../../../app/models/index')

const PRODUCTS_COUNT = 26

describe('bll/product/getProductsList', () => {
  let products
  let product

  before(async () => {
    await Category.deleteMany()
    await Product.deleteMany()

    await createCategory()
    await createBulkProducts(PRODUCTS_COUNT)

    products = await getProductsList()
    product = await Product.findOne()
  })

  it('should find product', async () => {
    assert(products)
  })

  it('should return 20 product', () => {
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
