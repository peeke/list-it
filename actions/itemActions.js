export const CREATE_ITEM = 'CREATE_ITEM'

export function createItem(id, item) {
  return {
    type: CREATE_ITEM,
    item,
    id
  }
}
