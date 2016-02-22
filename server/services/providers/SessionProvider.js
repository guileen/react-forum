import crypto from 'crypto'
import {trace} from '../../commons/decorators'
import Provider from './provider'

export default class SidProvider extends Provider {
  constructor(db, userProvider) {
    super(db, 'sid', 'string')
    this.userProvider = userProvider
  }

  @trace
  async getUser(id) {
    const uid = await this.get(id)
    return await this.userProvider.get(uid)
  }

  /**
   * @param userId
   * @return sid
   */
  @trace
  async bindUser(userId) {
    const sid = crypto.randomBytes(16).toString('hex')
    await this.put(sid, userId)
    return sid
  }
}
