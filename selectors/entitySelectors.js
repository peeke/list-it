export const getEntityById = (entities, id) => {
  return { ...entities.byId[id] }
}

export const getEntities = (entities, ids) => {
  return ids.map(id => getEntityById(entities, id))
}

export const populateEntity = (entity, entities) => {
  return {
    ...entity,
    entities: getEntities(entities, entity.entities)
  }
}
