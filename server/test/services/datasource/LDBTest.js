import LDB from 'services/datasource/LDB'
import {expect} from 'chai'
import memdown from 'memdown'

describe('LDB', () => {
  const db = new LDB({db: memdown})

  it('should put get', async () => {
    await db.put('foo', 'bar')
    let value = await db.get('foo')
    expect(value).to.be.equal('bar')
    await db.del('foo')
    let value2 = await db.get('foo')
    expect(value2).to.be.null
  })

  it('should incr', async () => {
    let v = await db.incr('incr_test')
    expect(v).to.be.eql(1)
    v = await db.incr('incr_test')
    expect(v).to.be.eql(2)
  })

  it('should mget', async () => {
    await db.batch([
        {type: 'put', key: 'k1', value: 'v1'},
        {type: 'put', key: 'k2', value: 'v2'},
        {type: 'put', key: 'k3', value: 'v3'}
    ])
    let results1 = await db.mget(['k1', 'k2', 'k3'])
    expect(results1).to.be.eql(['v1', 'v2', 'v3'])
  })
})
