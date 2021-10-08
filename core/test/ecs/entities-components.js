import { EntityManager } from '../../src/ecs/entity-manager.js'

var test = require('tape')

test('Adding and removing entities', function (t) {
  var entities = new EntityManager()

  t.strictEqual(entities.count(), 0)
  var e1 = entities.createEntity()
  t.strictEqual(entities.count(), 1)
  var e2 = entities.createEntity()
  t.strictEqual(entities.count(), 2)
  entities.removeEntity(e1)
  t.strictEqual(entities.count(), 1)
  entities.removeEntity(e2)
  t.strictEqual(entities.count(), 0)
  t.end()
})

test('Adding components to entity and querying', function (t) {
  var entities = new EntityManager()
  function C () {}
  function D () {}
  function E (foo, bar) {
    this.foo = foo
    this.bar = bar
  }

  var entity = entities.createEntity()

  entity.addComponent(new C())
  t.ok(entity.c instanceof C, 'c added')
  t.deepEqual(entities.queryComponents('c'), [entity], 'found c')

  entity.addComponent(new C(), 'see')
  t.ok(entity.see instanceof C, 'see added')
  t.deepEqual(entities.queryComponents('see'), [entity], 'found see')

  entity.addComponent(new D(), 'd')
  t.ok(entity.d instanceof D, 'd added')
  t.deepEqual(entities.queryComponents('d'), [entity], 'found d')

  entity.addComponent(new E('foo', 'bar'))
  t.ok(entity.e instanceof E, 'e added')
  t.equals(entity.e.foo, 'foo', 'e.foo')
  t.equals(entity.e.bar, 'bar', 'e.bar')
  t.deepEqual(entities.queryComponents('e'), [entity], 'did find e')

  entity.removeComponent('see')
  t.ok(entity.see === undefined, 'see removed')
  t.ok(entity.c instanceof C, 'c is still there')
  t.deepEqual(entities.queryComponents('c'), [entity], 'found c')
  t.deepEqual(entities.queryComponents('c', 'd'), [entity], 'found c,d')
  t.deepEqual(entities.queryComponents('c', 'see'), [], 'did not find see')
  t.deepEqual(entities.queryComponents('e'), [entity], 'did find e')

  entity.removeComponent('d')
  t.deepEqual(entities.queryComponents('c'), [entity], 'found c')
  t.deepEqual(entities.queryComponents('c', 'd'), [], 'did not find c,d')
  t.deepEqual(entities.queryComponents('d'), [], 'did not find d')

  entity.removeComponent('c')
  t.deepEqual(entities.queryComponents('c'), [], 'did not find c')
  t.deepEqual(entities.queryComponents('d'), [], 'did not find d')
  t.deepEqual(entities.queryComponents('see'), [], 'did not find see')
  t.deepEqual(entities.queryComponents('e'), [entity], 'did find e')
  t.end()
})

test('Throw on incorrect entity removal', function (t) {
  var entities = new EntityManager()
  var e1 = entities.createEntity()
  entities.removeEntity(e1)
  t.throws(function () {
    entities.removeEntity(e1)
  })
  t.end()
})
