import LevelUp from 'levelup'
// import Promise from 'bluebird'
var Promise = require('bluebird')

// TODO bluebird promisifyAll not works.
// const MyLevelUp = Promise.promisifyAll(LevelUp)

export default class LDB {
  constructor(dbOpts) {
    this.db = new LevelUp(dbOpts)
    ;['get', 'put', 'del', 'open', 'close', 'batch'].forEach((method) => {
      this[method] = Promise.promisify(LevelUp.prototype[method], {context: this.db})
    })
  }

  mget(keys) {
    return Promise.all(keys.map((key) => this.get(key)))
  }

  range(opts) {
    const self = this
    return new Promise(function(resolve, reject) {
      const results = []
      const stream = self.createReadStream(opts)
      stream.on('data', (data) => {
        results.push(data)
      })
      stream.on('error', (err) => {
        reject(err)
      })
      stream.on('end', () => {
        resolve(results)
      })
    })
  }
}

export function makePromiseLDB(dbOpts) {
  const db = new LevelUp(dbOpts)
  ;['get', 'put', 'del', 'open', 'close', 'batch', 'approximateSize'].forEach((method) => {
    db[method + 'Async'] = Promise.promisify(LevelUp.prototype[method], db)
  })

  db.range = (opts) => {
    const self = this
    return new Promise(function(resolve, reject) {
      const results = []
      const stream = self.createReadStream(opts)
      stream.on('data', (data) => {
        results.push(data)
      })
      stream.on('error', (err) => {
        reject(err)
      })
      stream.on('end', () => {
        resolve(results)
      })
    })
  }
  return db
}
