const { object, string } = require('sito')
const { User } = require('../../../models/index')
const { db } = require('../../../errors/validation-schema')
const registerUser = require('../../registration/register-user')
const REGEX_PATTER = require('../../../utils/regex')

const validationSchema = object({
  email      : string().required().pattern(REGEX_PATTER.EMAIL)
    .combine(
      db().unique(User, 'email'),
    ),
  displayName: string().required()
    .combine(
      db().unique(User, 'displayName'),
    ),
  password   : string().required(),
}).required()

module.exports = async (email, displayName, password) => {
  await validationSchema.assert({ email, displayName, password })

  return registerUser(email, displayName, password)
}
