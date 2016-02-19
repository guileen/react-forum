export default class Provider {
  /**
   * @param db
   * @param modelName
   * @param valueType 'json', 'string', 'number', 'bytes'
   */
  constructor(db, modelName, valueType) {
    this.db = db
    this.modelName = modelName
    if (!valueType) {
      throw new Error('model:' + modelName + ' valueType is required')
    } else if (['object', 'string', 'number', 'buffer'].indexOf(valueType) === -1) {
      throw new Error('model:' + modelName + ' valueType:' + valueType + ' is not in object, string, number, buffer')
    }
    this.valueType = valueType
  }

  key(id) {
    return this.modelName + ':' + id
  }

  async get(id) {
    try {
      let v = await this.db.get(this.key(id))
      switch (this.valueType) {
        case 'object':
      }
      return v
    } catch (e) {
      if (e.notFound) {
        return null
      }
      throw e
    }
  }

  mget(ids) {
    return Promise.all(ids.map((id) => this.get(id)))
  }

  put(id, obj) {
    return this.db.put(this.key(id), this.serializer.stringify(obj))
  }

  del(id) {
    return this.db.del(this.key(id))
  }

  range() {
  }
}
