const createMessage = require('../../app/bll/api/message/create-message')
const createUser = require('../helpers/create-user')
const { User } = require('../../app/models/index')

describe('bll/api/message/create-message', () => {
  let user

  before(async () => {
    await User.deleteMany()

    user = await createUser()
  })

  it('should reject empty payload', async () => {
    await assert.rejects(createMessage(), /is required/)
  })

  it('should reject invalid text', async () => {
    await assert.rejects(createMessage(1), /text should be type of string/)
  })

  it('should reject invalid chat id', async () => {
    await assert.rejects(createMessage('text', 'id'), /chat 'id' is not a valid id/)
  })

  it('should reject invalid user displayName', async () => {
    await assert.rejects(createMessage('text', user.id, 123), /user should be type of string/)
  })
})
