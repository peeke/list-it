import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import rootReducer from './reducers'

export function initializeStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares =
    process.env.NODE_ENV === 'production'
      ? [sagaMiddleware]
      : [sagaMiddleware, logger]

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  )

  sagaMiddleware.run(rootSaga)

  return store
}
