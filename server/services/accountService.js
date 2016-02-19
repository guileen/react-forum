import {getOAuthUser} from './oauthService'
import {userProvider} from './providers'

export function getUserByOAuth(platform, token) {
  let profile = getOAuthUser(platform, token)
  console.log(profile)
}
