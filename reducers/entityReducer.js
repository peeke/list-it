import { CREATE_ENTITY } from 'actions/entityActions'

const defaultState = {
  byId: {
    0: {
      id: 0,
      parentId: null,
      text: 'Hello!',
      entities: [1]
    },
    1: {
      id: 1,
      parentId: 0,
      text: 'This is your first list',
      entities: []
    }
  },
  allIds: [0, 1],
  rootEntity: 0
}

export default function entityReducer(
  state = defaultState,
  { type, payload, error, meta }
) {
  switch (type) {
    case CREATE_ENTITY:
      const { id, parentId } = payload

      const entity = {
        ...payload.entity,
        id,
        parentId
      }

      const parentEntity = { ...state.byId[parentId] }
      parentEntity.entities = [...parentEntity.entities, id]

      const byId = { ...state.byId, [id]: entity, [parentId]: parentEntity }
      const allIds = [...state.allIds, id]
      return { ...state, byId, allIds }

    default:
      return { ...state }
  }
}
