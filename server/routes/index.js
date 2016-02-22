import router from './router'

// load all routes
require('./auth')

router.get('/', function(ctx, next) {
  ctx.body = {
    hello: ctx.host
  }
})

export default router
