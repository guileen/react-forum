export default class LevelDB {
  constructor(db) {
    this.db = db
  }

  get(key) {
    return (callback) => {
      this.db.get(key, (err, result) => {
        if (err && err.notFound) {
          callback(null, null)
          return
        }
        callback(err, result)
      })
    }
  }

  put(key, value) {
    return (callback) => {
      this.db.put(key, value, callback)
    }
  }

  del(key) {
    return (callback) => {
      this.db.del(key, callback)
    }
  }

  mget(keys) {
    return (callback) => {
      this.db.batch(keys.map(k => ({type: 'get', key: k})), callback)
    }
  }

  /**
   * @param opts see levelup.createReadStream(opts)
   *    gt,gte
   *    lt,lte
   *    start,end
   *    reverse (boolean, default: false)
   *    keys (boolean, default: true)
   *    values {boolean, default: true)}
   *    limit (number, default: -1)
   *    fillCache (boolean, default: false)
   *    keyEncoding/valueEncoding   hex, utf8, ascii, binary, base64, ucs2, utf16le
   */
  range(opts) {
    return (callback) => {
      let err = null
      const results = []
      const stream = this.db.createReadStream(opts)
      stream.on('data', (data) => {
        results.push(data)
      })
      stream.on('error', (_err) => {
        err = _err
      })
      stream.on('end', () => {
        callback(err, results)
      })
    }
  }
}
