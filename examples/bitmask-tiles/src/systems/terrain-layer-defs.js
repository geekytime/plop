import {
  generateTerrainCellular,
  generateTerrainTestPattern,
  generateTerrainFull,
  PickerEven
} from '@plop/generators'

const width = 21
const height = 23

export const terrainLayerDefs = [
  {
    algorithm: generateTerrainTestPattern,
    options: {
      width,
      height,
      baseProbability: 0.3,
      iterations: 5
    }
  }
  // {
  //   algorithm: generateTerrainCellular,
  //   options: {
  //     width,
  //     height,
  //     baseProbability: 0.3,
  //     iterations: 5,
  //     picker: new PickerEven({ maxIndex: 11 })
  //   }
  // }
]
