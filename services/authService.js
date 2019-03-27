import auth0 from 'auth0-js'

const auth0WebAuth = new auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  redirectUri: process.env.DOMAIN + '/callback',
  responseType: 'token id_token',
  scope: 'openid profile'
})

export const authorize = () => {
  auth0WebAuth.authorize()
}

export const handleAuthentication = hash => {
  return new Promise(resolve => {
    auth0WebAuth.parseHash({ hash }, (error, authResult) => {
      if (error) throw error
      authResult.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
      resolve(authResult)
    })
  })
}

export const isAuthenticated = authResult => {
  return new Date().getTime() < authResult.expiresAt
}

export const renewSession = () => {
  return new Promise(resolve => {
    auth0WebAuth.checkSession({}, (error, authResult) => {
      if (error) throw error
      authResult.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
      resolve(authResult)
    })
  })
}

export const getProfile = accessToken => {
  return new Promise(resolve => {
    auth0WebAuth.client.userInfo(accessToken, (error, profile) => {
      if (error) throw error
      resolve(profile)
    })
  })
}
