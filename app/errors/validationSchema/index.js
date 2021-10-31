const { GenericValidator } = require('sito')
const DbValidator = require('./db')
const mongoose = require('mongoose')

exports.db = () => new DbValidator()

exports.objectId = () => new GenericValidator().check({
  message : (path, value) => `${path} '${value}' is not a valid id`,
  validate: value => mongoose.Types.ObjectId.isValid(value),
})

