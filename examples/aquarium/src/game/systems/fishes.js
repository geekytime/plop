import { AnimatedSprite } from '../components/animated-sprite.js'
import { Bobber } from '../components/bobber.js'
import { Facing } from '../components/facing.js'
import { Fish } from '../components/fish.js'
import { Transform } from '@plop/core'
import { TweenMover } from '../components/tween-mover.js'
import { VaryAnimSpeed } from '../components/vary-anim-speed.js'
import randomFloat from 'random-float'
import randomInt from 'random-int'

const numFish = 50
const colors = ['purple', 'orange']

export class Fishes {
  init () {
    this.entities = this.game.entities
    this.renderer = this.game.systems.renderer
    this.tweenMovers = this.game.systems.tweenMovers

    for (let i = 0; i < numFish; i++) {
      this.add()
    }
  }

  add () {
    const colorIndex = randomInt(0, colors.length - 1)
    const color = colors[colorIndex]
    const startPosition = this.renderer.getRandomPoint()
    const entity = this.entities.createEntity()
    entity.addComponent(new Transform({ position: startPosition }))
    entity.addComponent(
      new AnimatedSprite({
        layerName: 'fish',
        activeSequenceName: 'idle',
        sequences: {
          idle: {
            baseName: `${color}-fish-idle`,
            animationSpeed: 0.25,
            frameCount: 16
          },
          swim: {
            baseName: `${color}-fish-swim`,
            animationSpeed: 0.5,
            frameCount: 7
          }
        }
      })
    )
    entity.addComponent(new Bobber())
    entity.addComponent(new Facing({ spriteDir: 'left', dir: 'right' }))
    entity.addComponent(new Fish())
    entity.addComponent(
      new VaryAnimSpeed({
        chance: 1,
        min: 0.18,
        max: 0.24
      })
    )
    entity.addComponent(new TweenMover())
  }

  update () {
    const fishEntities = this.entities.queryComponents('fish')
    fishEntities.forEach(fishEntity => {
      const { animatedSprite, facing, transform, tweenMover } = fishEntity
      if (tweenMover.isMoving) {
        animatedSprite.setActiveSequence('swim')
      } else {
        animatedSprite.setActiveSequence('idle')
        const chance = randomFloat(0, 100)
        if (chance < 3) {
          const moveTarget = this.renderer.getRandomPoint()
          this.tweenMovers.moveTo(fishEntity, moveTarget)

          if (moveTarget.x < transform.position.x) {
            facing.dir = 'left'
          } else {
            facing.dir = 'right'
          }
        } else {
          transform.rotation = 0
        }
      }
    })
  }
}
