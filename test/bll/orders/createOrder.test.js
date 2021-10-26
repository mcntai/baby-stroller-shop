'use strict'
const createOrder = require('../../../app/bll/orders/createOrder')
const { Order, User, Product, Category } = require('../../../app/models/index')

const { createCategory, createProduct } = require('../../helpers/createCategoryAndProduct')
const createUser = require('../../helpers/createUser')

const phone = '123456789'
const address = 'Khreshchatik 41'

describe('bll/orders/createOrder', () => {
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

  it('should create order and return order ID', async () => {
    orderId = await createOrder(user, product, phone, address)

    assert(orderId)
  })
})
