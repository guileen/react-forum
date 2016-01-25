var router = require('./router')

// load all routes
require('./auth')

router.get('/', function*() {
  this.body = {
    hello: this.host
  }
})

module.exports = router

