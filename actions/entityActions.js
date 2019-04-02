import uuid from 'uuid/v4'

export const CREATE_ENTITY = 'CREATE_ENTITY'

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
