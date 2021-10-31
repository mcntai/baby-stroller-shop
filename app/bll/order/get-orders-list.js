const Order = require('../../models/Order')
const mapOrder = require('../../mappers/order')

module.exports = async user => {
  const orders = await Order.find({ user }).populate('product')

  return orders.map(mapOrder)
}
