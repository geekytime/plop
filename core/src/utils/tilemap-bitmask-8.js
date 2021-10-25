import ndarray from 'ndarray'
import { CompositeTilemap } from '@pixi/tilemap'

const dirNW = 0b00000001 //1
const dirNN = 0b00000010 //2
const dirNE = 0b00000100 //4
const dirWW = 0b00001000 //8
const dirEE = 0b00010000 //16
const dirSW = 0b00100000 //32
const dirSS = 0b01000000 //64
const dirSE = 0b10000000 //128

export class TilemapBitmask8 {
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
          const bitNW = this.getBitNW(x, y)
          const bitNN = this.getBitNN(x, y)
          const bitNE = this.getBitNE(x, y)
          const bitWW = this.getBitWW(x, y)
          const bitEE = this.getBitEE(x, y)
          const bitSW = this.getBitSW(x, y)
          const bitSS = this.getBitSS(x, y)
          const bitSE = this.getBitSE(x, y)

          const tileBits =
            bitNW | bitNN | bitNE | bitWW | bitEE | bitSW | bitSS | bitSE
          const tileIndex = bitsToIndex[tileBits]
          console.log(x, y, tileBits, tileIndex)
          const textureId = `${this.baseTextureName}${tileIndex}.png`
          this.tilemap.tile(textureId, x * this.tileSize, y * this.tileSize)
        }
      }
    }
  }

  getBitNW (x, y) {
    if (y === 0 || x === 0) {
      return 0
    }
    const valNN = this.layerData.get(x, y - 1)
    const valWW = this.layerData.get(x - 1, y)
    if (valNN && valWW) {
      const valNW = this.layerData.get(x - 1, y - 1)
      const bitNW = valNW * dirNW
      return bitNW
    }

    return 0
  }

  getBitNN (x, y) {
    if (y === 0) {
      return 0
    }
    const valueNN = this.layerData.get(x, y - 1)
    const bitNN = valueNN * dirNN
    return bitNN
  }

  getBitNE (x, y) {
    if (y === 0 || x === this.layerData.width - 1) {
      return 0
    }
    const valNN = this.layerData.get(x, y - 1)
    const valEE = this.layerData.get(x + 1, y)
    if (valNN && valEE) {
      const valNE = this.layerData.get(x + 1, y - 1)
      const bitNE = valNE * dirNE
      return bitNE
    }
    return 0
  }

  getBitWW (x, y) {
    if (x === 0) {
      return 0
    }
    const valWW = this.layerData.get(x - 1, y)
    const bitWW = valWW * dirWW
    return bitWW
  }

  getBitEE (x, y) {
    if (x === this.layerData.width - 1) {
      return 0
    }
    const valEE = this.layerData.get(x + 1, y)
    const bitEE = valEE * dirEE
    return bitEE
  }

  getBitSW (x, y) {
    if (x === 0 || y === this.layerData.height - 1) {
      return 0
    }
    const valSS = this.layerData.get(x, y + 1)
    const valWW = this.layerData.get(x - 1, y)

    if (valSS && valWW) {
      const valSW = this.layerData.get(x - 1, y + 1)
      const bitSW = valSW * dirSW
      return bitSW
    }

    return 0
  }

  getBitSS (x, y) {
    if (y === this.layerData.height - 1) {
      return 0
    }
    const valSS = this.layerData.get(x, y + 1)
    const bitSS = valSS * dirSS
    return bitSS
  }

  getBitSE (x, y) {
    if (x === this.layerData.width - 1 || y === this.layerData.height - 1) {
      return 0
    }
    const valEE = this.layerData.get(x + 1, y)
    const valSS = this.layerData.get(x, y + 1)
    if (valEE && valSS) {
      const valSE = this.layerData.get(x + 1, y + 1)
      const bitSE = valSE * dirSE
      return bitSE
    }

    return 0
  }
}

const bitsToIndex = {
  0: 47,
  2: 1,
  8: 2,
  10: 3,
  11: 4,
  16: 5,
  18: 6,
  22: 7,
  24: 8,
  26: 9,
  27: 10,
  30: 11,
  31: 12,
  64: 13,
  66: 14,
  72: 15,
  74: 16,
  75: 17,
  80: 18,
  82: 19,
  86: 20,
  88: 21,
  90: 22,
  91: 23,
  94: 24,
  95: 25,
  104: 26,
  106: 27,
  107: 28,
  120: 29,
  122: 30,
  123: 31,
  126: 32,
  127: 33,
  208: 34,
  210: 35,
  214: 36,
  216: 37,
  218: 38,
  219: 39,
  222: 40,
  223: 41,
  248: 42,
  250: 43,
  251: 44,
  254: 45,
  255: 46
}
