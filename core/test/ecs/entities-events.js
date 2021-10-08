import test from 'tape'
import { Entity } from '../../src/ecs/entity'
import { EntityManager } from '../../src/ecs/entity-manager.js'

test('createEntity', function (t) {
  t.plan(1)
  var m = new EntityManager()

  m.on('createEntity', ({ entity }) => {
    t.ok(entity instanceof Entity)
  })
  m.createEntity()

  t.end()
})

test('Entity remove', function (t) {
  var m = new EntityManager()

  m.createEntity().remove()

  t.end()
})

test('add/remove components', function (t) {
  t.plan(8)
  function C () {}

  var m = new EntityManager()

  var entity = m.createEntity()

  entity.on('addComponent', function ({ component, componentName }) {
    t.equal(entity.manager, m)
    t.ok(component instanceof C)
    t.equal(m.count(), 1)
    t.equal(componentName, 'c')
  })

  entity.on('removeComponent', function ({ component, componentName }) {
    t.pass('made it')
    t.equal(entity.manager, m)
    t.ok(component instanceof C)
    t.equal(componentName, 'c')
  })

  entity.addComponent(new C())
  entity.removeComponent('c')
  t.end()
})

test('EventEmitters should be cleared when entities are recycled', function (t) {
  t.plan(2)
  function C () {}

  var m = new EntityManager()

  var entity = m.createEntity()

  entity.on('addComponent', function ({ component, componentName }) {
    t.ok('callback hit only once')
  })

  entity.addComponent(new C())

  entity.remove()

  var entity2 = m.createEntity()

  t.equals(entity, entity2, 'entity was recycled')

  entity2.addComponent(new C())

  t.end()
})
