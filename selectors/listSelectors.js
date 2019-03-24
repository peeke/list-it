import { getItems } from 'selectors/itemSelectors'

export const getListById = (state, id) => {
  const list = state.lists.byId[id]
  return {
    ...list,
    items: getItems(state.items, list.items)
  }
}
