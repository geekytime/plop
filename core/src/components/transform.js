import { Container as PixiContainer } from 'pixi.js'

const defaultPosition = { x: 0, y: 0 }
const defaultScale = { x: 1, y: 1 }

export class Transform extends PixiContainer {
  constructor ({ position = defaultPosition, scale = defaultScale } = {}) {
    super()
    this.position.set(position.x, position.y)
    this.scale.set(scale.x, scale.y)
  }
}
