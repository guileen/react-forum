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
      ctx.state.userId = await sessionProvider.get(sid)
      console.log('state', ctx.state)
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
