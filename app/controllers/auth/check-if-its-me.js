module.exports = ctx => {
  ctx.body = {
    email      : ctx.user.email,
    displayName: ctx.user.displayName,
  }
}
