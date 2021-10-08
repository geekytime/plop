import randomFloat from 'random-float'
import randomInt from 'random-int'
import { VaryAnimSpeed } from '../components/vary-anim-speed'

export class VaryAnimSpeeds {
  update () {
    const { entities } = this.game
    const animSpeedEntities = entities.queryComponents('varyAnimSpeed')
    animSpeedEntities.forEach(entity => {
      const { animatedSprite, varyAnimSpeed } = entity
      const chance = randomInt(0, 100)
      if (chance < varyAnimSpeed.chance) {
        animatedSprite.animationSpeed = randomFloat(
          varyAnimSpeed.min,
          varyAnimSpeed.max
        )
      }
    })
  }
}
