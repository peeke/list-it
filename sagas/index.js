import { all, put, takeEvery } from 'redux-saga/effects'
import { createEntity } from 'actions/entityActions'
import { ADD_NEW_ENTITY_TO_LIST, addEntityToList } from 'actions/listActions'

import uuid from 'uuid/v4'

export function* addNewEntityToList({ type, payload, error, meta }) {
  const { entity, listId } = payload
  const entityId = uuid()
  yield put(createEntity(entityId, entity))
  yield put(addEntityToList(listId, entityId))
}

export function* watchAddNewEntityToList() {
  yield takeEvery(ADD_NEW_ENTITY_TO_LIST, addNewEntityToList)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchAddNewEntityToList()])
}
