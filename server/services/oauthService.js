import social from './social'

export default exports

export function getProfile(platform, access_token) {
  console.log('oauthService.getProfile')
  if (social[platform]) {
    return social[platform].getProfile(access_token)
  }
  return Promise.reject(new Error('no such platform:'+platform))
}
