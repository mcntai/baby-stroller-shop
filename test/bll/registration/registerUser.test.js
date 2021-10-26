'use strict'
const sinon = require('sinon')
const nodemailer = require('nodemailer')
const { User } = require('../../../app/models/index')

const userData = {
  email      : 'user@mail.com',
  displayName: 'user',
  password   : '123123',
}

describe('bll/registration/registerUser', () => {
  let registeredUser
  let sendMailStub
  const sandbox = sinon.createSandbox()

  before(async () => {
    sendMailStub = sandbox.stub().callsFake(() => {
    })

    sandbox.stub(nodemailer, 'createTransport').returns({
      use     : () => {
      },
      sendMail: sendMailStub,
    })

    const registerUser = require('../../../app/bll/registration/registerUser')

    await User.deleteMany()

    registeredUser = await registerUser(userData.email, userData.displayName, userData.password)
  })

  it('should return user', () => {
    assert(registeredUser)

    assert.strictEqual(registeredUser.email, userData.email)
    assert.strictEqual(registeredUser.displayName, userData.displayName)
  })

  it('should find user', async () => {
    const user = await User.findOne()

    assert(user)

    assert.strictEqual(user.email, userData.email)
    assert.strictEqual(user.displayName, userData.displayName)
  })

  it('should call sendMail', () => {
    assert(sendMailStub.calledOnce)
  })

  it('should have payload in correct shape', () => {
    assert(sendMailStub.firstCall)
    assert(sendMailStub.firstCall.lastArg)
    assert(sendMailStub.firstCall.lastArg.html)

    assert.deepStrictEqual(sendMailStub.firstCall.lastArg.to, { address: userData.email })

    assert.strictEqual(sendMailStub.firstCall.lastArg.subject, 'Подтвердите почту')
  })
})
