import { Sprite as PixiSprite, Texture } from 'pixi.js'

export class Sprite extends PixiSprite {
  constructor ({ name, layerName }) {
    const texture = Texture.from(name)
    super(texture)
  }

  onCreate (entity) {
    entity.transform.addChild(this)
  }
}
