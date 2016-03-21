import router from './router'
import qiniu from 'qiniu'
import config from '../config'

qiniu.conf.ACCESS_KEY = config.qiniu.key
qiniu.conf.SECRET_KEY = config.qiniu.secret

var uptokens = {}
Object.keys(config.qiniu.bucket).map(name => {
  uptokens[name] = new qiniu.rs.PutPolicy(config.qiniu.bucket[name])
})

router.post('/qiniu/uptoken', (ctx) => {
  var type = ctx.params.type || 'image'
  console.log(type, uptokens)
  var token = uptokens[type].token()
  ctx.body = {
    token: token
  }
})
