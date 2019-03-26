export const CREATE_LIST = 'CREATE_LIST'
export const ADD_ENTITY_TO_LIST = 'ADD_ENTITY_TO_LIST'
export const ADD_NEW_ENTITY_TO_LIST = 'ADD_NEW_ENTITY_TO_LIST'

export function addNewEntityToList(listId, entity) {
  return {
    type: ADD_NEW_ENTITY_TO_LIST,
    payload: {
      listId,
      entity
    }
  }
}

export function addEntityToList(listId, entityId) {
  return {
    type: ADD_ENTITY_TO_LIST,
    payload: {
      listId,
      entityId
    }
  }
}

export function createList(title) {
  return {
    type: CREATE_LIST,
    payload: {
      title
    }
  }
}
