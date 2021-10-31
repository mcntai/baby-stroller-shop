const Order = require('../../models/Order')

module.exports = async (user, product, phone, address) => {
  const order = await Order.create({
    user,
    product,
    phone,
    address,
  })

  return order.id
}
