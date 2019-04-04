import uuid from 'uuid/v4'

export const CREATE_ENTITY = 'CREATE_ENTITY'
export const DELETE_ENTITY = 'DELETE_ENTITY'
export const TOGGLE_ENTITY = 'TOGGLE_ENTITY'

export function createEntity(entity, parentId) {
  return {
    type: CREATE_ENTITY,
    payload: {
      entity,
      id: uuid(),
      parentId
    }
  }
}

export function deleteEntity(id) {
  return {
    type: DELETE_ENTITY,
    payload: {
      id
    }
  }
}

export function toggleEntity(id) {
  return {
    type: TOGGLE_ENTITY,
    payload: {
      id
    }
  }
}
