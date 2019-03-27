export const LOGIN = 'LOGIN'
export const LOGIN_CALLBACK = 'LOGIN_CALLBACK'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

export function login() {
  return {
    type: LOGIN,
    payload: {}
  }
}

export function loginCallback(hash, redirect) {
  return {
    type: LOGIN_CALLBACK,
    payload: {
      hash,
      redirect
    }
  }
}

export function loginSuccess(accessToken, expiresAt, profile) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      accessToken,
      expiresAt,
      profile
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
