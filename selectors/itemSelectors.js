export const getItems = (items, ids) => {
  return ids.map(id => items.byId[id])
}
