const { object, string } = require('sito')
const { Message } = require('../../../models/index')
const { objectId } = require('../../../errors/validationSchema')

const validationSchema = object({
  text: string().required(),
  chat: objectId().required(),
  user: string().required(),
}).required()

module.exports = async (text, chat, user) => {
  await validationSchema.assert({ text, chat, user })

  await Message.create({ date: new Date(), text, chat, user })
}
