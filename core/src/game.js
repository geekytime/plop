import { deriveObjectName } from './utils/derive-object-name.js'
import { EntityManager } from './ecs/entity-manager.js'

export class Game {
  constructor () {
    this.systems = {}
    this.entities = new EntityManager()
  }

  async start () {
    await this.onCreate()
    await this.onLoad()
    await this.onInit()
    this.systems.renderer.app.ticker.add(this.onUpdate)
  }

  onCreate () {}

  onLoad () {}

  onInit () {
    this.systems.forEach(system => {
      system.init()
    })
  }
  onUpdate () {}

  addSystem (system, name) {
    if (!name) {
      name = deriveObjectName(system)
    }
    system.game = this
    this.systems[name] = system
  }

  createSystem (SystemClass, ...args) {
    // TODO: implement this
  }

  addPlopSystem (name) {
    // TODO: implement this
  }
}
