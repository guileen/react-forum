import {trace} from '../../commons/decorators'

export default class Provider {
  /**
   * @param db
   * @param modelName
   * @param valueType 'object', 'string', 'number', 'buffer'
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
    this.convertValue = this.convertValue.bind(this)
  }

  key(id) {
    var ids = '' + id
    var zeros = ids.length < 20 ? '0'.repeat(20 - ids.length) : ''
    return this.modelName + ':' + zeros + ids
  }

  convertValue(value) {
    if (value == null) {
      return this.valueType === 'number' ? 0 : value
    }
    switch (this.valueType) {
      case 'object':
        return JSON.parse(value)
      case 'number':
        return Number(value)
      case 'string':
        return value
      case 'buffer':
        return new Buffer(value)
    }
  }

  @trace
  async get(id) {
    console.log('get', this.modelName, id)
    let v = await this.db.get(this.key(id))
    return this.convertValue(v)
  }

  @trace
  mget(ids) {
    return Promise.all(ids.map((id) => this.get(id)))
  }

  @trace
  put(id, value) {
    if (value == null) {
      return Promise.reject('value must not be null')
    }
    var v = value
    switch (this.valueType) {
      case 'object':
        v = JSON.stringify(v)
        break
      case 'number':
        v = '' + v
        break
      case 'buffer':
        v = value.toString()
    }
    return this.db.put(this.key(id), v)
  }

  @trace
  del(id) {
    return this.db.del(this.key(id))
  }

  /**
   * lt, gt, lte, gte
   */
  @trace
  async rangeValues(opt) {
    let finalOpt = {
      ...opt,
      lt: opt.lt && this.key(opt.lt),
      lte: opt.lte && this.key(opt.lte),
      gt: opt.gt && this.key(opt.gt),
      gte: opt.gte && this.key(opt.gte)
    }
    var result = await this.db.rangeValues(finalOpt)
    return result.map(this.convertValue)
  }
}

export class EntityProvider extends Provider {

  /**
   * @param db
   * @param modelName
   */
  constructor(db, modelName) {
    super(db, modelName, 'object')
  }

  @trace
  async generateId() {
    return await this.db.incr('id:'+this.modelName)
  }

  @trace
  async insert(obj) {
    if (obj.id) throw new Error('inserting object has id')
    var id = await this.generateId()
    obj.id = id
    await this.put(id, obj)
    return id
  }

  @trace
  save(obj) {
    if (!obj.id) {
      return this.insert(obj)
    }
    return this.put(obj.id, obj)
  }

}
