import { AnimSprite } from '../components/anim-sprite.js'
import { Texture } from 'pixi.js'
import { FourWayFacing } from '../components/four-way-facing.js'
import { Body } from '../components/body.js'

export class FourWayAnims {
  init () {}

  update () {
    const [entity] = this.game.entities.queryTags('player1')

    const {
      animSpriteNorth,
      animSpriteSouth,
      animSpriteEast,
      animSpriteWest,
      body
    } = entity

    if (animSpriteNorth.visible) {
      if (body.velocity.y === 0) {
        animSpriteNorth.gotoAndStop(0)
      } else if (body.velocity.y < 0 && !animSpriteNorth.playing) {
        animSpriteNorth.gotoAndPlay(0)
      }
    } else if (animSpriteSouth.visible) {
      if (body.velocity.y === 0) {
        animSpriteSouth.gotoAndStop(0)
      } else if (body.velocity.y > 0 && !animSpriteSouth.playing) {
        animSpriteSouth.gotoAndPlay(0)
      }
    } else if (animSpriteEast.visible) {
      if (body.velocity.x === 0) {
        animSpriteEast.gotoAndStop(0)
      } else if (body.velocity.x > 0 && !animSpriteEast.playing) {
        animSpriteEast.gotoAndPlay(0)
      }
    } else if (animSpriteWest.visible) {
      if (body.velocity.x === 0) {
        animSpriteWest.gotoAndStop(0)
      } else if (body.velocity.x < 0 && !animSpriteWest.playing) {
        animSpriteWest.gotoAndPlay(0)
      }
    }
  }

  addComponents (entity, characterName) {
    const textures = this.getTextures(characterName)
    entity.addComponent(
      new AnimSprite({ textures: textures.north.all, visible: false }),
      'animSpriteNorth'
    )
    entity.addComponent(
      new AnimSprite({ textures: textures.south.all, visible: true }),
      'animSpriteSouth'
    )
    entity.addComponent(
      new AnimSprite({ textures: textures.east.all, visible: false }),
      'animSpriteEast'
    )
    entity.addComponent(
      new AnimSprite({ textures: textures.west.all, visible: false }),
      'animSpriteWest'
    )

    entity.addComponent(new FourWayFacing(), 'facing')
    entity.addComponent(new FourWayAnims())
    entity.addComponent(new Body())
  }

  getTextures (characterName) {
    const north = this.getFacingTextures(characterName, 'north')
    const south = this.getFacingTextures(characterName, 'south')
    const east = this.getFacingTextures(characterName, 'east')
    const west = this.getFacingTextures(characterName, 'west')
    const all = [...north.all, ...south.all, ...east.all, ...west.all]

    return { north, south, east, west }
  }

  getFacingTextures (characterName, facing) {
    const center = this.getTexture(characterName, facing, 'center')
    const left = this.getTexture(characterName, facing, 'left')
    const right = this.getTexture(characterName, facing, 'right')
    return {
      all: [center, left, center, right],
      center,
      left,
      right
    }
  }

  getTexture (characterName, facing, arms) {
    const resourceName = `${characterName}-${facing}-${arms}.png`
    const texture = Texture.from(resourceName)
    return texture
  }
}
