export const CREATE_LIST_ITEM = 'CREATE_LIST_ITEM'
export const ADD_LIST_ITEM = 'ADD_LIST_ITEM'
export const ADD_LIST = 'ADD_LIST'

export function createListItem(listId, item) {
  return {
    type: CREATE_LIST_ITEM,
    listId,
    item
  }
}

export function addListItem(listId, id) {
  return {
    type: ADD_LIST_ITEM,
    listId,
    id
  }
}

export function addList(title) {
  return {
    type: ADD_LIST,
    title
  }
}
