'use strict'
const faker = require('faker')
const { Product, Category } = require('../../app/models/index')
const getRecommendations = require('../../app/bll/getRecommendations')
const PRODUCTS_COUNT = 7

describe('bll/getRecommendations', () => {
  let products
  let category
  let response

  before(async () => {
    await Category.deleteMany()
    await Product.deleteMany()

    category = await Category.create({
      title        : faker.commerce.department(),
      subcategories: [{
        title: faker.commerce.department(),
      }],
    })

    products = await Product.insertMany([...new Array(PRODUCTS_COUNT)].map(() => ({
      title      : faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price      : faker.commerce.price(),
      category   : category.id,
      subcategory: category.subcategories[0].id,
      images     : [faker.image.imageUrl()],
    })))

    response = await getRecommendations()
  })

  it('should return 6 products', () => {
    assert.strictEqual(response.length, 6)
  })

  it('product should have expected shape', () => {
    const mappedProduct = response[0]

    let product = products.find(p => p.id === mappedProduct.id)

    assert(product)

    assert.deepEqual(mappedProduct, {
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
