export default () => {
  return (ctx, next) => {
    var start = Date.now()
    var ip = ctx.ips[0] || ctx.ip
    var ua = ctx.headers['user-agent']

    /*
       var timer = setTimeout(function() {
    // too long
    var postbody = ctx.request.body ? JSON.stringify(ctx.request.body) : '-'
    console.warn((new Date()).format('yyyy/MM/dd-hh:mm:ss'), ip,
      ctx.method, ctx.url, ctx.status, 'TIMEOUT', '-', ua, postbody, '-')
    }, 10000)
    */
    const showLog = () => {
      // clearTimeout(timer)
      var delta = Date.now() - start
      var dtime = delta < 10000
      ? delta + 'ms'
      : Math.round(delta/1000) + 's'

      var postbody = ctx.request.body ? JSON.stringify(ctx.request.body) : '-'
      console.log(
        (new Date()).format('yyyy/MM/dd-hh:mm:ss'),
        ip,
        ctx.method,
        ctx.url,
        ctx.status,
        ctx.errcode || '-',
        dtime,
        ua,
        postbody,
        ctx.errstack || '-')
    }
    next().then(showLog, showLog)
    // console.log('res', ctx.body)
  }
}
