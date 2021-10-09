import { AnimatedSprite as PixiAnimatedSprite, Texture } from 'pixi.js'

export class AnimSprite extends PixiAnimatedSprite {
  constructor ({ textures, visible = true, animationSpeed = 0.1 } = {}) {
    super(textures)
    this.visible = visible
    this.animationSpeed = animationSpeed
  }

  onCreate (entity) {
    entity.transform.addChild(this)
  }
}
