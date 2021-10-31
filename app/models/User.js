const mongoose = require('mongoose')
const crypto = require('crypto')
const connection = require('../libs/connection')
const config = require('../config')
const REGEX_PATTERN = require('../utils/regex')

const userSchema = new mongoose.Schema({
  email            : {
    type    : String,
    required: 'Email should not be empty',
    validate: [
      {
        validator(value) {
          return REGEX_PATTERN.EMAIL.test(value)
        },
        message: 'Invalid email',
      },
    ],
    unique  : 'Such email already exists',
  },
  displayName      : {
    type    : String,
    required: 'User should have displayName',
    unique  : 'Such displayName already exists',
  },
  verificationToken: {
    type : String,
    index: true,
  },
  passwordHash     : {
    type: String,
  },
  salt             : {
    type: String,
  },
}, {
  timestamps: true,
})

const generatePassword = (salt, password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, salt,
      config.crypto.iterations,
      config.crypto.length,
      config.crypto.digest,
      (err, key) => {
        if (err) return reject(err)
        resolve(key.toString('hex'))
      },
    )
  })
}

const generateSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.crypto.length, (err, buffer) => {
      if (err) return reject(err)
      resolve(buffer.toString('hex'))
    })
  })
}

userSchema.methods.setPassword = async password => {
  this.salt = await generateSalt()
  this.passwordHash = await generatePassword(this.salt, password)
}

userSchema.methods.checkPassword = async password => {
  if (!password) return false

  const hash = await generatePassword(this.salt, password)

  return hash === this.passwordHash
}

module.exports = connection.model('User', userSchema)
