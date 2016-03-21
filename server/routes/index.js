import router from './router'

// load all routes
import './auth'
import './user'
import './post'
import './qiniu'

router.get('/', function(ctx, next) {
  ctx.body = {
    hello: ctx.host
  }
})

export default router
