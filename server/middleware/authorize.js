export default () => {
  return async (ctx, next) => {
    var sid
    if (ctx.headers.cookie) {
      sid = ctx.cookies.get('sid')
    } else {
      sid = ctx.query.sid
    }
    await next()
  }
}
