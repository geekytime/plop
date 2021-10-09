export class FourWayAnimsFacing {
  init () {}

  update () {
    const { entities } = this.game
    const matchEntities = entities.queryComponents('facing', 'fourWayAnims')
    matchEntities.forEach((entity, index) => {
      const { facing } = entity.facing
      if (facing === 'north') {
        entity.animSpriteNorth.visible = true
        entity.animSpriteSouth.visible = false
        entity.animSpriteEast.visible = false
        entity.animSpriteWest.visible = false
      } else if (facing === 'south') {
        entity.animSpriteNorth.visible = false
        entity.animSpriteSouth.visible = true
        entity.animSpriteEast.visible = false
        entity.animSpriteWest.visible = false
      } else if (facing === 'east') {
        entity.animSpriteNorth.visible = false
        entity.animSpriteSouth.visible = false
        entity.animSpriteEast.visible = true
        entity.animSpriteWest.visible = false
      } else if (facing === 'west') {
        entity.animSpriteNorth.visible = false
        entity.animSpriteSouth.visible = false
        entity.animSpriteEast.visible = false
        entity.animSpriteWest.visible = true
      }
    })
  }
}
