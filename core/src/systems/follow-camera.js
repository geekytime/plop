import { Rectangle } from 'pixi.js'
import lerp from 'lerpjs'

export class FollowCamera {
  init ({
    playerTag = 'player1',
    deadzone = { width: 128, height: 128 }
  } = {}) {
    this.playerTag = playerTag
    this.initDeadzone(deadzone)

    const { renderer } = this.game.systems
    this.cameraTarget = renderer.viewport.center
  }

  initDeadzone ({ width, height }) {
    const { renderer } = this.game.systems
    const center = renderer.getCenter()
    const x = center.x - width / 2
    const y = center.y - height / 2
    this.deadZone = new Rectangle(x, y, width, height)
  }

  update () {
    const { renderer } = this.game.systems
    const [player] = this.game.entities.queryTags(this.playerTag)

    if (player) {
      const { x, y } = renderer.viewport.toScreen(player.transform.position)
      const playerInDeadzone = this.deadZone.contains(x, y)
      if (playerInDeadzone) {
        this.cameraTarget.x = renderer.viewport.center.x
        this.cameraTarget.y = renderer.viewport.center.y
      } else {
        this.cameraTarget.x = player.transform.position.x
        this.cameraTarget.y = player.transform.position.y
      }
    }

    const x = lerp(renderer.viewport.center.x, this.cameraTarget.x, 1 / 30)
    const y = lerp(renderer.viewport.center.y, this.cameraTarget.y, 1 / 30)
    renderer.viewport.moveCenter(x, y)
  }

  moveCameraToward ({ x, y }) {}
}
