import auth0 from 'auth0-js'

const auth0WebAuth = new auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  redirectUri: process.env.DOMAIN + '/callback',
  responseType: 'token id_token',
  scope: 'openid profile email'
})

export default {
  authorize() {
    auth0WebAuth.authorize()
  },

  handleAuthentication(hash) {
    return new Promise(resolve => {
      auth0WebAuth.parseHash({ hash }, (error, authResult) => {
        if (error) throw error
        authResult.expiresAt =
          authResult.expiresIn * 1000 + new Date().getTime()
        localStorage.setItem('loggedIn', 'true')
        resolve(authResult)
      })
    })
  },

  isAuthenticated(authResult) {
    return (
      localStorage.getItem('loggedIn') === 'true' &&
      new Date().getTime() < authResult.expiresAt
    )
  },

  renewSession() {
    return new Promise(resolve => {
      auth0WebAuth.checkSession({}, (error, authResult) => {
        if (error) {
          console.error(error)
          throw error
        }
        authResult.expiresAt =
          authResult.expiresIn * 1000 + new Date().getTime()
        localStorage.setItem('loggedIn', 'true')
        resolve(authResult)
      })
    })
  },

  logout() {
    auth0WebAuth.logout({
      returnTo: process.env.DOMAIN + '/'
    })
    localStorage.removeItem('loggedIn')
  },

  getProfile(accessToken) {
    return new Promise(resolve => {
      auth0WebAuth.client.userInfo(accessToken, (error, profile) => {
        if (error) throw error
        resolve(profile)
      })
    })
  }
}
