import { Body } from '../components/body.js'

export class Physics {
  init () {
    this.entities = this.game.entities
    this.bodyEntities = []
    this.entities.on('entityAddComponent', this.checkForBodies)
  }

  checkForBodies = ({ entity, componentName }) => {
    if (componentName === 'body') {
      this.bodyEntities.push(entity)
    }
  }

  update () {
    const bodyEntities = this.bodyEntities
    for (let i = 0; i < bodyEntities.length; i++) {
      this.updateOne(bodyEntities[i])
    }
  }

  updateOne (bodyEntity) {
    const { body, transform } = bodyEntity
    if (body.enabled) {
      const deltaX = body.velocity.x
      const deltaY = body.velocity.y
      transform.position.x = transform.position.x + deltaX
      transform.position.y = transform.position.y + deltaY
    }
  }
}
