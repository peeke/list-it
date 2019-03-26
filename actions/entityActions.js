export const CREATE_ENTITY = 'CREATE_ENTITY'

export function createEntity(id, entity) {
  return {
    type: CREATE_ENTITY,
    payload: {
      entity,
      id
    }
  }
}
