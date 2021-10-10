import { AnimatedSprite as PixiAnimatedSprite, Texture } from 'pixi.js'

export class AnimSprite extends PixiAnimatedSprite {
  constructor ({
    textures,
    visible = true,
    animationSpeed = 0.1,
    anchor = { x: 0.5, y: 0.5 }
  } = {}) {
    super(textures)
    this.anchor = anchor
    this.visible = visible
    this.animationSpeed = animationSpeed
  }

  onCreate (entity) {
    entity.transform.addChild(this)
  }
}
