var LevelDB = require('../../../services/datasource/LevelDB')
var expect = require('expect')
var levelup = require('levelup')
var memdown = require('memdown')

describe('LevelDB', () => {
  var db = new LevelDB(levelup({db: memdown}))
  it('should', function*() {
    yield db.put('foo', 'bar')
    var value = yield db.get('foo')
    expect(value).toBe('bar')
    yield db.del('foo')
    var value2 = yield db.get('foo')
    expect(value2).toBe(null)
  })
})
