import {
  generateTerrainCellular,
  generateTerrainFull,
  PickerEven
} from '@plop/generators'

const width = 256
const height = 256

export const terrainLayerDefs = [
  {
    algorithm: generateTerrainCellular,
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
