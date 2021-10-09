import { Bubble } from '../components/bubble.js'
import { Body, Sprite, Transform } from '@plop/core'
import randomInt from 'random-int'
import randomFloat from 'random-float'

const defaults = {
  poolSize: 10,
  poppedFrameRate: 0.7,
  riseRate: 0.5,
  wiggleDistance: 5,
  wiggleSpeed: 0.5,
  totalCount: 100
}

export class Bubbles {
  constructor (options) {
    this.settings = { ...defaults, ...options }
  }

  init () {
    this.entities = this.game.entities
    this.renderer = this.game.systems.renderer
    this.bubbles = []

    for (let i = 0; i < this.settings.poolSize; i++) {
      this.add(i)
    }
  }

  add (i) {
    const bubbleEntity = this.entities.createEntity()
    bubbleEntity.addComponent(new Bubble())
    bubbleEntity.addComponent(new Transform())
    bubbleEntity.addComponent(new Body())
    bubbleEntity.addComponent(new Sprite({ name: 'bubble.png' }))

    this.resetOne(bubbleEntity)
    this.bubbles.push(bubbleEntity)
  }

  resetOne (bubbleEntity) {
    const { bubble, transform, body, sprite } = bubbleEntity

    transform.position.y = this.renderer.height + bubble.size
    const minX = -bubble.size / 2
    const maxX = this.renderer.width + bubble.size / 2
    transform.position.x = randomInt(minX, maxX)

    const scaleFactor = bubble.size / sprite.texture.width
    transform.scale.set(scaleFactor, scaleFactor)

    body.velocity.y = randomFloat(-1, -5)
    body.velocity.x = randomFloat(-0.5, 0.5)

    bubble.shift = randomInt(-5, 5)
  }

  update (step) {
    for (let i = 0; i < this.bubbles.length; i++) {
      const bubbleEntity = this.bubbles[i]
      this.updateOne(bubbleEntity, step)
    }
  }

  updateOne (bubbleEntity, step) {
    this.resetCompleted(bubbleEntity)

    const changeWiggle = randomInt(0, 100)
    if (changeWiggle === 1) {
      const { body } = bubbleEntity
      body.velocity.x += randomFloat(-0.1, 0.1)
    }
  }

  resetCompleted (bubbleEntity) {
    const { transform, bubble } = bubbleEntity
    if (transform.position.y < -bubble.size) {
      this.resetOne(bubbleEntity)
    }
  }
}

// export const bubbles = (store) => {
//       pop (id) {
//         const justPopped = this.all.find((bubble) => {
//           return bubble.id === id
//         })
//         justPopped.popFrame = 1;
//         this.popped.push(justPopped)
//         this.all = this.all.filter((bubble) =>{
//           return bubble.id !== id
//         })
//       },
//       update ({ delta, tick }) {
//         this.updateRise({ delta, tick })
//         this.resetCompleted()

//         // const chance = randomInt(0,100)
//         // if (chance <10) {
//         //   this.add()
//         // }
//       },
//       updateRise ({ delta, tick }) {
//         this.pool.forEach((bubble) => {
//           bubble.top = bubble.top - riseRate

//           if (bubble.top < -100) {
//             bubble.top = 100
//           }
//           // if (bubble.shift < -wiggleDistance || bubble.shift > wiggleDistance) {
//           //   bubble.shiftDir = bubble.shiftDir * -1
//           // }
//           // bubble.shift = bubble.shift + bubble.shiftDir * wiggleSpeed
//         })
//       },
//       resetCompleted() {
//        this.pool.forEach((bubble) => {

//         })
//       }
//     }
//   })
// }
