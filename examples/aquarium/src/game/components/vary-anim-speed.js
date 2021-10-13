export class VaryAnimSpeed {
  constructor (entity, { chance = 1, min = 1, max = 0 } = {}) {
    this.min = min
    this.max = max
    this.chance = chance
  }
}
