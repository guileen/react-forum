import router from './router'
import qiniu from 'qiniu'
import config from '../config'

qiniu.conf.ACCESS_KEY = config.qiniu.key
qiniu.conf.SECRET_KEY = config.qiniu.secret

var uptokens = {}
Object.keys(config.qiniu.buckets).map(name => {
  uptokens[name] = new qiniu.rs.PutPolicy(config.qiniu.buckets[name].bucket)
})

router.post('/qiniu/uptoken', (ctx) => {
  var bucket = ctx.params.bucket || 'image'
  var token = uptokens[bucket].token()
  ctx.body = {
    bucket: bucket,
    token: token
  }
})
