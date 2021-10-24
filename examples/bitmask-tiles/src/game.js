import { Assets } from './systems/assets.js'
import { Game as PlopGame, Renderer } from '@plop/core'
import { Terrain } from './systems/terrain.js'

export class Game extends PlopGame {
  onCreate () {
    this.addSystem(new Assets())
    this.addSystem(new Renderer())
    this.addSystem(new Terrain())
  }

  async onLoad () {
    await this.systems.assets.init()
  }

  async onInit () {
    const { systems } = this
    systems.renderer.init()
    await systems.terrain.init()
  }

  onUpdate = () => {
    const { systems } = this
    systems.renderer.update()
  }
}
