import uuid from 'uuid/v4'

import { ADD_LIST_ITEM, ADD_LIST } from 'actions/listActions'

const defaultState = {
  byId: {
    0: {
      id: 0,
      title: 'Your first list',
      items: []
    }
  },
  allIds: [0]
}

export default function listReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_LIST_ITEM: {
      const { listId, id } = action
      const byId = { ...state.byId }
      const allIds = [...state.allIds]

      byId[listId].items = [...byId[listId].items, id]

      return {
        ...state,
        byId,
        allIds
      }
    }
    case ADD_LIST: {
      const { title } = action
      const list = {
        id: uuid(),
        title,
        items: []
      }

      const byId = { ...state.byId, [list.id]: list }
      const allIds = [...state.allIds, list.id]
      return {
        ...state,
        byId,
        allIds
      }
    }
    default:
      return { ...state }
  }
}
