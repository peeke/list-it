import { all, put, call, takeEvery, take } from 'redux-saga/effects'
import Router from 'next/router'

import {
  authorize,
  handleAuthentication,
  isAuthenticated,
  renewSession,
  getProfile
} from 'services/authService'

import {
  LOGIN,
  LOGIN_CALLBACK,
  LOGOUT,
  login,
  loginCallback,
  loginSuccess,
  loginFailed,
  logout
} from 'actions/authActions'

function* initLoginFlow() {
  yield take(LOGIN)
  authorize()
}

function* loginFlow() {
  const loginCallbackAction = yield take(LOGIN_CALLBACK)
  const { hash, redirect } = loginCallbackAction.payload

  try {
    const { accessToken, expiresAt } = yield call(handleAuthentication, hash)
    const profile = yield getProfile(accessToken)
    window.localStorage.setItem('loggedIn', 'true')

    yield put(loginSuccess(accessToken, expiresAt, profile))
    Router.replace(redirect)

    yield take(LOGOUT)
  } catch (error) {
    yield put(loginFailed(error))
  }

  window.localStorage.removeItem('loggedIn')
  Router.replace(redirect)
}

export default function* authSaga() {
  yield all([initLoginFlow(), loginFlow()])
}
