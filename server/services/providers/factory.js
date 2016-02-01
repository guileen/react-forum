var maindb = require('../datasource/maindb')

class Provider {
  constructor(db, modelName, serializer) {
    this.db = db
    this.modelName = modelName
    this.serializer = serializer
  }

  key(id) {
    return modelName + ':' + id
  }

  get(id) {
    return this.db.get(this.key(id))
  }

  mget(ids) {

  }

  put(id, obj) {
    return this.db.put(this.key(id), serializer.stringify(obj))
  }

  del(id) {
    return this.db.del(this.key(id))
  }

  range() {
  }
}

function makeEntityProvider(db, modelName) {
  function get(id) {
    return function(callback) {
      db.get(id, callback)
    }
  }
  let provider = {
    db: maindb,
    /*
    get: get,
    mget: mget,
    range: range,
    update: update,
    insert: insert,
    */
    put: put, // insert or update
    del: del,
  }
  return provider
}

exports.makeProvider = function makeProvider(modelName) {
  return makeEntityProvider(maindb, modelName)
}
