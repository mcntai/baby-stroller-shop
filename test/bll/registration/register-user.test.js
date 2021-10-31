'use strict'
const sinon = require('sinon')
const nodemailer = require('nodemailer')
const { User } = require('../../../app/models/index')
const faker = require('faker')

const userData = {
  email      : 'user@mail.com',
  displayName: 'user',
  password   : '123123',
}

describe('register-user validation + bll tests', () => {
  let registeredUser
  let sendMailStub
  let registerUser
  const sandbox = sinon.createSandbox()

  before(async () => {
    sendMailStub = sandbox.stub().callsFake(() => {
    })

    sandbox.stub(nodemailer, 'createTransport').returns({
      use     : () => {
      },
      sendMail: sendMailStub,
    })

    registerUser = require('../../../app/bll/api/user/register')

    await User.deleteMany()

    registeredUser = await registerUser(userData.email, userData.displayName, userData.password)
  })

  describe('bll/api/user/register', async () => {
    let user

    before(async () => {
      user = await User.create({
        email      : faker.internet.email(),
        displayName: faker.name.findName(),
      })
    })

    it('should reject empty payload', async () => {
      await assert.rejects(registerUser(), /is required/)
    })

    it('should reject invalid email', async () => {
      await assert.rejects(registerUser('sadasdasd'), /email does not match the pattern/)

      await assert.rejects(registerUser(user.email, user.displayName, 'dd'),
        new RegExp(`email '${user.email}' is not unique`))
    })

    it('should reject not unique displayName', async () => {
      await assert.rejects(registerUser(faker.internet.email(), user.displayName, 'dd'),
        new RegExp(`displayName '${user.displayName}' is not unique`))
    })

    it('should reject invalid password', async () => {
      await assert.rejects(registerUser(faker.internet.email(), faker.name.findName(), 123456),
        /password should be type of string/)
    })
  })

  describe('bll/registration/registerUser', () => {

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

      assert.strictEqual(sendMailStub.firstCall.lastArg.subject, 'Confirm your email')
    })
  })
})
