module.exports = ctx => {
  console.log(ctx.body)

  ctx.body = {
    email      : ctx.user.email,
    displayName: ctx.user.displayName,
  }
}
