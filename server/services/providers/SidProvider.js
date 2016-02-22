import Provider from './provider'

export default class SidProvider extends Provider {
  constructor(db, userProvider) {
    super(db, 'sid', 'string')
    this.userProvider = userProvider
  }

  async getUser(id) {
    const uid = await this.get(id)
    return await this.userProvider.get(uid)
  }
}
