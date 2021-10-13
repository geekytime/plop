export class Facing {
  constructor ({ spriteDir = 'right', dir = 'right' } = {}) {
    this.spriteDir = spriteDir
    this.dir = dir
  }

  onCreate (entity) {
    entity.sprite?.anchor.set(0.5, 0.5)
    entity.animatedSprite?.anchor.set(0.5, 0.5)
  }
}
