const { object, string } = require('sito')
const { User } = require('../../../models/index')
const { db } = require('../../../errors/validationSchema')
const registerUser = require('../../registration/registerUser')

const EMAIL_REGEX = /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/

const validationSchema = object({
  email      : string().required().pattern(EMAIL_REGEX)
    .combine(
      db().unique(User, 'email'),
    ),
  displayName: string().required()
    .combine(
      db().unique(User, 'displayName'),
    ),
  password   : string().required(),
})

module.exports = async (email, displayName, password) => {
  await validationSchema.assert({ email, displayName, password })

  return registerUser(email, displayName, password)
}
