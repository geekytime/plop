import ndarray from 'ndarray'
import { CompositeTilemap } from '@pixi/tilemap'

const northDir = 0b0001
const westDir = 0b0010
const eastDir = 0b0100
const southDir = 0b1000

export class TilemapBitmask4 {
  constructor ({ tileSize = 16, layerData, baseTextureName }) {
    this.tileSize = tileSize
    this.layerData = layerData
    this.baseTextureName = baseTextureName
    this.tilemap = new CompositeTilemap()
  }

  update () {
    for (let y = 0; y < this.layerData.height; y++) {
      for (let x = 0; x < this.layerData.width; x++) {
        const thisValue = this.layerData.get(x, y)
        if (thisValue === 1) {
          const northBit = this.getNorthBit(x, y)
          const westBit = this.getWestBit(x, y)
          const eastBit = this.getEastBit(x, y)
          const southBit = this.getSouthBit(x, y)
          const tileIndex = northBit | westBit | eastBit | southBit
          const textureId = `${this.baseTextureName}${tileIndex}.png`
          this.tilemap.tile(textureId, x * this.tileSize, y * this.tileSize)
        }
      }
    }
  }

  getNorthBit (x, y) {
    if (y === 0) {
      return 0
    }
    const northValue = this.layerData.get(x, y - 1)
    const northBit = northValue * northDir
    return northBit
  }

  getWestBit (x, y) {
    if (x === 0) {
      return 0
    }
    const westValue = this.layerData.get(x - 1, y)
    const westBit = westValue * westDir
    return westBit
  }

  getEastBit (x, y) {
    if (x === this.layerData.width - 1) {
      return this.layerData.width - 1
    }
    const eastValue = this.layerData.get(x + 1, y)
    const eastBit = eastValue * eastDir
    return eastBit
  }

  getSouthBit (x, y) {
    if (y === this.layerData.height - 1) {
      return this.layerData.height - 1
    }
    const southValue = this.layerData.get(x, y + 1)
    const southBit = southValue * southDir
    return southBit
  }
}
