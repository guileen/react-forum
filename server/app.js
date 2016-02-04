global.config = require('./config')
const Koa = require('koa')
const app = new Koa()
const routes = require('./routes')
module.exports = app

app.use(routes.routes())
app.use(routes.allowedMethods())

if (!module.parent) {
  app.listen(3000)
}
