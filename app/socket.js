const socketIO = require('socket.io')
const { Session, Message } = require('./models/index')
const createMessage = require('./bll/api/message/create-message')

const socket = server => {
  const io = socketIO(server)

  io.use(async function (socket, next) {
    const token = socket.handshake.query.token

    if (!token) return next(new Error('anonymous sessions are not allowed'))

    const session = await Session.findOne({ token }).populate('user')

    if (!session) return next(new Error('wrong or expired session token'))

    socket.user = session.user

    next()
  })

  io.on('connection', function (socket) {
    socket.on('message', async text => {
      await createMessage(text, socket.user._id, socket.user.displayName)
    })
  })

  return io
}

module.exports = socket
