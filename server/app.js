global.config = require('./config')
import Koa from 'koa'
import authorize from './middleware/authorize'
import logger from './middleware/logger'
import routes from './routes'
import cclog from 'cclog'
import bodyparser from 'koa-bodyparser'

const app = new Koa()

app.use(logger())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    cclog.error(err)
    if (!ctx.body) {
      ctx.body = err.message || err
      ctx.status = err.status || 500
    }
  }
})

/*
if (!isDev) {
  app.use(conditional())
  app.use(etag())
}
*/

app.use(bodyparser())
app.use(authorize())
app.use(routes.routes())
app.use(routes.allowedMethods())

if (!module.parent) {
  app.listen(process.env.PORT || 3000)
}
export default app
