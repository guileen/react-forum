var router = require('./router')
var oauth2 = require('simple-oauth2')
var qs = require('querystring')
var config = require('../config')

function initOauthMap(confMap, baseUrl) {
  var oauthMap = {}
  for (var k in confMap) {
    var conf = confMap[k]
    oauthMap[k] = oauth2(conf)
    var uri = conf.redirectUri
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
var oauthMap = initOauthMap(config.oauth2, config.baseUrl)

router.get('/auth/oauth2/:platform', function*() {
  var oauth = oauthMap[this.params.platform]
  if (oauth) {
    this.redirect(oauth.authUrl)
  } else {
    throw new Error('no such platform')
  }
})

router.get('/oauth2-callback/:platform', function*() {
// http://localhost:3000/oauth2-callback/github?code=c0201ef0bce39b98ef3b&state=1234
  var code = this.query.code
  var state = this.query.state
  var oauth = oauthMap[this.params.platform]
  if(!oauth || state != config.oauth2[this.params.platform].state) {
    this.body = 'Invalid'
    return
  }
  // TODO normalized save token and etc.
  oauth.authCode.getToken({
    code: code,
    redirect_uri: oauth.redirectUri
  }, function(err, result) {
    if (err) {
      console.log('Access Token Error', err.message)
    }
    var token = result
    if(~result.indexOf('&')) {
      token = qs.parse(result).access_token
    }
    console.log('token:', token)
  })
  this.body = 'callbacked'
})
