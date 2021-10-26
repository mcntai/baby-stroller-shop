module.exports = authorizationHeader => {
  return authorizationHeader.split(' ')[1]
}
