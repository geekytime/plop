import { Bobber } from '../components/bobber.js'
import { Transform } from '@plop/core'
import randomFloat from 'random-float'

export class Bobbers {
  init () {
    this.entities = this.game.entities
  }

  update () {
    const bobberEntities = this.entities.queryComponents('bobber', 'transform')
    for (let i = 0; i < bobberEntities.length; i++) {
      this.updateOne(bobberEntities[i])
    }
  }

  updateOne (bobberEntity) {
    const { bobber, transform, body } = bobberEntity
    const child = transform.children[0]

    if (!bobber.direction) {
      bobber.direction = {
        x: randomFloat(-bobber.speed, bobber.speed),
        y: randomFloat(-bobber.speed, bobber.speed)
      }
    }

    const x = child.position.x + bobber.direction.x
    const y = child.position.y + bobber.direction.y

    if (Math.abs(x) > bobber.range.x) {
      bobber.direction.x = randomFloat(-bobber.speed, bobber.speed)
    }

    if (Math.abs(y) > bobber.range.y) {
      bobber.direction.y = randomFloat(-bobber.speed, bobber.speed)
    }

    child.position.set(x, y)
  }
}
