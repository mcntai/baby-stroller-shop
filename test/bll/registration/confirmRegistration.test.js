'use strict'
const { User } = require('../../../app/models/index')
const confirmRegistration = require('../../../app/bll/registration/confirmRegistration')
const uuid = require('uuid/v4')

const userData = {
  email            : 'user@mail.com',
  displayName      : 'user',
  password         : '123123',
  verificationToken: uuid(),
}

describe('bll/registration/confirmRegistration', () => {
  let registeredUser
  let foundUser

  before(async () => {
    await User.deleteMany()

    registeredUser = new User(userData)

    await registeredUser.setPassword(userData.password)
    await registeredUser.save()
  })

  it('should find user', async () => {
    foundUser = await User.findOne()

    assert(foundUser)

    assert.strictEqual(foundUser.email, userData.email)
    assert.strictEqual(foundUser.displayName, userData.displayName)
  })

  it('should return token', async () => {
    const token = await confirmRegistration(registeredUser.verificationToken)

    assert(token)
  })

  it('verificationToken should be undefined', async () => {
    foundUser = await User.findOne()

    assert.strictEqual(foundUser.verificationToken, undefined)
  })
})
