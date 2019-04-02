import uuid from 'uuid/v4'

import { ADD_ENTITY_TO_LIST, CREATE_LIST } from 'actions/listActions'

const defaultState = {
  byId: {
    0: {
      id: 0,
      title: 'Your lists',
      entities: [0]
    }
  },
  allIds: [0]
}

export default function listReducer(
  state = defaultState,
  { type, payload, error, meta }
) {
  switch (type) {
    case CREATE_LIST: {
      const list = {
        ...payload,
        id: uuid(),
        entities: []
      }

      const byId = { ...state.byId, [list.id]: list }
      const allIds = [...state.allIds, list.id]
      return { ...state, byId, allIds }
    }

    case ADD_ENTITY_TO_LIST: {
      const { listId, entityId } = payload
      const byId = { ...state.byId }
      byId[listId].entities = [...byId[listId].entities, entityId]

      return { ...state, byId }
    }

    default:
      return { ...state }
  }
}
