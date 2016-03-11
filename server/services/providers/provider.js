import {trace} from '../../commons/decorators'

const MAX_NUM = '9'.repeat(20)
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

  fixNumStr(id, len=20) {
    var ids = '' + id
    var zeros = ids.length < 20 ? '0'.repeat(20 - ids.length) : ''
    return zeros + ids
  }

  key(id) {
    return this.modelName + ':' + this.fixNumStr(id)
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
  async rangeValues(opts={}) {
    var opt = {...opts}
    if (opt.lt == null && opt.lte == null) {
      opt.lte = MAX_NUM
    }
    if (opt.gt == null && opt.gte == null) {
      opt.gte = 0
    }
    if (opt.lt != null) {
      opt.lt = this.key(opt.lt)
    }
    if (opt.lte != null) {
      opt.lte = this.key(opt.lte)
    }
    if (opt.gt != null) {
      opt.gt = this.key(opt.gt)
    }
    if (opt.gte != null) {
      opt.gte = this.key(opt.gte)
    }
    var result = await this.db.rangeValues(opt)
    return result.map(this.convertValue)
  }

  _bindManyKey(prefix, oneId, seq) {
    return prefix + ':' + oneId + ':' + this.fixNumStr(seq)
  }

  @trace
  async bindOneToOne(toOnePrefix, targetId, oneId) {
    throw new Error('not implement')
  }

  /**
   * author_user post
   *
   */
  @trace
  async bindOneToMany(oneToManyPrefix, oneId, manyId) {
    console.log('bindOneToMany', oneToManyPrefix, oneId, manyId)
    if (oneId == null || manyId == null) return
    var isBinded = await this.isBinded(oneToManyPrefix, oneId, manyId)
    if (isBinded) {
      return
    }
    var seq = await this.db.incr('id:' + oneToManyPrefix + ':' + oneId)
    await this.db.batch([
      {type: 'put', key: this._bindManyKey(oneToManyPrefix, oneId, seq), value: manyId},
      {type: 'put', key: 'rseq:'+oneToManyPrefix + ':' + oneId + ':' + manyId, value: seq}
    ])
  }

  @trace
  async unbindOneToMany(oneToManyPrefix, oneId, manyId) {
    console.log('unbindOneToMany', oneToManyPrefix, oneId, manyId)
    if (oneId == null || manyId == null) return
    var seq = await this.db.get('rseq:'+oneToManyPrefix + ':' + oneId + ':' + manyId)
    if (!seq) {
      return
    }
    await this.db.batch([
      {type: 'del', key: this._bindManyKey(oneToManyPrefix, oneId, seq)},
      {type: 'del', key: 'rseq:'+oneToManyPrefix + ':' + oneId + ':' + manyId}
    ])
  }

  @trace
  async isBinded(oneToManyPrefix, oneId, manyId) {
    var seq = await this.db.get('rseq:'+oneToManyPrefix + ':' + oneId + ':' + manyId)
    return !!seq
  }

  /**
   * voter_user  post
   *
   */
  @trace
  async bindManyToMany(aToBPrefix, bToAPrefix, aid, bid) {
    console.log('bindManyToMany', aToBPrefix, bToAPrefix, aid, bid)
    if (aid == null || bid == null) return
    await this.bindOneToMany(aToBPrefix, aid, bid)
    await this.bindOneToMany(bToAPrefix, bid, aid)
  }

  @trace
  async unbindManyToMany(aToBPrefix, bToAPrefix, aid, bid) {
    console.log('unbindManyToMany', aToBPrefix, bToAPrefix, aid, bid)
    if (aid == null || bid == null) return
    await this.unbindOneToMany(aToBPrefix, aid, bid)
    await this.unbindOneToMany(bToAPrefix, bid, aid)
  }

  @trace
  async rangeOneToMany (oneToManyPrefix, oneId, opts={}) {
    const opt = {...opts}
    console.log('rangeMany', opt)
    const prefix = oneToManyPrefix + ':' + oneId + ':'
    if (opt.lt == null && opt.lte == null) {
      opt.lte = MAX_NUM
    }
    if (opt.gt == null && opt.gte == null) {
      opt.gte = 0
    }
    if (opt.lt != null) {
      opt.lt = prefix + this.fixNumStr(opt.lt)
    }
    if (opt.gt != null) {
      opt.gt = prefix + this.fixNumStr(opt.gt)
    }
    if (opt.lte != null) {
      opt.lte = prefix + this.fixNumStr(opt.lte)
    }
    if (opt.gte != null) {
      opt.gte = prefix + this.fixNumStr(opt.gte)
    }
    var ids = await this.db.rangeValues(opt)
    return await this.mget(ids)
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
  async generateId(obj) {
    return await this.db.incr('id:'+this.modelName)
  }

  @trace
  async insert(obj) {
    if (obj.id) throw new Error('inserting object has id')
    var id = await this.generateId(obj)
    obj.id = id
    await this.put(id, obj)
    return id
  }

  @trace
  async save(obj) {
    if (!obj.id) {
      await this.insert(obj)
      return obj
    }
    await this.put(obj.id, obj)
    return obj
  }

}

/**
 * comments of post
 * post of user
 */
export class CompositIdEntity extends EntityProvider {
  /**
   * CompositIdEntity(db, 'comment', 'postId')
   *
   * get([xxx, xx])
   *
   */
  constructor(db, modelName, parentField) {
    super(db, modelName)
    this.parentField = parentField
  }

  @trace
  async generateId(obj) {
    var parentId = obj[this.parentField]
    if (!parentId) throw new Error('obj.'+this.parentField + ' is null')
    var id = await this.db.incr('id:'+this.modelName + ':' + parentId)
    return [parentId, id]
  }

  key(id) {
    if (Array.isArray(id)) {
      const parentId = id[0]
      const childId = id[1]
      return this.fixNumStr(parentId) + '-' + this.fixNumStr(childId)
    }
    return id
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
