import { combineReducers } from 'redux'

import entityReducer from './entityReducer'
import authReducer from './authReducer'

export default combineReducers({
  entities: entityReducer,
  auth: authReducer
})
