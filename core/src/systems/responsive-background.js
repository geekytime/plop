import { Sprite } from '../components/sprite.js'
import { Transform } from '../components/transform.js'

export class ResponsiveBackground {
  constructor ({ assetName } = {}) {
    this.assetName = assetName
  }

  init () {
    this.entities = this.game.entities
    this.renderer = this.game.systems.renderer

    this.entity = this.entities.createEntity()
    this.entity.addComponent(new Transform())
    this.entity.addComponent(new Sprite({ name: this.assetName }))

    this.resize()
  }

  resize () {
    const { sprite, transform } = this.entity
    const { texture } = sprite

    const widthRatio = this.renderer.width / texture.width
    const heightRatio = this.renderer.height / texture.height
    const scale = Math.max(widthRatio, heightRatio)

    transform.scale.set(scale, scale)
    const center = this.renderer.getCenter()
    transform.position.set(center.x, center.y)
    sprite.anchor.set(0.5, 0.5)
  }

  update () {
    if (this.renderer.didResize) {
      this.resize()
    }
  }
}
