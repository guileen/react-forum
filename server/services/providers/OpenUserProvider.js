import {trace} from '../../commons/decorators'
import {EntityProvider} from './provider'

export default class OpenUserProvider extends EntityProvider {
  constructor(db, userProvider) {
    super(db, 'openuser')
    this.userProvider = userProvider
  }

  @trace
  async bindUser(site, profile, userId) {
    const id = OpenUserProvider.getOpenId(site, profile)
    const openuser = await this.get(id)
    const oldUserId = openuser && openuser.userId
    if (oldUserId === userId) return
    var oldUser = oldUserId && await this.userProvider.get(oldUserId)
    if (oldUser) throw new Error(`User is already bind by user: ${oldUserId} name: ${oldUser.name}`)
    var user = this.userProvider.get(userId)
    if (!user) throw new Error(`User ${userId} is not exists`)
    await this.save({
      id: id,
      userId: userId,
      site: site,
      profile: profile
    })
    await this.bindOneToMany('user_openusers', userId, id)
  }

  @trace
  async getOrCreateUser(site, profile, props) {
    const id = OpenUserProvider.getOpenId(site, profile)
    const openuser = await this.get(id)
    var userId = openuser && openuser.userId
    var user = userId && await this.userProvider.get(userId)
    if (!user) {
      // generate user
      user = OpenUserProvider.makeUserInfo(site, profile, props)
      userId = await this.userProvider.insert(user)
      await this.save({
        id: id,
        userId: userId,
        site: site,
        profile: profile
      })
      await this.bindOneToMany('user_openusers', userId, id)
    }
    return user
  }

  @trace
  async del(id) {
    var openuser = await this.get(id)
    await super.del(id)
    await this.unbindOneToMany('user_openusers', openuser.userId, id)
  }

  @trace
  async getOpenUsersByUserId(userId) {
    return this.rangeOneToMany('user_openusers', userId)
  }

  static getOpenId(site, profile) {
    return site + ':' + profile.id
  }

  static makeUserInfo(site, profile, props={}) {
    profile.site = site
    switch (site) {
      case 'github':
        return Object.assign({
          name: profile.name,
          avatarUrl: profile.avatar_url,
          type: 'site',
          site: site
        }, props)
      default:
        throw new Error('unsupport site:' + site)
    }
  }
}
