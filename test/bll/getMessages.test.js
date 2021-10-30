'use strict'
const faker = require('faker')
const getMessages = require('../../app/bll/getMessages')
const { Message, User, Session } = require('../../app/models/index')
const MESSAGES_COUNT = 30

describe('bll/getMessages', () => {
  let messages
  let response
  let u

  before(async () => {
    await Message.deleteMany()

    const userData = {
      email      : 'user@mail.com',
      displayName: 'user',
      password   : '123123',
    }

    u = new User(userData)

    await u.setPassword(userData.password)
    await u.save()

    await Session.create({ token: faker.datatype.uuid(), user: u, lastVisit: new Date() })

    messages = await Message.insertMany([...new Array(MESSAGES_COUNT)].map(() => ({
      date: new Date(),
      text: faker.lorem.text(),
      chat: u.id,
      user: u.displayName,
    })))

    response = await getMessages(u.displayName)
  })

  it('should return 20 messages', () => {
    assert.strictEqual(response.messages.length, 20)
  })

  it('message should have expected shape', () => {
    const mappedMessage = response.messages[0]

    let msg = messages.find(m => m.id === mappedMessage.id.toString())

    assert(msg)

    assert.deepEqual(mappedMessage, {
      date: msg.date,
      text: msg.text,
      id  : msg._id,
      user: msg.user,
    })
  })
})
