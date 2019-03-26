import { getEntities } from 'selectors/entitySelectors'

export const getListById = (lists, id) => {
  return { ...lists.byId[id] }
}

export const getAllLists = lists => {
  return lists.allIds.map(id => getListById(lists, id))
}

export const populateList = (list, entities) => {
  return {
    ...list,
    entities: getEntities(entities, list.entities)
  }
}

export const getAllListsPopulated = (lists, entities) => {
  return getAllLists(lists).map(list => populateList(list, entities))
}
