import config from '../config'
import crypto from 'crypto'
import oauth2 from 'simple-oauth2'
import qs from 'querystring'
import router from './router'
import Promise from 'bluebird'
import * as oauthService from '../services/oauthService'

function initOauthMap(confMap, baseUrl) {
  var oauthMap = {}
  for (let k in confMap) {
    let conf = confMap[k]
    oauthMap[k] = oauth2(conf)
    let uri = conf.redirectUri
    uri = uri.startsWith('http') ? uri : (baseUrl + uri)
    console.log(uri)
    oauthMap[k].redirectUri = uri
    oauthMap[k].authUrl = oauthMap[k].authCode.authorizeURL({
      redirect_uri: uri,
      scope: conf.scope || '',
      state: conf.state
    })
  }
  return oauthMap
}
const oauthMap = initOauthMap(config.oauth2, config.baseUrl)

router.get('/auth/oauth2/:platform', (ctx) => {
  var oauth = oauthMap[ctx.params.platform]
  if (oauth) {
    ctx.redirect(oauth.authUrl)
  } else {
    throw new Error('no such platform')
  }
})

router.get('/oauth2-callback/:platform', async (ctx) => {
// http://localhost:3000/oauth2-callback/github?code=c0201ef0bce39b98ef3b&state=1234
  var code = ctx.query.code
  var state = ctx.query.state
  var platform = ctx.params.platform
  var oauth = oauthMap[platform]
  if (!oauth || state !== config.oauth2[platform].state) {
    ctx.body = 'Invalid'
    return
  }
  // TODO normalized save token and etc.
  let token = await Promise.promisify(oauth.authCode.getToken)({
    code: code,
    redirect_uri: oauth.redirectUri
  })
  if (token.includes('&')) {
    token = qs.parse(token).access_token
  }
  console.log('token:', token)
  // Get profile
  console.log('geting profile', oauthService)
  let result = await oauthService.getProfile(platform, token)
  let profile = result[0]
  console.log(result, profile)

  ctx.body = profile
  // let sid = snslogin(platform, profile)
  // ctx.cookies.set('sid', sid)
  // ctx.redirect('/')
})

router.get('/test', (ctx) => {
  console.log('start')
  var s = crypto.randomBytes(32).toString('base64')
  s = s.replace(/[\+\=\/]/g, '').substr(0, 32)
  ctx.cookies.set('sid', s)
  var s2 = ctx.cookies.get('sid')
  ctx.body = s2
})

router.get('/500', async (ctx) => {
  console.log('... 500')
  throw new Error('hello error 3')
})
