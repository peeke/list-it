import { all, put, takeEvery } from 'redux-saga/effects'
import { createItem } from 'actions/itemActions'
import { CREATE_LIST_ITEM, addListItem } from 'actions/listActions'

import uuid from 'uuid/v4'

export function* createListItem(action) {
  const id = uuid()
  yield put(createItem(id, action.item))
  yield put(addListItem(action.listId, id))
}

export function* watchCreateListItem() {
  yield takeEvery(CREATE_LIST_ITEM, createListItem)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchCreateListItem()])
}
