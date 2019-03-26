import { CREATE_ENTITY } from 'actions/entityActions'

const defaultState = {
  byId: {},
  allIds: []
}

export default function entityReducer(
  state = defaultState,
  { type, payload, error, meta }
) {
  switch (type) {
    case CREATE_ENTITY:
      const entity = {
        ...payload.entity,
        id: payload.id
      }

      const byId = { ...state.byId, [entity.id]: entity }
      const allIds = [...state.allIds, entity.id]
      return { ...state, byId, allIds }

    default:
      return { ...state }
  }
}
