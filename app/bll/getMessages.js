const Message = require('../models/Message')

module.exports = async displayName => {
  const messages = await Message.find({ user: displayName }).limit(20)

  return {
    messages: messages.map(msg => (
      {
        date: msg.date,
        text: msg.text,
        id  : msg._id,
        user: msg.user,
      }
    )),
  }
}
