import { Assets } from './systems/assets.js'
import { FollowCamera } from '@plop/core'
import { FourWayAnims } from '@plop/core'
import { FourWayAnimsFacing } from '@plop/core'
import { Game as PlopGame, Renderer } from '@plop/core'
import { KeyInput } from '@plop/core'
import { Physics } from '@plop/core'
import { Players } from './systems/players.js'
import { Terrain } from './systems/terrain.js'
import { Terrains } from '@plop/core'

export class Game extends PlopGame {
  onCreate () {
    this.addSystem(new Assets())
    this.addSystem(new FollowCamera())
    this.addSystem(new FourWayAnims())
    this.addSystem(new FourWayAnimsFacing())
    this.addSystem(new KeyInput())
    this.addSystem(new Physics())
    this.addSystem(new Players())
    this.addSystem(new Renderer())
    this.addSystem(new Terrain())
    this.addSystem(new Terrains())
  }

  async onLoad () {
    await this.systems.assets.init()
  }

  async onInit () {
    const { systems } = this
    // Init root systems first...
    systems.keyInput.init()
    systems.physics.init()
    systems.renderer.init()
    systems.followCamera.init()
    systems.fourWayAnims.init()
    systems.fourWayAnimsFacing.init()

    // ...and then game systems
    await systems.terrain.init()
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
    systems.followCamera.update()
  }
}
