import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from 'actions/authActions'

const defaultState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
  user: {},
  loggedIn: false
}

export default function listReducer(
  state = defaultState,
  { type, payload, error, meta }
) {
  switch (type) {
    case LOGIN_SUCCESS:
      const { accessToken, idToken, expiresAt, user } = payload
      return {
        ...state,
        accessToken,
        idToken,
        expiresAt,
        user,
        loggedIn: true
      }

    case LOGIN_FAILED:
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        idToken: null,
        expiresAt: null,
        user: {},
        loggedIn: false
      }

    default:
      return { ...state }
  }
}
