import { CREATE_ITEM } from 'actions/itemActions'

const defaultState = {
  byId: {},
  allIds: []
}

export default function listReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_ITEM:
      const item = {
        ...action.item
      }
      const byId = { ...state.byId, [item.id]: item }
      const allIds = [...state.allIds, item.id]
      return {
        ...state,
        byId,
        allIds
      }
    default:
      return { ...state }
  }
}
