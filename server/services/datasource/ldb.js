import {getMutex} from '../../commons/mutex'
import trace from '../../commons/decorators/trace'

import LevelUp from 'levelup'
// import Promise from 'bluebird'
var Promise = require('bluebird')

// TODO bluebird promisifyAll not works.
// const MyLevelUp = Promise.promisifyAll(LevelUp)

export default class LDB {
  constructor(dbOpts) {
    this.db = new LevelUp(dbOpts)
    this._get = Promise.promisify(LevelUp.prototype.get, {context: this.db})
    ;['put', 'del', 'open', 'close', 'batch'].forEach((method) => {
      this['_' + method] = Promise.promisify(LevelUp.prototype[method], {context: this.db})
    })
  }

  @trace
  async put(key, value) {
    console.log('ldb:PUT', key, value)
    return await this._put(key, value)
  }

  @trace
  async del(key) {
    console.log('ldb:DEL', key)
    return await this._del(key)
  }

  @trace
  async batch(array, option = {}) {
    console.log('ldb:BATCH\n'+array.map(op => `    ${op.type} ${op.key} ${op.value || ''}`).join('\n'))
    await this._batch(array, option)
  }

  @trace
  async incr(key, num=1) {
    let mutex = getMutex(key)
    await mutex.lock()
    let v = await this.get(key)
    let n = v == null ? 0 : parseInt(v, 10)
    n += num
    await this.put(key, '' + n)
    mutex.unlock()
    return n
  }

  @trace
  async get(id) {
    try {
      return await this._get(id)
    } catch (e) {
      if (e.notFound) {
        return null
      }
      throw e
    }
  }

  @trace
  mget(keys) {
    return Promise.all(keys.map((key) => this.get(key)))
  }

  @trace
  rangeKeys(opts) {
    return this.range({...opts, keys: true, values: false})
  }

  @trace
  rangeValues(opts) {
    return this.range({...opts, keys: false, values: true})
  }

  @trace
  range(opts) {
    console.log('ldb:RANGE', opts)
    const db = this.db
    return new Promise(function(resolve, reject) {
      const results = []
      const stream = db.createReadStream(opts)
      stream.on('data', (data) => {
        results.push(data)
      })
      stream.on('error', (err) => {
        reject(err)
      })
      stream.on('end', () => {
        console.log(results)
        resolve(results)
      })
    })
  }
}
