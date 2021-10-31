const mongoose = require('mongoose')
const connection = require('../libs/connection')
const REGEX_PATTERN = require('../utils/regex')

const orderSchema = new mongoose.Schema({
  user   : {
    type    : mongoose.Schema.Types.ObjectId,
    required: true,
    ref     : 'User',
  },
  product: {
    type    : mongoose.Schema.Types.ObjectId,
    required: true,
    ref     : 'Product',
  },
  phone  : {
    type    : String,
    required: true,
    validate: [
      {
        validator(value) {
          return REGEX_PATTERN.PHONE.test(value)
        },
        message: 'Invalid phone number format',
      },
    ],
  },
  address: {
    type    : String,
    required: true,
  },
})

module.exports = connection.model('Order', orderSchema)
