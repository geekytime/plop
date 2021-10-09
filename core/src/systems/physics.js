import { Bounds } from '@pixi/display'
import { Body } from '../components/body.js'

const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max)
}

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
      const deltaX = this.applyFriction(body, 'x')
      const deltaY = this.applyFriction(body, 'y')
      transform.position.x = transform.position.x + deltaX
      transform.position.y = transform.position.y + deltaY
      body.velocity.x = deltaX
      body.velocity.y = deltaY
    }
  }

  applyFriction (body, dir) {
    if (body.velocity[dir] < 0) {
      return Math.min(body.velocity[dir] + body.friction[dir], 0)
    } else if (body.velocity[dir] > 0) {
      return Math.max(body.velocity[dir] - body.friction[dir], 0)
    }
    return 0
  }

  applyForce (body, vec) {
    const newX = body.velocity.x + vec.x
    const newY = body.velocity.y + vec.y
    body.velocity.x = clamp(newX, -body.maxVelocity.x, body.maxVelocity.x)
    body.velocity.y = clamp(newY, -body.maxVelocity.y, body.maxVelocity.y)
  }
}
