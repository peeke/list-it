import { combineReducers } from 'redux'

import listReducer from './listReducer'
import entityReducer from './entityReducer'

export default combineReducers({
  lists: listReducer,
  entities: entityReducer
})
