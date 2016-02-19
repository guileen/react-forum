import Promise from 'bluebird'
import Github from 'github-api'

export const getProfile = (access_token) => {
  console.log('github.getProfile')
  var github = new Github({
    token: access_token,
    auth: 'oauth'
  })
  var user = github.getUser()
  return Promise.promisify(user.show, {context: user})(null)
}
