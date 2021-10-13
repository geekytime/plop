import { CompositeTilemap } from '@pixi/tilemap'
import weightedRandom from 'weighted-random-object'

export class Tilemap {
  constructor ({ atlas }) {
    this.atlasName = atlas.name
    this.tileSize = atlas.tileSize

    this.tilemap = new CompositeTilemap()
  }

  addTile ({ type, textures, x, y }) {
    if (type === 'basic') {
      const texture = weightedRandom(textures)
      this.tilemap.tile(texture.id, x * this.tileSize, y * this.tileSize)
    }
  }
}
