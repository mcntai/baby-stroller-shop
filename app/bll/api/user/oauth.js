const { object, string } = require('sito')
const createUserIfNotExists = require('../../user/create-user-if-not-exists')
const REGEX_PATTER = require('../../../utils/regex')

const validationSchema = object({
  email      : string().required().pattern(REGEX_PATTER.EMAIL),
  displayName: string().required(),
}).required()

module.exports = async (strategy, email, displayName) => {
  await validationSchema.assert({ email, displayName })

  return createUserIfNotExists(strategy, email, displayName)
}
