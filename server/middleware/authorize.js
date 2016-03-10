import {sessionProvider} from '../services/providers'

export default () => {
  return async (ctx, next) => {
    var sid
    if (ctx.headers.cookie) {
      sid = ctx.cookies.get('sid')
    } else {
      sid = ctx.query.sid
    }
    console.log('sid', sid)
    if (sid) {
      const userId = await sessionProvider.get(sid)
      ctx.state.userId = Number(userId)
    }
    await next()
  }
}

export const requireLogin = async (ctx, next) => {
  if (ctx.state.userId) {
    await next()
    return
  }
  ctx.throw(401)
}
