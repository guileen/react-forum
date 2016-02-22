import social from './social'
import {openUserProvider} from './providers'

export default exports

export function getProfile(site, access_token) {
  console.log('oauthService.getProfile')
  if (social[site]) {
    return social[site].getProfile(access_token)
  }
  return Promise.reject(new Error('no support site:'+site))
}

export async function getOrCreateUser(site, access_token) {
  var profile = await getProfile(site, access_token)
  return await openUserProvider.getOrCreateUser(site, profile)
}
