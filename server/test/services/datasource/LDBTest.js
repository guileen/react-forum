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
    try {
      let value2 = await db.get('foo')
      expect(value2).to.be(null)
    } catch (e) {
      console.log(e, e.notFound)
      expect(e.notFound).to.be.ok
    }
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
