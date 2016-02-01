module.exports = {
  baseUrl: 'http://localhost:3000',
  db: __dirname + './db/main',
  redis: {
    host: 'localhost',
    port: 6379
  },
  oauth2: {
    github: {
      clientID: '892b3b191b291a5c6e70',
      clientSecret: '6b63d69d43d85779a85cd01a1402d7fe5c51c400',
      site: 'https://github.com/login',
      tokenPath: '/oauth/access_token',
      authorizationPath: '/oauth/authorize',
      redirectUri: '/oauth2-callback/github',
      scope: 'user:email,notifications',
      state: '1234' // secret state
    }
  }
}
