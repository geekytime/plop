export class Body {
  constructor ({
    velocity = { x: 0, y: 0 },
    maxVelocity = { x: 5, y: 5 },
    friction = { x: 0.5, y: 0.5 }
  } = {}) {
    this.velocity = velocity
    this.maxVelocity = maxVelocity
    this.friction = friction
    this.enabled = true
  }
}
