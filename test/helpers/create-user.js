const { User } = require('../../app/models/index')

const userData = {
  email      : 'user@mail.com',
  displayName: 'user',
  password   : '123123',
}

module.exports = async () => {
  const user = await new User(userData)

  await user.setPassword(userData.password)
  await user.save()

  return user
}
