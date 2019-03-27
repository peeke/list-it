import uuid from 'uuid/v4'

import {
  LOGIN,
  LOGIN_CALLBACK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from 'actions/authActions'

const defaultState = {
  profile: {},
  accessToken: null,
  expiresAt: null,
  loggedIn: false
}

export default function listReducer(
  state = defaultState,
  { type, payload, error, meta }
) {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        loggedIn: true
      }

    case LOGIN_FAILED:
    case LOGOUT:
      return {
        ...state,
        profile: {},
        accessToken: null,
        expiresAt: null,
        loggedIn: false
      }

    default:
      return { ...state }
  }
}
