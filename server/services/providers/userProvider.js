import {trace} from '../../commons/decorators'
import {EntityProvider} from './provider'

export default class UserProvider extends EntityProvider {
  constructor(db) {
    super(db, 'user')
  }

  @trace
  async getDisplayUser(userId) {
    const user = await this.get(userId)
    return {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl
    }
  }
}
