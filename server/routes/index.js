var router = require('./router')

// load all routes
require('./auth')

router.get('/', function(ctx, next) {
  ctx.body = {
    hello: ctx.host
  }
})

module.exports = router

