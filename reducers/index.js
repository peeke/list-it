import { combineReducers } from 'redux'

import listReducer from './listReducer'
import entityReducer from './entityReducer'
import authReducer from './authReducer'

export default combineReducers({
  lists: listReducer,
  entities: entityReducer,
  auth: authReducer
})
