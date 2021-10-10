import { CompositeTilemap } from '@pixi/tilemap'
import weightedRandom from 'weighted-random-object'

export class Tilemap {
  constructor ({ atlasName, tileSize }) {
    this.atlasName = atlasName
    this.tileSize = tileSize

    this.tilemap = new CompositeTilemap()
  }

  addTile ({ type, textures, x, y }) {
    if (type === 'basic') {
      const texture = weightedRandom(textures)
      this.tilemap.tile(texture.id, x * this.tileSize, y * this.tileSize)
    }
  }
}
