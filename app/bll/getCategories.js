const Category = require('../models/Category')

module.exports = () => {
  return Category.find()
}
