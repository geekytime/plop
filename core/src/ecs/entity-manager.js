import { Entity } from './entity.js'
import createPool from 'reuse-pool'
import EventEmitter from 'events'

const poolFactory = () => {
  return new Entity()
}

export class EntityManager extends EventEmitter {
  constructor (options) {
    super()
    this.nextId = 0

    this.entitiesById = {}
    this.entitiesByTags = new QueryGroup({
      hasAllFuncName: 'hasAllTags',
      hasAnyFuncName: 'hasAnyTags'
    })
    this.entitiesByComponentNames = new QueryGroup({
      hasAllFuncName: 'hasAllComponents',
      hasAnyFuncName: 'hasAnyComponents'
    })

    this.entityPool = createPool(poolFactory)
    this.groupKeys = new WeakMap()
  }

  createEntity () {
    var entity = this.entityPool.get()
    entity.id = `e_${this.nextId}`
    this.nextId++

    this.entitiesById[entity.id] = entity
    entity.manager = this
    this.emit('createEntity', { entity })
    return entity
  }

  removeAllEntities () {
    const entities = Object.values(this.entitiesById)
    for (var x = entities.length - 1; x >= 0; x--) {
      this.removeEntity(entities[x])
    }
  }

  removeEntity (entity) {
    if (!this.entitiesById[entity.id]) {
      throw new Error('entity not found: ', entity.id)
    }
    this.emit('beforeRemoveEntity', entity)
    this.entityRemoveAllComponents(entity)

    delete this.entitiesById[entity.id]
    this.entitiesByTags.removeItem(entity.id)

    entity.manager = null
    this.entityPool.recycle(entity)
    entity.removeAllListeners()
    this.emit('afterRemoveEntity', entity)
  }

  entityAddTag (entity, tag) {
    this.entitiesByTags.addKeyToItem({
      key: tag,
      item: entity
    })
    this.emit('entityAddTag', { entity, tag })
  }

  entityRemoveTag (entity, tag) {
    this.entitiesByTags.removeKeyFromItem({
      key: tag,
      item: entity
    })
  }

  entityAddComponent (entity, component, componentName) {
    this.entitiesByComponentNames.addKeyToItem({
      key: componentName,
      item: entity
    })
    // console.log(this.entitiesByComponentNames)
    this.emit('entityAddComponent', { entity, component, componentName })
  }

  entityRemoveComponent (entity, componentName) {
    this.entitiesByComponentNames.removeKeyFromItem({
      key: componentName,
      item: entity
    })
    this.emit('entityRemoveComponent', entity, { componentName })
  }

  entityRemoveAllComponents (entity) {
    for (let i = entity.componentNames.length - 1; i >= 0; i--) {
      const componentName = entity.componentNames[i]
      entity.removeComponent(componentName)
    }
  }

  queryComponents (...componentNames) {
    return this.entitiesByComponentNames.query(componentNames)
  }

  queryTags (...tags) {
    return this.entitiesByTags.query(tags)
  }

  count () {
    return Object.keys(this.entitiesById).length
  }
}

class QueryGroup {
  constructor ({
    idProp = 'id',
    hasAllFuncName = 'hasAllKeys',
    hasAnyFuncName = 'hasAnyKeys'
  } = {}) {
    this.queryIdCache = new WeakMap()
    this.queries = {}
    this.allItems = {}

    this.idProp = idProp
    this.hasAllFuncName = hasAllFuncName
    this.hasAnyFuncName = hasAnyFuncName
  }

  query (keys) {
    const queryId = this.getQueryId(keys)
    if (!this.queries[queryId]) {
      const query = this.createQuery(queryId, keys)
    }

    // console.log('query', keys, queryId, this.queries[queryId])
    return this.queries[queryId].items
  }

  getQueryId (keys) {
    const queryId = this.queryIdCache.get(keys)
    if (queryId) {
      return queryId
    }

    const newQueryId = keys.sort().join('-')
    this.queryIdCache.set(keys, newQueryId)
    return newQueryId
  }

  createQuery (queryId, keys) {
    const itemsForKeys = this.testAll(keys)
    // console.log('createQuery', queryId, keys, itemsForKeys)
    const query = new Query(queryId, keys, itemsForKeys)
    this.queries[queryId] = query
    return query
  }

  testAll (keys) {
    const matches = []
    // console.log('testAll', this.allItems)
    for (let itemId in this.allItems) {
      const item = this.allItems[itemId]
      const hasAllFunc = item[this.hasAllFuncName]
      // console.log('hasAllFunc', hasAllFunc, keys)
      const itemHasAllKeys = hasAllFunc(keys)
      // console.log('itemHasAllKeys', itemHasAllKeys)
      if (itemHasAllKeys) {
        matches.push(item)
      }
    }
    return matches
  }

  addKeyToItem ({ key, item }) {
    // console.log('addKeyToItem', item.id, key)
    const itemId = item[this.idProp]
    if (!this.allItems[itemId]) {
      this.allItems[itemId] = item
    }
    for (let queryId in this.queries) {
      const query = this.queries[queryId]

      const queryContainsKey = query.keys.indexOf(key) >= 0
      // console.log('queryContainsKey', queryContainsKey)
      if (!queryContainsKey) {
        continue
      }

      const hasAllFunc = item[this.hasAllFuncName]
      const itemHasAllKeys = hasAllFunc(query.keys)
      // console.log('itemHasAllKeys', itemHasAllKeys)
      if (!itemHasAllKeys) {
        continue
      }

      const alreadyInQuery = query.items.find(itemInList => {
        return itemInList[this.idProp] === itemId
      })
      // console.log('alreadyInQuery', alreadyInQuery)
      if (alreadyInQuery) {
        continue
      }

      query.items.push(item)
    }
  }

  removeItem (itemId) {
    delete this.allItems[itemId]

    for (let queryId in this.queries) {
      const query = this.queries[queryId]
      for (let i = query.items.length - 1; i >= 0; i--) {
        const item = query.items[i]
        if (item.id === itemId) {
          query.items.splice(i, 1)
        }
      }
    }
  }

  removeKeyFromItem ({ key, item }) {
    for (let queryId in this.queries) {
      var query = this.queries[queryId]

      const queryContainsKey = query.keys.indexOf(key) >= 0
      // console.log('removeKeyFromItem', key, query.keys, queryContainsKey)
      if (!queryContainsKey) {
        continue
      }

      const hasAnyFunc = item[this.hasAnyFuncName]
      // console.log(item)
      const itemHasKey = hasAnyFunc([key])
      // console.log({ itemHasKey })
      if (!itemHasKey) {
        continue
      }

      var index = query.items.indexOf(item)
      if (~index) {
        query.items.splice(index, 1)
      }
    }
  }
}

class Query {
  constructor (queryId, keys = [], items = []) {
    this.id = queryId
    this.keys = keys
    this.items = items
  }
}
