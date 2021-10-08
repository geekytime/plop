const defaultRange = { x: 4, y: 4 }

export class Bobber {
  constructor (entity, { range = defaultRange } = {}) {
    this.entity = entity
    this.range = range
    this.direction = null
    this.speed = 0.225
  }
}
