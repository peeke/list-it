export const AUTHORIZE = 'AUTHORIZE'
export const REAUTHORIZE = 'REAUTHORIZE'
export const AUTHORIZE_CALLBACK = 'AUTHORIZE_CALLBACK'
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

export function authorize(redirect) {
  return {
    type: AUTHORIZE,
    payload: { redirect }
  }
}

export function reauthorize() {
  return {
    type: REAUTHORIZE,
    payload: {}
  }
}

export function authorizeCallback(hash) {
  return {
    type: AUTHORIZE_CALLBACK,
    payload: {
      hash
    }
  }
}

export function login(authResult) {
  return {
    type: LOGIN,
    payload: {
      authResult
    }
  }
}

export function loginSuccess(accessToken, idToken, expiresAt, user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      accessToken,
      idToken,
      expiresAt,
      user
    }
  }
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
