const mongoose = require('mongoose')

module.exports = async id => {
  return mongoose.Types.ObjectId.isValid(id)
}
