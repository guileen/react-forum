import router from './router'

// load all routes
import './auth'
import './user'

router.get('/', function(ctx, next) {
  ctx.body = {
    hello: ctx.host
  }
})

export default router
