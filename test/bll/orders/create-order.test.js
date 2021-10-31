'use strict'
const createOrder = require('../../../app/bll/api/order/create-order')
const { Order, User, Product, Category } = require('../../../app/models/index')

const { createCategory, createProduct } = require('../../helpers/create-category-and-product')
const createUser = require('../../helpers/create-user')

const phone = '+123456789'
const address = 'Gagarin 41'

describe('create-order payload validation + bll tests', () => {
  let user
  let product
  let orderId

  before(async () => {
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    user = await createUser()
    await createCategory()
    product = await createProduct()
  })

  describe('bll/api/order/create-order', () => {

    it('should reject empty payload', async () => {
      await assert.rejects(createOrder(), /is required/)
    })

    it('should reject invalid product', async () => {
      await assert.rejects(createOrder(user, 1234, phone, address),
        /Cast to ObjectId failed/)

      await assert.rejects(createOrder(user, 'id', phone, address),
        /product 'id' is not a valid id/)
    })

    it('should reject invalid phone', async () => {
      await assert.rejects(createOrder(user, product.id, +12342323),
        /phone should be type of string/)

      await assert.rejects(createOrder(user, product.id, '+32phone'),
        /phone does not match the pattern/)
    })

    it('should reject invalid address', async () => {
      await assert.rejects(createOrder(user, product.id, phone, 999),
        /address should be type of string/)
    })
  })

  describe('bll/order/createOrder', () => {

    it('should create order and return order ID', async () => {
      orderId = await createOrder(user, product.id, phone, address)

      assert(orderId)
    })

  })
})
