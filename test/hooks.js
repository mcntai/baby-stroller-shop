const assert = require('assert')
const connection = require('../app/libs/connection')
const { Order, User, Product, Category, Session, Message } = require('../app/models/index')

global.assert = assert

exports.mochaHooks = {
  beforeEach: function () {

  },
  afterAll  : async function () {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()
    await Session.deleteMany()
    await Message.deleteMany()

    return connection.close()
  },
}
