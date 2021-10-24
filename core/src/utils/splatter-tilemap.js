import { CompositeTilemap, settings } from '@pixi/tilemap'

export class SplatterTilemap {
  constructor ({ tileSize, baseTextureName }) {
    settings.TEXTILE_UNITS = 4
    settings.TEXTURES_PER_TILEMAP = 4
    settings.use32bitIndex = true
    this.tileSize = tileSize
    this.tilemap = new CompositeTilemap()
    this.baseTextureName = baseTextureName
  }

  addTile ({ textureIndex = 0, x = 0, y = 0 }) {
    const textureId = `${this.baseTextureName}${textureIndex}.png`
    this.tilemap.tile(textureId, x * this.tileSize, y * this.tileSize)
  }
}
