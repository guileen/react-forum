import util from 'util'

function getCurrentLine() {
  var e = new Error()
  var line = e.stack.split('\n')[3]
  var m = line.match(/.*\((.*)\).*/) || line.match(/\s*at (.*)/)
  return m ? m[1] : line
}

export default function trace(target, props, descriptor) {
  const line = getCurrentLine()
  const fn = descriptor.value
  const name = fn.name || 'function'
  descriptor.value = async function() {
    try {
      return await fn.apply(this, arguments)
    } catch (e) {
      console.log('  ->', line, name + '(' + [].slice.apply(arguments).map(arg => util.inspect(arg)).join(', ') + ')')
      throw e
    }
  }
}
