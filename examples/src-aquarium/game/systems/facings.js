import { Facing } from '../components/facing.js'

export class Facings {
  init () {
    this.entities = this.game.entities
  }

  update () {
    const facingEntities = this.entities.queryComponents('facing')
    facingEntities.forEach(facingEntity => {
      const { facing, transform } = facingEntity
      if (facing.spriteDir !== facing.dir) {
        if (transform.scale.x > 0) {
          transform.scale.x *= -1
        }
      } else {
        if (transform.scale.x < 0) {
          transform.scale.x *= -1
        }
      }
    })
  }
}
