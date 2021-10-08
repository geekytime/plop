import { EventEmitter } from 'events'
import { deriveObjectName } from '../utils/derive-object-name'

export class Entity extends EventEmitter {
  constructor () {
    super()

    this.manager = null
    this.componentNames = []
    this.tags = []
  }

  addComponent (component, componentName) {
    if (!componentName) {
      componentName = deriveObjectName(component)
    }

    if (component.onCreate) {
      component.onCreate(this)
    }

    this.componentNames.push(componentName)
    this[componentName] = component
    component.componentName = componentName
    this.manager.entityAddComponent(this, component, componentName)
    this.emit('addComponent', { component, componentName })
  }

  removeComponent (componentName) {
    this.manager.entityRemoveComponent(this, componentName)

    const component = this[componentName]
    delete this[componentName]
    const index = this.componentNames.indexOf(componentName)
    this.componentNames.splice(index, 1)
    this.emit('removeComponent', { component, componentName })
  }

  hasComponent (componentName) {
    return this.componentNames.indexOf(componentName) >= 0
  }

  removeAllComponents () {
    for (let i = 0; i < this.componentNames.length; i++) {
      const componentName = this.componentNames[i]
      delete this[componentName]
    }
    this.componentNames = []
    return this.manager.entityRemoveAllComponents(this)
  }

  hasAllComponents = componentNames => {
    return componentNames.every(componentName => {
      // console.log('hasAllComponents', componentNames, componentName)
      return this.hasComponent(componentName)
    })
  }

  hasAnyComponents = componentNames => {
    return componentNames.some(componentName => {
      return this.hasComponent(componentName)
    })
  }

  hasTag (tag) {
    return this.tags.indexOf(tag) >= 0
  }

  hasAnyTags = tags => {
    return tags.some(tag => {
      return this.hasTag(tag)
    })
  }

  hasAllTags = tags => {
    return tags.every(tag => {
      return this.hasTag(tag)
    })
  }

  addTags (...tags) {
    tags.forEach(tag => {
      if (this.hasTag(tag)) {
        return
      }
      this.tags.push(tag)
      this.manager.entityAddTag(this, tag)
    })
  }

  removeTag (tag) {
    this.manager.entityRemoveTag(this, tag)
    const index = this.tags.indexOf(tag)
    this.tags.splice(index, 1)
  }

  remove () {
    return this.manager.removeEntity(this)
  }
}
