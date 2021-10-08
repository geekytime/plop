import test from 'tape'
import { EntityManager } from '../../src/ecs/entity-manager.js'

test('Add and remove tags', function (t) {
  var entities = new EntityManager()
  var e1 = entities.createEntity()
  var e2 = entities.createEntity()

  e1.addTags('t1', 't2')
  t.deepEqual(e1.tags, ['t1', 't2'])
  t.deepEqual(entities.queryTags('t1'), [e1])
  t.deepEqual(entities.queryTags('t2'), entities.queryTags('t1'))

  e2.addTags('t1')
  t.deepEqual(entities.queryTags('t1'), [e1, e2])
  t.deepEqual(entities.queryTags('t2'), [e1])

  e1.removeTag('t1')
  t.deepEqual(e1.tags, ['t2'])
  t.deepEqual(entities.queryTags('t1'), [e2])

  e2.removeTag('t1')
  t.deepEqual(e2.tags, [])
  t.deepEqual(entities.queryTags('t1'), [])
  t.end()
})

test('Adding and removing entities with tags', function (t) {
  var entities = new EntityManager()

  var e1 = entities.createEntity()
  var e2 = entities.createEntity()

  e1.addTags('t1', 't2')
  e2.addTags('t2')

  t.deepEqual(entities.queryTags('t1'), [e1])
  t.deepEqual(entities.queryTags('t2'), [e1, e2])
  entities.removeEntity(e1)
  t.deepEqual(entities.queryTags('t1'), [])
  t.deepEqual(entities.queryTags('t2'), [e2])
  t.end()
})

test('Lots of entities with tags', function (t) {
  var m = new EntityManager()

  for (var x = 0; x < 20; x++) {
    m.createEntity().addTags('a', 'b', 'c')
  }

  var tagged = m.queryTags('a')
  t.equal(tagged.length, 20)

  const entity = tagged[0]
  entity.removeTag('a')

  t.equal(m.queryTags('a').length, 19)
  t.equal(m.queryTags('b').length, 20)
  t.equal(m.queryTags('c').length, 20)
  t.end()
})
