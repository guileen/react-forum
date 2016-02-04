var LevelDB = require('../../../services/datasource/LevelDB')
var expect = require('expect')
var levelup = require('levelup')
var memdown = require('memdown')

describe('LevelDB', () => {
  var db = new LevelDB(levelup({db: memdown}))
  it('should put get', function*() {
    yield db.put('foo', 'bar')
    let value = yield db.get('foo')
    expect(value).toBe('bar')
    yield db.del('foo')
    let value2 = yield db.get('foo')
    expect(value2).toBe(null)
  })

  it('should mget', function*() {
    yield db.put('k1', 'v1')
    yield db.put('k2', 'v2')
    yield db.put('k3', 'v3')
    let results = yield db.mget('k1', 'k2', 'k3')
    expect(results.len).toBe(3)
    expect(results[0])
    expect(results[1])
    expect(results[2])
  })
})
