import {sessionProvider} from '../services/providers'

export default () => {
  return async (ctx, next) => {
    var sid
    if (ctx.headers.cookie) {
      sid = ctx.cookies.get('sid')
    } else {
      sid = ctx.query.sid
    }
    if (sid) {
      ctx.state.userId = await sessionProvider.get(sid)
    }
    await next()
  }
}
