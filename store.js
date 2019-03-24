import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

import rootReducer from './reducers'

export function initializeStore(preloadedState) {
  const middlewares = process.env.NODE_ENV === 'production' ? [] : [logger]

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  )

  return store
}
