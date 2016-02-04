global.config = require('./config')
const app = require('koa')()
const routes = require('./routes')
module.exports = app

app.use(routes.routes())
app.use(routes.allowedMethods())

if (!module.parent) {
  app.listen(3000)
}
