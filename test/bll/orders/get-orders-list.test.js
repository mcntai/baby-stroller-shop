'use strict'
const getOrdersList = require('../../../app/bll/order/get-orders-list')
const createOrder = require('../../../app/bll/order/create-order')
const { User, Order, Category, Product } = require('../../../app/models/index')

const { createCategory, createProduct } = require('../../helpers/create-category-and-product')
const createUser = require('../../helpers/create-user')

const phone = '123456789'
const address = 'Khreshchatik 41'

describe('bll/order/createOrder', () => {
  let user
  let product
  let orderId
  let response

  before(async () => {
    await Order.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    user = await createUser()
    await createCategory()
    product = await createProduct()
    orderId = await createOrder(user, product, phone, address)

    response = await getOrdersList(user)
  })

  it('should find order', async () => {
    assert(response)
  })

  it('order object should be of correct shape', () => {
    const mappedOrder = response[0]

    assert(mappedOrder)

    assert.deepEqual(mappedOrder, {
      id     : mappedOrder.id,
      user   : mappedOrder.user,
      product: {
        id         : mappedOrder.product.id,
        title      : mappedOrder.product.title,
        images     : mappedOrder.product.images,
        category   : mappedOrder.product.category,
        subcategory: mappedOrder.product.subcategory,
        price      : mappedOrder.product.price,
        description: mappedOrder.product.description,
      },
      phone  : mappedOrder.phone,
      address: mappedOrder.address,
    })
  })
})
