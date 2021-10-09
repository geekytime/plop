import { Assets } from './systems/assets.js'
import { FourWayAnims } from '@plop/core'
import { FourWayAnimsFacing } from '@plop/core'
import { Game as PlopGame, Renderer } from '@plop/core'
import { KeyInput } from '@plop/core'
import { Physics } from '@plop/core'
import { Players } from './systems/players.js'

export class Game extends PlopGame {
  onCreate () {
    this.addSystem(new Assets())
    this.addSystem(new FourWayAnims())
    this.addSystem(new FourWayAnimsFacing())
    this.addSystem(new KeyInput())
    this.addSystem(new Physics())
    this.addSystem(new Players())
    this.addSystem(new Renderer())
  }

  async onLoad () {
    await this.systems.assets.init()
  }

  onInit () {
    const { systems } = this
    // Init root systems first...
    systems.keyInput.init()
    systems.physics.init()
    systems.renderer.init()
    systems.fourWayAnims.init()
    systems.fourWayAnimsFacing.init()

    // ...and then game systems
    systems.players.init()
  }

  onUpdate = () => {
    const { systems } = this
    systems.keyInput.update()

    systems.physics.update()
    systems.fourWayAnims.update()
    systems.fourWayAnimsFacing.update()
    systems.players.update()
    systems.renderer.update()
  }
}
