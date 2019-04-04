import {
  CREATE_ENTITY,
  DELETE_ENTITY,
  DELETE_ENTITY_AND_CHILDREN,
  TOGGLE_ENTITY
} from 'actions/entityActions'

import notEqualTo from 'util/notEqualTo'

const defaultState = {
  byId: {
    0: {
      id: 0,
      parentId: null,
      expanded: true,
      text: 'Hello!',
      entities: [1, 3]
    },
    1: {
      id: 1,
      parentId: 0,
      expanded: true,
      text: 'This is your first list',
      entities: [2]
    },
    2: {
      id: 2,
      parentId: 1,
      text: 'This is a sublist',
      entities: []
    },
    3: {
      id: 3,
      parentId: 0,
      expanded: true,
      text: 'Another one',
      entities: [4]
    },
    4: {
      id: 4,
      parentId: 3,
      text: 'Sub',
      entities: []
    }
  },
  allIds: [0, 1, 2, 3, 4],
  rootEntity: 0
}

export default function entityReducer(
  state = defaultState,
  { type, payload, error, meta }
) {
  switch (type) {
    case CREATE_ENTITY: {
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
    }

    case DELETE_ENTITY: {
      const { id } = payload

      const byId = { ...state.byId }
      delete byId[id]

      for (const key of Object.keys(byId)) {
        byId[key].entities = byId[key].entities.filter(notEqualTo(id))
      }

      const allIds = state.allIds.filter(notEqualTo(id))

      return { ...state, byId, allIds }
    }

    case TOGGLE_ENTITY: {
      const { id } = payload
      const entity = {
        ...state.byId[id],
        expanded: !state.byId[id].expanded
      }
      const byId = { ...state.byId, [id]: entity }
      return { ...state, byId }
    }

    default:
      return { ...state }
  }
}
