import { Assets } from './systems/assets.js'
import { ResponsiveBackground } from '@plop/core'
import { Bobbers } from './systems/bobbers.js'
import { Bubbles } from './systems/bubbles.js'
import { EntityManager } from '@plop/core'
import { Facings } from './systems/facings.js'
import { Fishes } from './systems/fishes.js'
import { Game as PlopGame, Physics, Renderer } from '@plop/core'
import { TweenMovers } from './systems/tween-movers.js'
import { VaryAnimSpeeds } from './systems/vary-anim-speeds.js'

export class Game extends PlopGame {
  onCreate () {
    this.addSystem(new Assets())
    this.addSystem(new ResponsiveBackground({ assetName: 'background.png' }))
    this.addSystem(new Bobbers())
    this.addSystem(new Bubbles())
    this.addSystem(new Facings())
    this.addSystem(new Fishes())
    this.addSystem(new Physics())
    this.addSystem(new Renderer())
    this.addSystem(new TweenMovers())
    this.addSystem(new VaryAnimSpeeds())
  }

  async onLoad () {
    await this.systems.assets.init()
  }

  onInit () {
    const { systems } = this
    // Init root systems first...
    systems.renderer.init()
    systems.physics.init()

    // ...and then game systems
    systems.responsiveBackground.init()
    systems.bubbles.init()
    systems.fishes.init()
    systems.bobbers.init()
    systems.facings.init()
  }

  onUpdate = () => {
    const { systems } = this
    systems.responsiveBackground.update()
    systems.bubbles.update()
    systems.physics.update()
    systems.bobbers.update()
    systems.facings.update()
    systems.fishes.update()
    systems.renderer.update()
    systems.tweenMovers.update()
    systems.varyAnimSpeeds.update()
  }
}
