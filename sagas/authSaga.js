import { all, put, call, take, fork } from 'redux-saga/effects'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'

import auth from 'services/authService'

import {
  AUTHORIZE,
  AUTHORIZE_CALLBACK,
  REAUTHORIZE,
  LOGIN,
  LOGOUT,
  login,
  loginSuccess,
  loginFailed
} from 'actions/authActions'

function* authorizeFlow() {
  const action = yield take(AUTHORIZE)
  yield call(
    [window.localStorage, window.localStorage.setItem],
    'loginRedirect',
    action.payload.redirect
  )

  yield call(auth.authorize)
}

function* authorizeCallbackFlow() {
  const action = yield take(AUTHORIZE_CALLBACK)
  const authResult = yield call(auth.handleAuthentication, action.payload.hash)
  yield put(login(authResult))
}

function* reAuthorizeFlow() {
  while (true) {
    yield take(REAUTHORIZE)

    try {
      const authResult = yield call(auth.renewSession)
      yield put(login(authResult))
    } catch (error) {
      console.error(error)
    }
  }
}

function* authenticateFlow() {
  while (true) {
    try {
      const loginAction = yield take(LOGIN)
      const { accessToken, idToken, expiresAt } = loginAction.payload.authResult
      const user = yield call(jwtDecode, idToken)

      yield put(loginSuccess(accessToken, idToken, expiresAt, user))

      const redirect = yield call(
        [window.localStorage, window.localStorage.getItem],
        'loginRedirect'
      )

      if (redirect) {
        yield call([Router, Router.replace], redirect)
      }

      yield take(LOGOUT)
      yield call(auth.logout)
    } catch (error) {
      console.error(error)
      yield put(loginFailed(error))
    }
  }
}

export default function* authSaga() {
  yield all([
    authorizeFlow(),
    authorizeCallbackFlow(),
    reAuthorizeFlow(),
    authenticateFlow()
  ])
}
