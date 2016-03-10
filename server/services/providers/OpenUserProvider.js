import {trace} from '../../commons/decorators'
import {EntityProvider} from './provider'

const OPENID_TO_UID = 'oid_to_uid:'

export default class OpenUserProvider extends EntityProvider {
  constructor(db, userProvider) {
    super(db, 'openuser')
    this.userProvider = userProvider
  }

  @trace
  async getOrCreateUser(site, profile, props) {
    const openId = OpenUserProvider.getOpenId(site, profile)
    var userId = await this.getUserIdByOpenId(openId)
    var user = userId && await this.userProvider.get(userId)
    if (!user) {
      // generate user
      user = OpenUserProvider.makeUserInfo(site, profile, props)
      userId = await this.userProvider.insert(user)
      await this.bindOpenIdToUserId(openId, userId)
      await this.put(openId, {
        site: site,
        profile: profile
      })
    }
    return user
  }

  @trace
  async bindUser(site, profile, userId) {
    const openId = OpenUserProvider.getOpenId(site, profile)
    await this.bindOpenIdToUserId(openId, userId)
  }

  @trace
  async getUserIdByOpenId(openId) {
    return await this.db.get(OPENID_TO_UID + openId)
  }

  @trace
  async bindOpenIdToUserId(openId, userId) {
    return await this.db.put(OPENID_TO_UID + openId, userId)
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
