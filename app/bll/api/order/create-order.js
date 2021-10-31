const { object, string } = require('sito')
const { objectId } = require('../../../errors/validationSchema')
const createOrder = require('../../orders/createOrder')
const REGEX_PATTERN = require('../../../utils/regex')

const validationSchema = object({
  product: objectId().required(),
  phone  : string().required().pattern(REGEX_PATTERN.PHONE),
  address: string().required(),
}).required()

module.exports = async (user, product, phone, address) => {
  await validationSchema.assert({ product, phone, address })

  return createOrder(user, product, phone, address)
}
