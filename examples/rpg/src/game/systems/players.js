import { AnimSprite } from '@plop/core'
import { Transform } from '@plop/core'

export class Players {
  init () {
    const { entities } = this.game
    const { fourWayAnims, keyInput } = this.game.systems
    this.player1 = entities.createEntity()
    this.player1.addComponent(new Transform())
    this.player1.transform.x = 300
    this.player1.transform.y = 300
    this.player1.addTags('player1')

    const components = fourWayAnims.addComponents(this.player1, 'reaper')

    keyInput.bind('ArrowLeft', 'left')
    keyInput.bind('ArrowRight', 'right')
    keyInput.bind('ArrowUp', 'up')
    keyInput.bind('ArrowDown', 'down')
  }

  update () {
    const { keyInput, physics } = this.game.systems
    const { left, right, up, down } = keyInput.state
    const { body, facing } = this.player1

    const accel = 5
    const diagAccel = 5 * Math.sqrt(2)

    if (up.down && left.down) {
      facing.facing = 'west'
      return physics.applyForce(body, { x: -diagAccel, y: -diagAccel })
    } else if (up.down && right.down) {
      facing.facing = 'east'
      return physics.applyForce(body, { x: diagAccel, y: -diagAccel })
    } else if (down.down && left.down) {
      facing.facing = 'west'
      return physics.applyForce(body, { x: -diagAccel, y: diagAccel })
    } else if (down.down && right.down) {
      facing.facing = 'east'
      return physics.applyForce(body, { x: diagAccel, y: diagAccel })
    }

    if (up.down) {
      facing.facing = 'north'
      physics.applyForce(body, { x: 0, y: -accel })
    } else if (down.down) {
      facing.facing = 'south'
      physics.applyForce(body, { x: 0, y: accel })
    } else if (left.down) {
      facing.facing = 'west'
      physics.applyForce(body, { x: -accel, y: 0 })
    } else if (right.down) {
      facing.facing = 'east'
      physics.applyForce(body, { x: accel, y: 0 })
    }
  }
}
